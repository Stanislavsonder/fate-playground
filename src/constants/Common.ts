import { ArmorModifier } from '@/entities/Armor'
import { WeaponModifier } from '@/types'

export const SUMMED_MODIFIERS: (keyof WeaponModifier | keyof ArmorModifier)[] = [
	'minDamage',
	'maxDamage',
	'maxDistance',
	'maxEffectiveDistance',
	'defence',
	'diceResult',
	'criticalMultiplier',
	'damageMultiplier',
	'moveDistance',
	'additionalHealthPoints'
]

export const MULTIPLIED_LIMITED_MODIFIERS: (keyof WeaponModifier | keyof ArmorModifier)[] = ['evadeChance', 'hitChance', 'criticalChance']

export const SUBTRACTIVE_MODIFIERS: (keyof WeaponModifier | keyof ArmorModifier)[] = ['minEffectiveDistance', 'minDistance']
