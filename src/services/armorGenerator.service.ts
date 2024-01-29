import { ChanceSheet, CharacterBody, CharacterBodySize, LootLevel, LootQuality, WeightSheet } from '@/types'
import { Armor, ArmorModifier } from '@/entities/Armor'
import { AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES, AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES, LEVEL_RISE_CHANCES, QUALITY_CHANCES } from '@/constants/WeaponGenerator'
import { copy, decreaseModifierChance, getRandomInt, getRandomWithChance, invertModifiers, weightSheetToChances } from '@/components/helpers/utils'
import {
	ADDITIONAL_BODY_SIZE_WEIGHT,
	ADDITIONAL_BOOTS_MOVEMENT_WEIGHT,
	ADDITIONAL_CLOTH_ARMOR_EVADE,
	ADDITIONAL_CLOTH_ARMOR_MOVEMENT,
	ADDITIONAL_GAUNTLET_DAMAGE,
	ADDITIONAL_GOOGLES_DICE_RESULT,
	ADDITIONAL_HEAVY_ARMOR_EVADE,
	ADDITIONAL_HEAVY_ARMOR_HEALTH_POINTS,
	ADDITIONAL_LIGHT_ARMOR_EVADE,
	ADDITIONAL_LIGHT_ARMOR_MOVEMENT,
	ADDITIONAL_MEDIUM_ARMOR_EVADE,
	ADDITIONAL_MEDIUM_ARMOR_MOVEMENT,
	ARMOR_MODIFIER_WEIGHT_SHEET,
	ARMOR_PRESETS,
	ARMOR_TYPE_CHANCES,
	ARMOR_TYPE_MULTIPLIERS,
	BASE_DEFENCE_VALUE,
	BODY_SIZE_WEIGHT,
	DEFENCE_LEVEL_COEFFICIENT,
	DEFENCE_RANDOM_AFFECT
} from '@/constants/ArmorGenerator'
import { ArmorType } from '@/constants/Armor'
import { ALL_WORLD_SETTINGS, WorldSetting } from '@/constants/Application'
import { ArmorPreset } from '@/entities/ArmorPreset'
import { BodyPart, DEFAULT_HUMAN_BODY, MAX_CHARACTER_LEVEL } from '@/constants/Character'

export type ArmorGeneratorModifier = keyof ArmorModifier

type Props = Partial<{
	level: number
	lootLevel: LootLevel
	amountOfPositiveModifiersChances: Record<LootQuality, ChanceSheet<number>>
	amountOfNegativeModifiersChances: Record<LootQuality, ChanceSheet<number>>
	sizeWeight: ChanceSheet<CharacterBodySize>
	typeChances: ChanceSheet<ArmorType>
	qualityChances: Record<LootLevel, ChanceSheet<LootQuality>>
	levelChangesChances: ChanceSheet<number>
	modifierWeights: WeightSheet<ArmorGeneratorModifier>
	worldSettings: WorldSetting[]
	characterBodies: CharacterBody[]
	armorPresets: ArmorPreset[]
}>

export default class ArmorGeneratorService {
	private level: number = 1
	private readonly baseLevel: number = 1
	private readonly lootLevel: LootLevel = LootLevel.Common
	private readonly amountOfPositiveModifiersChances: Record<LootQuality, ChanceSheet<number>> = copy(AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES)
	private readonly amountOfNegativeModifiersChances: Record<LootQuality, ChanceSheet<number>> = copy(AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES)
	private readonly modifierWeights: WeightSheet<ArmorGeneratorModifier> = copy(ARMOR_MODIFIER_WEIGHT_SHEET)
	private readonly sizeWeight: ChanceSheet<CharacterBodySize> = copy(BODY_SIZE_WEIGHT)
	private readonly typeChances: ChanceSheet<ArmorType> = copy(ARMOR_TYPE_CHANCES)
	private readonly qualityChances: Record<LootLevel, ChanceSheet<LootQuality>> = copy(QUALITY_CHANCES)
	private readonly levelChangesChances: ChanceSheet<number> = copy(LEVEL_RISE_CHANCES)
	private readonly worldSettings: WorldSetting[] = copy(ALL_WORLD_SETTINGS)
	private readonly characterBodies: CharacterBody[] = [copy(DEFAULT_HUMAN_BODY)]
	private readonly armorPresets: ArmorPreset[] = copy(ARMOR_PRESETS)

