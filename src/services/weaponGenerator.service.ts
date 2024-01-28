import { ChanceSheet, LootLevel, LootQuality, WeaponModifier, WeaponRange, WeaponStats, WeightSheet } from '@/types'
import { Weapon } from '@/entities/Weapon'
import { copy, decreaseModifierChance, getRandomInt, getRandomWithChance, invertModifiers, weightSheetToChances } from '@/components/helpers/utils'
import {
	ADDITIONAL_MELEE_DAMAGE_WEIGHT,
	ADDITIONAL_RANGE_DISTANCE_WEIGHT,
	ADDITIONAL_SHIELD_DEFENCE_WEIGHT,
	ALL_DEFENCE_WEAPON,
	ALL_MELEE_WEAPONS,
	ALL_RANGED_WEAPONS,
	AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES,
	AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES,
	BASE_DAMAGE_VALUE,
	DAMAGE_LEVEL_COEFFICIENT,
	DAMAGE_RANDOM_AFFECT,
	DAMAGE_SPREAD,
	DAMAGE_SPREAD_AFFECT,
	LEVEL_RISE_CHANCES,
	MODIFIER_WEIGHT_SHEET,
	QUALITY_CHANCES,
	WEAPON_TYPE_CHANCES,
	WEAPON_TYPE_MULTIPLIER_AFFECT
} from '@/constants/WeaponGenerator'
import { WeaponType } from '@/entities/WeaponType'
import { MAX_CHARACTER_LEVEL } from '@/constants/Character'

export type WeaponGeneratorModifier = Omit<keyof WeaponModifier, 'maxDamage' | 'minDamage' | 'minEffectiveDistance' | 'maxEffectiveDistance'> | 'damage'

type Props = Partial<{
	level: number
	lootLevel: LootLevel
	amountOfPositiveModifiersChances: Record<LootQuality, ChanceSheet<number>>
	amountOfNegativeModifiersChances: Record<LootQuality, ChanceSheet<number>>
	typeChances: ChanceSheet<WeaponType[]>
	qualityChances: Record<LootLevel, ChanceSheet<LootQuality>>
	levelChangesChances: ChanceSheet<number>
	modifierWeights: WeightSheet<WeaponGeneratorModifier>
}>

export default class WeaponGeneratorService {
	private readonly baseLevel: number = 1
	private level: number = 1
	private readonly lootLevel: LootLevel = LootLevel.Common
	private readonly amountOfPositiveModifiersChances: Record<LootQuality, ChanceSheet<number>> = copy(AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES)
	private readonly amountOfNegativeModifiersChances: Record<LootQuality, ChanceSheet<number>> = copy(AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES)
	private readonly typeChances: ChanceSheet<WeaponType[]> = WEAPON_TYPE_CHANCES
	private readonly qualityChances: Record<LootLevel, ChanceSheet<LootQuality>> = copy(QUALITY_CHANCES)
	private readonly levelChangesChances: ChanceSheet<number> = copy(LEVEL_RISE_CHANCES)
	private readonly modifierWeights: WeightSheet<WeaponGeneratorModifier> = copy(MODIFIER_WEIGHT_SHEET)

	private readonly DAMAGE_SPREAD = DAMAGE_SPREAD
	private readonly DAMAGE_SPREAD_AFFECT = DAMAGE_SPREAD_AFFECT
	private readonly DAMAGE_LEVEL_COEFFICIENT = DAMAGE_LEVEL_COEFFICIENT
	private readonly BASE_DAMAGE_VALUE = BASE_DAMAGE_VALUE
	private readonly WEAPON_TYPE_MULTIPLIER_AFFECT = WEAPON_TYPE_MULTIPLIER_AFFECT
	private readonly DAMAGE_RANDOM_AFFECT = DAMAGE_RANDOM_AFFECT

	constructor(props: Props) {
		this.baseLevel = props.level ?? this.level
		this.lootLevel = props.lootLevel ?? this.lootLevel
		this.amountOfNegativeModifiersChances = props.amountOfNegativeModifiersChances ?? this.amountOfNegativeModifiersChances
		this.typeChances = props.typeChances ?? this.typeChances
		this.qualityChances = props.qualityChances ?? this.qualityChances
	}

	public generate(): Weapon {
		this.level = this.getLevel()
		const type = this.getType()
		const quality = this.getQuality()
		const damage = this.getDamage(type)
		const modifiers = this.getModifiers(type, quality)
		const name = this.getName(type, quality)

		return new Weapon({
			name,
			level: this.level,
			quality,
			type,
			...damage,
			modifiers
		})
	}

	// Stats

	private getLevel(): number {
		return Math.min(Math.max(this.baseLevel + getRandomWithChance(this.levelChangesChances), 1), MAX_CHARACTER_LEVEL)
	}

	private getType(): WeaponType {
		const types = getRandomWithChance(this.typeChances)
		return types[getRandomInt(types.length)]
	}

	private getQuality(): LootQuality {
		return getRandomWithChance(this.qualityChances[this.lootLevel])
	}

