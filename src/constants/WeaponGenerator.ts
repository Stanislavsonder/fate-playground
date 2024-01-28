import { ALL_WEAPON_TYPES, Shield } from '@/constants/Weapons'
import { LootQuality, WeaponRange } from '@/entities/Weapon'
import { ChanceSheet, LootLevel, WeightSheet } from '@/types'
import { WeaponType } from '@/entities/WeaponType'
import { WeaponGeneratorModifier } from '@/services/weaponGenerator.service'
import { weightSheetToChances } from '@/components/helpers/utils'

export const ALL_DEFENCE_WEAPON = [Shield]
export const ALL_RANGED_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Ranged)
export const ALL_MELEE_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Melee)

export const LEVEL_RISE_CHANCES: ChanceSheet<number> = weightSheetToChances([
	[-2, 5],
	[-1, 20],
	[0, 50],
	[+1, 20],
	[+2, 5]
])

export const QUALITY_CHANCES: Record<LootLevel, ChanceSheet<LootQuality>> = {
	[LootLevel.Garbage]: weightSheetToChances([
		[LootQuality.Garbage, 0.85],
		[LootQuality.Common, 0.12],
		[LootQuality.Good, 0.02],
		[LootQuality.Skillful, 0.007],
		[LootQuality.Perfect, 0.002],
		[LootQuality.Legendary, 0.001]
	]),

	[LootLevel.Common]: weightSheetToChances([
		[LootQuality.Garbage, 0.2],
		[LootQuality.Common, 0.45],
		[LootQuality.Good, 0.2],
		[LootQuality.Skillful, 0.1],
		[LootQuality.Perfect, 0.05],
		[LootQuality.Legendary, 0]
	]),
	[LootLevel.Uncommon]: weightSheetToChances([
		[LootQuality.Garbage, 0.1],
		[LootQuality.Common, 0.3],
		[LootQuality.Good, 0.35],
		[LootQuality.Skillful, 0.17],
		[LootQuality.Perfect, 0.08],
		[LootQuality.Legendary, 0]
	]),

	[LootLevel.Rare]: weightSheetToChances([
		[LootQuality.Garbage, 0.05],
		[LootQuality.Common, 0.2],
		[LootQuality.Good, 0.3],
		[LootQuality.Skillful, 0.3],
		[LootQuality.Perfect, 0.15],
		[LootQuality.Legendary, 0]
	]),

	[LootLevel.Epic]: weightSheetToChances([
		[LootQuality.Garbage, 0],
		[LootQuality.Common, 7.5],
		[LootQuality.Good, 20],
		[LootQuality.Skillful, 37.5],
		[LootQuality.Perfect, 35],
		[LootQuality.Legendary, 0]
	]),

	[LootLevel.Legendary]: weightSheetToChances([
		[LootQuality.Garbage, 0],
		[LootQuality.Common, 0],
		[LootQuality.Good, 15],
		[LootQuality.Skillful, 35],
		[LootQuality.Perfect, 50],
		[LootQuality.Legendary, 0]
	])
}

export const AMOUNT_OF_NEGATIVE_MODIFIERS_CHANCES: Record<LootQuality, ChanceSheet<number>> = {
	[LootQuality.Garbage]: weightSheetToChances([
		[1, 0.05],
		[2, 0.3],
		[3, 0.45],
		[4, 0.2]
	]),
	[LootQuality.Common]: weightSheetToChances([
		[0, 0.6],
		[1, 0.27],
		[2, 0.08],
		[3, 0.05]
	]),
	[LootQuality.Good]: weightSheetToChances([
		[0, 0.85],
		[1, 0.1],
		[2, 0.05]
	]),
	[LootQuality.Skillful]: weightSheetToChances([
		[0, 0.95],
		[1, 0.05]
	]),
	[LootQuality.Perfect]: weightSheetToChances([
		[0, 0.99],
		[1, 0.01]
	]),
	[LootQuality.Legendary]: weightSheetToChances([[0, 1]])
}

export const AMOUNT_OF_POSITIVE_MODIFIERS_CHANCES: Record<LootQuality, ChanceSheet<number>> = {
	[LootQuality.Garbage]: weightSheetToChances([
		[0, 0.85],
		[1, 0.15]
	]),
	[LootQuality.Common]: weightSheetToChances([
		[0, 0.45],
		[1, 0.3],
		[2, 0.2],
		[3, 0.05]
	]),
	[LootQuality.Good]: weightSheetToChances([
		[2, 0.55],
		[3, 0.33],
		[4, 0.12]
	]),
	[LootQuality.Skillful]: weightSheetToChances([
		[2, 0.1],
		[3, 0.55],
		[4, 0.25],
		[5, 0.1]
	]),
	[LootQuality.Perfect]: weightSheetToChances([
		[3, 0.05],
		[4, 0.55],
		[5, 0.4]
	]),
	[LootQuality.Legendary]: weightSheetToChances([
		[4, 0.35],
		[5, 0.4],
		[6, 0.25]
	])
}

export const WEAPON_TYPE_CHANCES: ChanceSheet<WeaponType[]> = weightSheetToChances([
	[ALL_MELEE_WEAPONS, 50],
	[ALL_RANGED_WEAPONS, 50]
])

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

export const MODIFIER_DECREATION_DIVIDER = 1.5

// Damage calculation
export const DAMAGE_SPREAD = 0.33 // 0 - 1
export const DAMAGE_SPREAD_AFFECT = 0.5 // 0 - 1
export const DAMAGE_LEVEL_COEFFICIENT = 2.5 // 1++
export const BASE_DAMAGE_VALUE = 10 // 0++
export const WEAPON_TYPE_MULTIPLIER_AFFECT = 0.6 // 0 - 1
export const DAMAGE_RANDOM_AFFECT = 0.5 // 0 - 1