	private readonly DEFENCE_LEVEL_COEFFICIENT = DEFENCE_LEVEL_COEFFICIENT
	private readonly DEFENCE_RANDOM_AFFECT = DEFENCE_RANDOM_AFFECT
	private readonly BASE_DEFENCE_VALUE = BASE_DEFENCE_VALUE

	constructor(props: Props) {
		this.baseLevel = props.level ?? this.level
		this.lootLevel = props.lootLevel ?? this.lootLevel
		this.amountOfPositiveModifiersChances = props.amountOfPositiveModifiersChances ?? this.amountOfPositiveModifiersChances
		this.amountOfNegativeModifiersChances = props.amountOfNegativeModifiersChances ?? this.amountOfNegativeModifiersChances
		this.modifierWeights = props.modifierWeights ?? this.modifierWeights
		this.sizeWeight = props.sizeWeight ?? this.sizeWeight
		this.typeChances = props.typeChances ?? this.typeChances
		this.qualityChances = props.qualityChances ?? this.qualityChances
		this.levelChangesChances = props.levelChangesChances ?? this.levelChangesChances
		this.worldSettings = props.worldSettings ?? this.worldSettings
		this.characterBodies = props.characterBodies ?? this.characterBodies
		this.armorPresets = props.armorPresets ?? this.armorPresets
	}

	public generate(): Armor {
		const characterBody = this.getRandomCharacterBody()
		this.level = this.getLevel()
		const quality = this.getQuality()
		const size = this.getSize(characterBody)
		const type = this.getType()
		const preset = this.getPreset(size, type, characterBody)
		const defence = this.getDefence(type, preset, characterBody)
		const modifiers = this.getModifiers(preset, quality, type, characterBody)
		const name = this.getName(preset, quality, type)

		return new Armor({
			name,
			level: this.level,
			defence,
			quality,
			type,
			size,
			slots: preset.bodyParts,
			modifiers
		})
	}

	// Stats

	private getLevel(): number {
		return Math.min(Math.max(this.baseLevel + getRandomWithChance(this.levelChangesChances), 1), MAX_CHARACTER_LEVEL)
	}

	private getQuality(): LootQuality {
		return getRandomWithChance(this.qualityChances[this.lootLevel])
	}

	private getSize(characterBody: CharacterBody): CharacterBodySize {
		const sizes = this.getArmorSizeChances([characterBody.size])
		return getRandomWithChance(sizes)
	}

	private getType(): ArmorType {
		return getRandomWithChance(this.typeChances)
	}

	private getPreset(size: CharacterBodySize, type: ArmorType, characterBody: CharacterBody): ArmorPreset {
		const validPresets = this.getValidPresets(characterBody, type, size)
		// TODO: Добавить логики и парные предметы
		return validPresets[getRandomInt(validPresets.length)]
	}

	private getDefence(type: ArmorType, preset: ArmorPreset, characterBody: CharacterBody): number {
		const base = this.BASE_DEFENCE_VALUE
		const typeMultiplier = ARMOR_TYPE_MULTIPLIERS[type].defenceMultiplier
		const randomSeed = 1 - Math.random() * this.DEFENCE_RANDOM_AFFECT
		const defence = this.level ** this.DEFENCE_LEVEL_COEFFICIENT * randomSeed
		const slotsMultiplier = this.getSlotsMultiplier(preset.bodyParts, characterBody)
		return Math.round((base + defence) * slotsMultiplier * typeMultiplier)
	}

