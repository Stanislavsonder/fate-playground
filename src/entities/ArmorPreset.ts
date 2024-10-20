import { BodyPart, MAX_CHARACTER_LEVEL } from '@/constants/Character'
import { CharacterBodySize, LootLevel } from '@/types'
import { copy } from '@/helpers/utils'
import { ArmorType } from '@/constants/Armor'
import { ALL_WORLD_SETTINGS, WorldSetting } from '@/constants/Application'
import { ArmorGeneratorModifier } from '@/services/armorGenerator.service'

export const ALL_LOOT_LEVELS: LootLevel[] = [LootLevel.Garbage, LootLevel.Common, LootLevel.Uncommon, LootLevel.Rare, LootLevel.Epic, LootLevel.Legendary]

export const ALL_CHARACTER_SIZES: CharacterBodySize[] = [
	CharacterBodySize.Tiny,
	CharacterBodySize.Small,
	CharacterBodySize.Medium,
	CharacterBodySize.Big,
	CharacterBodySize.Giant
]

export const ALL_ARMOR_TYPES: ArmorType[] = [ArmorType.Cloth, ArmorType.Light, ArmorType.Medium, ArmorType.Heavy]

type Props = {
	name: string
	bodyParts?: BodyPart[]
	possibleSizes?: CharacterBodySize[]
	possibleArmorTypes?: ArmorType[]
	possibleLootLevels?: LootLevel[]
	possibleLevelRange?: [number, number]
	impossibleModifiers?: ArmorGeneratorModifier[]
	worldSettings?: WorldSetting[]
	isPair?: boolean
}

export class ArmorPreset {
	public readonly name: string
	public readonly bodyParts: BodyPart[] = []
	public readonly possibleSizes: CharacterBodySize[] = copy(ALL_CHARACTER_SIZES)
	public readonly possibleArmorTypes: ArmorType[] = copy(ALL_ARMOR_TYPES)
	public readonly possibleLootLevels: LootLevel[] = copy(ALL_LOOT_LEVELS)
	public readonly possibleLevelRange = [1, MAX_CHARACTER_LEVEL]
	public readonly impossibleModifiers: ArmorGeneratorModifier[] = []
	public readonly worldSettings: WorldSetting[] = copy(ALL_WORLD_SETTINGS)
	public readonly isPair: boolean = false

	constructor(props: Props) {
		this.name = props.name
		this.bodyParts = props.bodyParts ?? this.bodyParts
		this.possibleSizes = props.possibleSizes ?? this.possibleSizes
		this.possibleLootLevels = props.possibleLootLevels ?? this.possibleLootLevels
		this.possibleArmorTypes = props.possibleArmorTypes ?? this.possibleArmorTypes
		this.possibleLevelRange = props.possibleLevelRange ?? this.possibleLevelRange
		this.impossibleModifiers = props.impossibleModifiers ?? this.impossibleModifiers
		this.worldSettings = props.worldSettings ?? this.worldSettings
		this.isPair = props.isPair ?? this.isPair
	}
}
