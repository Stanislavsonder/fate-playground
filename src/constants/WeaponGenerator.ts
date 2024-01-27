import { ALL_WEAPON_TYPES, Shield } from '@/constants/Weapons'
import { WeaponQuality, WeaponRange } from '@/entities/Weapon'
import { ChanceSheet, LootLevel, WeightSheet } from '@/types'
import { WeaponType } from '@/entities/WeaponType'
import { WeaponGeneratorModifier } from '@/services/weaponGenerator.service'

export const ALL_DEFENCE_WEAPON = [Shield]
export const ALL_RANGED_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Ranged)
export const ALL_MELEE_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Melee)

export const LEVEL_RISE_CHANCES: ChanceSheet<number> = [
	[-2, 0.05],
	[-1, 0.2],
	[0, 0.5],
	[+1, 0.2],
	[+2, 0.05]
]

export const QUALITY_CHANCES: Record<LootLevel, ChanceSheet<WeaponQuality>> = {
	[LootLevel.Garbage]: [
		[WeaponQuality.Garbage, 0.85],
		[WeaponQuality.Common, 0.12],
		[WeaponQuality.Good, 0.02],
		[WeaponQuality.Skillful, 0.007],
		[WeaponQuality.Perfect, 0.002],
		[WeaponQuality.Legendary, 0.001]
	],

	[LootLevel.Common]: [
		[WeaponQuality.Garbage, 0.2],
		[WeaponQuality.Common, 0.45],
		[WeaponQuality.Good, 0.2],
		[WeaponQuality.Skillful, 0.1],
		[WeaponQuality.Perfect, 0.05],
		[WeaponQuality.Legendary, 0]
	],
	[LootLevel.Uncommon]: [
		[WeaponQuality.Garbage, 0.1],
		[WeaponQuality.Common, 0.3],
		[WeaponQuality.Good, 0.35],
		[WeaponQuality.Skillful, 0.17],
		[WeaponQuality.Perfect, 0.08],
		[WeaponQuality.Legendary, 0]
	],

	[LootLevel.Rare]: [
		[WeaponQuality.Garbage, 0.05],
		[WeaponQuality.Common, 0.2],
		[WeaponQuality.Good, 0.3],
		[WeaponQuality.Skillful, 0.3],
		[WeaponQuality.Perfect, 0.15],
		[WeaponQuality.Legendary, 0]
	],

	[LootLevel.Epic]: [
		[WeaponQuality.Garbage, 0],
		[WeaponQuality.Common, 0.075],
		[WeaponQuality.Good, 0.2],
		[WeaponQuality.Skillful, 0.375],
		[WeaponQuality.Perfect, 0.35],
		[WeaponQuality.Legendary, 0]
	],

	[LootLevel.Legendary]: [
		[WeaponQuality.Garbage, 0],
		[WeaponQuality.Common, 0],
		[WeaponQuality.Good, 0.15],
		[WeaponQuality.Skillful, 0.35],
		[WeaponQuality.Perfect, 0.5],
		[WeaponQuality.Legendary, 0]
	]
}

export const AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES: Record<WeaponQuality, ChanceSheet<number>> = {
	[WeaponQuality.Garbage]: [
		[1, 0.05],
		[2, 0.3],
		[3, 0.45],
		[4, 0.2]
	],
	[WeaponQuality.Common]: [
		[0, 0.6],
		[1, 0.27],
		[2, 0.08],
		[3, 0.05]
	],
	[WeaponQuality.Good]: [
		[0, 0.85],
		[1, 0.1],
		[2, 0.05]
	],
	[WeaponQuality.Skillful]: [
		[0, 0.95],
		[1, 0.05]
	],
	[WeaponQuality.Perfect]: [
		[0, 0.99],
		[1, 0.01]
	],
	[WeaponQuality.Legendary]: [[0, 1]]
}

export const AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES: Record<WeaponQuality, ChanceSheet<number>> = {
	[WeaponQuality.Garbage]: [
		[0, 0.85],
		[1, 0.15]
	],
	[WeaponQuality.Common]: [
		[0, 0.45],
		[1, 0.3],
		[2, 0.2],
		[3, 0.05]
	],
	[WeaponQuality.Good]: [
		[2, 0.55],
		[3, 0.33],
		[4, 0.12]
	],
	[WeaponQuality.Skillful]: [
		[2, 0.1],
		[3, 0.55],
		[4, 0.25],
		[5, 0.1]
	],
	[WeaponQuality.Perfect]: [
		[3, 0.05],
		[4, 0.55],
		[5, 0.4]
	],
	[WeaponQuality.Legendary]: [
		[4, 0.35],
		[5, 0.4],
		[6, 0.25]
	]
}

export const WEAPON_TYPE_CHANCES: ChanceSheet<WeaponType[]> = [
	[ALL_MELEE_WEAPONS, 0.5],
	[ALL_RANGED_WEAPONS, 0.5]
]

// Weight
export const ADDITIONAL_SHIELD_DEFENCE_WEIGHT = 60
export const ADDITIONAL_RANGE_DISTANCE_WEIGHT = 50
export const ADDITIONAL_MELEE_DAMAGE_WEIGHT = 20
export const MODIFIER_WEIGHT_SHEET: WeightSheet<WeaponGeneratorModifier> = [
	['damage', 35],
	['maxDistance', 20],
	['minDistance', 20],
	['diceResult', 10],
	['hitChance', 15],
	['criticalMultiplier', 20],
	['criticalChance', 20],
	['defence', 0],
	['evadeChance', 10]
]

export const MODIFIER_DECREATION_DIVIDER = 2

// Damage calculation
export const DAMAGE_SPREAD = 0.33
export const DAMAGE_SPREAD_AFFECT = 0.5
export const DAMAGE_LEVEL_COEFFICIENT = 2.5
export const BASE_DAMAGE_VALUE = 10
export const WEAPON_TYPE_MULTIPLIER_AFFECT = 0.6
export const DAMAGE_RANDOM_AFFECT = 0.5