	private getName(preset: ArmorPreset, quality: LootQuality, type: ArmorType): string {
		return `${LootQuality[quality]} ${ArmorType[type]} ${preset.name}`
	}

	private getRandomCharacterBody(): CharacterBody {
		return this.characterBodies[getRandomInt(this.characterBodies.length)]
	}

	private getArmorSizeChances(sizes: CharacterBodySize[]): ChanceSheet<CharacterBodySize> {
		const chances = copy(this.sizeWeight)
		for (let i = 0; i < sizes.length; i++) {
			for (let j = 0; j < chances.length; j++) {
				if (chances[j][0] === sizes[i]) {
					chances[j][1] += ADDITIONAL_BODY_SIZE_WEIGHT
				}
			}
		}
		return weightSheetToChances(chances)
	}

	private getValidPresets(characterBody: CharacterBody, type: ArmorType, size: CharacterBodySize): ArmorPreset[] {
		const bodyParts = characterBody.armorSlots.map(e => e.part)

		const isValidSetting = (preset: ArmorPreset): boolean => {
			return preset.worldSettings.some(setting => this.worldSettings.includes(setting))
		}

		const isValidSize = (preset: ArmorPreset): boolean => {
			return preset.possibleSizes.includes(size)
		}

		const isValidType = (preset: ArmorPreset): boolean => {
			return preset.possibleArmorTypes.includes(type)
		}

		const isValidLootLevel = (preset: ArmorPreset): boolean => {
			return preset.possibleLootLevels.includes(this.lootLevel)
		}

		const isValidLevelRange = (preset: ArmorPreset): boolean => {
			return preset.possibleLevelRange[0] <= this.level && this.level <= preset.possibleLevelRange[1]
		}

		const isValidBodyParts = (preset: ArmorPreset): boolean => {
			return preset.bodyParts.every(part => bodyParts.includes(part))
		}

		return this.armorPresets.filter(preset => {
			return (
				isValidSetting(preset) &&
				isValidSetting(preset) &&
				isValidSize(preset) &&
				isValidType(preset) &&
				isValidLootLevel(preset) &&
				isValidLevelRange(preset) &&
				isValidBodyParts(preset)
			)
		})
	}

	private getSlotsMultiplier(slots: BodyPart[], body: CharacterBody): number {
		let multiplier = 0
		for (let i = 0; i < slots.length; i++) {
			for (let j = 0; j < body.armorSlots.length; j++) {
				if (body.armorSlots[j].part === slots[i]) {
					multiplier += body.armorSlots[j].size
				}
			}
		}
		return multiplier
	}

	private getModifiers(preset: ArmorPreset, quality: LootQuality, type: ArmorType, characterBody: CharacterBody): ArmorModifier {
		const sizeMultiplier = this.getSlotsMultiplier(preset.bodyParts, characterBody)
		const positiveAmount = getRandomWithChance(this.amountOfPositiveModifiersChances[quality])
		const positive = this.getModifiersSet(preset, type, positiveAmount, sizeMultiplier)

		const negativeAmount = getRandomWithChance(this.amountOfNegativeModifiersChances[quality])
		const negative = invertModifiers(this.getModifiersSet(preset, type, negativeAmount, sizeMultiplier))
		return Armor.CombineModifiers(positive, negative)
	}

	private getModifiersSet(preset: ArmorPreset, type: ArmorType, amount: number, sizeMultiplier: number): ArmorModifier {
		let pool = this.createModifiersWeightSheet(type, preset)
		let modifiers: ArmorModifier = {}

		for (let i = 0; i < amount; i++) {
			const sheet = weightSheetToChances(pool)
			const modifierType = getRandomWithChance(sheet)
			const modifier = this.getModifier(modifierType, type, sizeMultiplier)
			decreaseModifierChance(pool, modifierType)
			modifiers = Armor.CombineModifiers(modifiers, modifier)
		}

		return modifiers
	}

