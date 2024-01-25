import { WeaponModifier } from '@/entities/Weapon'
import { ArmorModifier } from '@/entities/Armor'

export const SUMMED_MODIFIERS: (keyof WeaponModifier | keyof ArmorModifier)[] = [
	'minDamage',
	'maxDamage',
	'minDistance',
	'maxDistance',
	'minEffectiveDistance',
	'maxEffectiveDistance',
	'defence',
	'diceResult',
	'criticalMultiplier',
	'moveDistanceMultiplier',
	'damageMultiplier',
	'moveDistance',
	'defenceMultiplier',
	'additionalHealthPoints'
]

export const MULTIPLIED_LIMITED_MODIFIERS: (keyof WeaponModifier | keyof ArmorModifier)[] = ['evadeChance', 'hitChance', 'criticalChance']