	private getDamage(type: WeaponType): WeaponStats {
		const base = this.BASE_DAMAGE_VALUE
		const coefficient = this.level ** this.DAMAGE_LEVEL_COEFFICIENT * type.generationData.damageMultiplier * this.WEAPON_TYPE_MULTIPLIER_AFFECT
		const randomSeed = 1 - Math.random() * this.DAMAGE_RANDOM_AFFECT

		const medianDamage = (base + coefficient) * randomSeed

		const minDamage = Math.max(Math.round(medianDamage / 2 - this.DAMAGE_SPREAD * Math.random() * this.DAMAGE_SPREAD_AFFECT), 0)
		const maxDamage = Math.round(medianDamage / 2 + medianDamage * this.DAMAGE_SPREAD * Math.random() * this.DAMAGE_SPREAD_AFFECT)

		return {
			minDamage,
			maxDamage
		}
	}

	private getModifiers(type: WeaponType, quality: LootQuality): WeaponModifier {
		const positiveAmount = getRandomWithChance(this.amountOfPositiveModifiersChances[quality])
		const positive = this.getModifiersSet(type, positiveAmount)

		const negativeAmount = getRandomWithChance(this.amountOfNegativeModifiersChances[quality])
		const negative = invertModifiers(this.getModifiersSet(type, negativeAmount))

		return Weapon.CombineModifiers(positive, negative)
	}

	private getName(type: WeaponType, quality: LootQuality): string {
		return `${LootQuality[quality]} ${type.name}`
	}

	// Modifier helpers

	private getModifiersSet(type: WeaponType, amount: number): WeaponModifier {
		let pool = this.createModifiersWeightSheet(type)
		let modifiers: WeaponModifier = {}

		for (let i = 0; i < amount; i++) {
			const sheet = weightSheetToChances(pool)
			const modifierType = getRandomWithChance(sheet)
			const modifier = this.getModifier(modifierType, type)
			decreaseModifierChance(pool, modifierType)
			modifiers = Weapon.CombineModifiers(modifiers, modifier)
		}

		return modifiers
	}

	private getModifier(modifierType: WeaponGeneratorModifier, weaponType: WeaponType): WeaponModifier {
		switch (modifierType) {
			case 'damage':
				return this.generateDamageModifier()
			case 'maxDistance':
			case 'minDistance':
				return this.generateDistanceModifier(modifierType, weaponType)
			case 'defence':
				return this.generateDefenceModifier()
			case 'diceResult':
				return this.generateDiceResultModifier()
			case 'hitChance':
				return this.generateHitChanceModifier()
			case 'criticalChance':
				return this.generateCriticalChanceModifier()
			case 'criticalMultiplier':
				return this.generateCriticalMultiplierModifier()
			case 'evadeChance':
				return this.generateEvadeChanceModifier()
			default:
				return {}
		}
	}

	private createModifiersWeightSheet(type: WeaponType): WeightSheet<WeaponGeneratorModifier> {
		const pool: WeightSheet<WeaponGeneratorModifier> = copy(this.modifierWeights)

		if (ALL_DEFENCE_WEAPON.includes(type)) {
			pool.push(['defence', ADDITIONAL_SHIELD_DEFENCE_WEIGHT])
		}

		if (ALL_RANGED_WEAPONS.includes(type)) {
			pool.push(['minDistance', ADDITIONAL_RANGE_DISTANCE_WEIGHT], ['maxDistance', ADDITIONAL_RANGE_DISTANCE_WEIGHT])
		}

		if (ALL_MELEE_WEAPONS.includes(type)) {
			pool.push(['damage', ADDITIONAL_MELEE_DAMAGE_WEIGHT])
		}

		return pool
	}

	// Modifiers generators

	private generateDamageModifier(): WeaponModifier {
		const damage = Math.round(this.level ** 1.5 * (1 - Math.random() / 2))
		return {
			minDamage: damage,
			maxDamage: damage
		}
	}

	private generateDistanceModifier(modifierType: WeaponGeneratorModifier, weaponType: WeaponType): WeaponModifier {
		const distance = weaponType.range === WeaponRange.Ranged ? Math.round(this.level * (1 - Math.random() / 2)) : getRandomInt(3)

		return modifierType === 'minDistance'
			? {
					minDistance: distance,
					minEffectiveDistance: distance / 2
				}
			: {
					maxDistance: distance,
					maxEffectiveDistance: distance / 2
				}
	}

	private generateDefenceModifier(): WeaponModifier {
		return {
			defence: Math.round(this.level ** 1.5 * (1 - Math.random() / 2))
		}
	}

	private generateDiceResultModifier(): WeaponModifier {
		return {
			diceResult: getRandomWithChance([
				[1, 0.95],
				[2, 0.05]
			])
		}
	}

	private generateHitChanceModifier(): WeaponModifier {
		return {
			hitChance: (this.level * (1 - Math.random() / 1.5)) / 100
		}
	}

	private generateCriticalChanceModifier(): WeaponModifier {
		return {
			criticalChance: ((this.level / 2) * (1 - Math.random() / 1.5)) / 100
		}
	}

	private generateCriticalMultiplierModifier(): WeaponModifier {
		return {
			criticalMultiplier: (this.level * 3 * (1 - Math.random() / 1.5)) / 100
		}
	}

	private generateEvadeChanceModifier(): WeaponModifier {
		return {
			evadeChance: ((this.level / 2) * (1 - Math.random() / 1.5)) / 100
		}
	}
}