	private createModifiersWeightSheet(type: ArmorType, preset: ArmorPreset): WeightSheet<ArmorGeneratorModifier> {
		const pool: WeightSheet<ArmorGeneratorModifier> = copy(this.modifierWeights)

		if (preset.bodyParts.some(e => e === BodyPart.Foot)) {
			pool.push(['moveDistance', ADDITIONAL_BOOTS_MOVEMENT_WEIGHT])
		}

		if (preset.bodyParts.some(e => e === BodyPart.Fingers)) {
			pool.push(['damage', ADDITIONAL_GAUNTLET_DAMAGE])
		}

		if (preset.bodyParts.every(e => e === BodyPart.Eyes)) {
			pool.push(['diceResult', ADDITIONAL_GOOGLES_DICE_RESULT])
		}

		switch (type) {
			case ArmorType.Cloth:
				pool.push(['evadeChance', ADDITIONAL_CLOTH_ARMOR_EVADE])
				pool.push(['moveDistance', ADDITIONAL_CLOTH_ARMOR_MOVEMENT])
				pool.push(['defence', Number.MIN_SAFE_INTEGER])
				break
			case ArmorType.Light:
				pool.push(['evadeChance', ADDITIONAL_LIGHT_ARMOR_EVADE])
				pool.push(['moveDistance', ADDITIONAL_LIGHT_ARMOR_MOVEMENT])
				break
			case ArmorType.Medium:
				pool.push(['evadeChance', ADDITIONAL_MEDIUM_ARMOR_EVADE])
				pool.push(['moveDistance', ADDITIONAL_MEDIUM_ARMOR_MOVEMENT])
				break
			case ArmorType.Heavy:
				pool.push(['additionalHealthPoints', ADDITIONAL_HEAVY_ARMOR_HEALTH_POINTS])
				pool.push(['evadeChance', ADDITIONAL_HEAVY_ARMOR_EVADE])
				break
		}

		preset.impossibleModifiers.forEach(modifier => {
			pool.push([modifier, Number.MIN_SAFE_INTEGER])
		})

		return pool
	}

	private getModifier(modifierType: ArmorGeneratorModifier, type: ArmorType, sizeMultiplier: number): ArmorModifier {
		switch (modifierType) {
			case 'damage':
				return this.generateDamageModifier(sizeMultiplier)
			case 'additionalHealthPoints':
				return this.generateAdditionalHealthPointsModifier(sizeMultiplier)
			case 'defence':
				return this.generateDefenceModifier(sizeMultiplier)
			case 'diceResult':
				return this.generateDiceResultModifier()
			case 'evadeChance':
				return this.generateEvadeChanceModifier(sizeMultiplier)
			case 'moveDistance':
				return this.generateMoveDistanceModifier()
			default:
				return {}
		}
	}

	private generateDamageModifier(sizeMultiplier: number): ArmorModifier {
		return {
			damage: Math.round(this.level ** 1.5 * (1 - Math.random() / 2) * sizeMultiplier)
		}
	}

	private generateAdditionalHealthPointsModifier(sizeMultiplier: number): ArmorModifier {
		return {
			additionalHealthPoints: Math.round(10 * this.level * (1 - Math.random() / 2) * sizeMultiplier)
		}
	}

	private generateDefenceModifier(sizeMultiplier: number): ArmorModifier {
		return {
			defence: Math.round(this.level ** 2 * (1 - Math.random() / 2) * sizeMultiplier)
		}
	}

	private generateDiceResultModifier(): ArmorModifier {
		return {
			diceResult: getRandomWithChance([
				[1, 0.99],
				[2, 0.01]
			])
		}
	}

	private generateEvadeChanceModifier(sizeMultiplier: number): ArmorModifier {
		return {
			evadeChance: (this.level / 2) * (1 - Math.random() / 1.5) * (sizeMultiplier / 2)
		}
	}

	private generateMoveDistanceModifier(): ArmorModifier {
		return {
			moveDistance: Math.round(this.level * 3 * (1 - Math.random() / 1.5))
		}
	}
}
