import { WeaponType } from '@/entities/WeaponType'
import { getRandomInt, getRandomWithChance } from '@/utils'
import { ALL_WEAPON_TYPES, Shield } from '@/constants/Weapons'
import { Weapon, WeaponModifier, WeaponQuality, WeaponRange, WeaponStats } from '@/entities/Weapon'
import { LootLevel } from '@/types'

const TYPES_WITH_DEFENCE = [Shield]
const ALL_RANGED_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Ranged)

const ALL_MELEE_WEAPONS = ALL_WEAPON_TYPES.filter(weapon => weapon.range === WeaponRange.Melee)

const LEVEL_RISE_CHANCES: [number, number][] = [
	[-2, 0.05],
	[-1, 0.2],
	[0, 0.5],
	[+1, 0.2],
	[+2, 0.05]
]

const QUALITY_LEVEL_CHANCES: Record<LootLevel, [WeaponQuality, number][]> = {
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

const NEGATIVE_MODIFIERS_AMOUNT_CHANCES: Record<WeaponQuality, [number, number][]> = {
	[WeaponQuality.Garbage]: [
		[1, 0.05],
		[2, 0.3],
		[3, 0.45],
		[4, 0.2]
	],
	[WeaponQuality.Common]: [
		[0, 0.55],
		[1, 0.3],
		[2, 0.1],
		[3, 0.05]
	],
	[WeaponQuality.Good]: [
		[0, 0.7],
		[1, 0.2],
		[2, 0.1]
	],
	[WeaponQuality.Skillful]: [
		[0, 0.9],
		[1, 0.1]
	],
	[WeaponQuality.Perfect]: [
		[0, 0.95],
		[1, 0.05]
	],
	[WeaponQuality.Legendary]: [[0, 1]]
}

const MELEE_RANGE_WEAPON_CHANCES: [WeaponType[], number][] = [
	[ALL_MELEE_WEAPONS, 0.5],
	[ALL_RANGED_WEAPONS, 0.5]
]

type ModifiersAmount = {
	positive: number
	negative: number
}

export function generateWeapon(level: number, lootLevel: LootLevel) {
	level = Math.max(level + getRandomWithChance(LEVEL_RISE_CHANCES), 1)
	const type = getWeaponType(getRandomWithChance(MELEE_RANGE_WEAPON_CHANCES))
	const quality = getLootQuality(lootLevel)
	const damage = getDamage(level, type)
	const name = generateWeaponName(quality, type)
	const modifiersAmount = getModifiersAmount(quality)
	const modifiers = getModifiers(modifiersAmount, level, type)
	console.log(`Modifiers: ${modifiersAmount.positive} / ${modifiersAmount.negative}`)
	return new Weapon({
		name,
		...damage,
		quality,
		type,
		modifiers
	})
}

function getWeaponType(types: WeaponType[]): WeaponType {
	return types[getRandomInt(types.length)]
}

function getLootQuality(lootLevel: LootLevel) {
	return getRandomWithChance(QUALITY_LEVEL_CHANCES[lootLevel])
}

const DAMAGE_SPREAD = 0.33
const DAMAGE_SPREAD_AFFECT = 0.5
const DAMAGE_LEVEL_COEFFICIENT = 2.5
const BASE_DAMAGE_VALUE = 10
const WEAPON_TYPE_MULTIPLIER_AFFECT = 0.6
const DAMAGE_RANDOM_AFFECT = 0.5

function getDamage(level: number, type: WeaponType): WeaponStats {
	const dmg =
		(BASE_DAMAGE_VALUE + level ** DAMAGE_LEVEL_COEFFICIENT * type.generationData.damageMultiplier * WEAPON_TYPE_MULTIPLIER_AFFECT) *
		(1 - Math.random() * DAMAGE_RANDOM_AFFECT)

	const minDamage = Math.max(Math.round(dmg / 2 - DAMAGE_SPREAD * Math.random() * DAMAGE_SPREAD_AFFECT), 0)
	const maxDamage = Math.round(dmg / 2 + dmg * DAMAGE_SPREAD * Math.random() * DAMAGE_SPREAD_AFFECT)

	return {
		minDamage,
		maxDamage
	}
}

function generateWeaponName(quality: WeaponQuality, type: WeaponType): string {
	return `${WeaponQuality[quality]} ${type.name}`
}
// Броня на 30 ур === +- 350 единиц (без множителей - обычная броня)

function getModifiersAmount(quality: WeaponQuality): ModifiersAmount {
	const defaultModifiers = Math.max(0, quality - 1)
	const additionalModifiers = getRandomWithChance([
		[0, 0.6],
		[+1, 0.25],
		[+2, 0.1],
		[+3, 0.05]
	])
	const negativeModifiers = getRandomWithChance(NEGATIVE_MODIFIERS_AMOUNT_CHANCES[quality])

	return {
		positive: defaultModifiers + additionalModifiers,
		negative: negativeModifiers
	}
}

function getModifiers(amount: ModifiersAmount, level: number, type: WeaponType): WeaponModifier {
	const modifiers: WeaponModifier = {}
	const modifiersPool = ['damage', 'maxDistance', 'minDistance', 'diceResult', 'hitChance', 'criticalMultiplier', 'criticalChance']

	if (TYPES_WITH_DEFENCE.includes(type)) {
		modifiersPool.push(...['defence', 'defence', 'defence'])
	}

	if (ALL_RANGED_WEAPONS.includes(type)) {
		modifiersPool.push(...['minDistance', 'maxDistance'])
	}

	if (ALL_MELEE_WEAPONS.includes(type)) {
		modifiersPool.push(...['minDamage', 'maxDamage'])
	}

	let positivePool = [...modifiersPool]
	let negativePool = [...modifiersPool]
	for (let i = 0; i < amount.positive; i++) {
		const index = getRandomInt(positivePool.length)
		const modifier = generateModifier(positivePool[index], level, type)
		console.log('Positive modifier: ', positivePool[index], ' = ', modifier)
		positivePool = positivePool.filter((_, j) => j !== index)
		for (let key in modifier) {
			const k = key as keyof WeaponModifier
			modifiers[k] = Weapon.CombineStats(k, [modifier[k], modifiers[k]])
		}
	}

	for (let i = 0; i < amount.negative; i++) {
		const index = getRandomInt(negativePool.length)
		const modifier = generateModifier(negativePool[index], level, type)
		console.log('Negative modifier: ', negativePool[index], ' = ', modifier)
		negativePool = negativePool.filter((_, j) => j !== index)
		for (let key in modifier) {
			const k = key as keyof WeaponModifier
			modifiers[k] = Weapon.CombineStats(k, [-Number(modifier[k]), modifiers[k]])
		}
	}

	return modifiers
}

function generateModifier(name: string, level: number, weaponType: WeaponType): WeaponModifier {
	switch (name) {
		case 'damage':
			return (() => {
				const damage = Math.round(level ** 1.5 * (1 - Math.random() / 2))
				return {
					minDamage: damage,
					maxDamage: damage
				}
			})()
		case 'maxDistance':
		case 'minDistance':
			return (() => {
				let distance
				if (weaponType.range === WeaponRange.Ranged) {
					distance = Math.round(level * (1 - Math.random() / 2))
				} else {
					distance = getRandomInt(3)
				}

				if (name === 'minDistance') {
					return {
						minDistance: distance,
						minEffectiveDistance: distance / 2
					}
				}
				return {
					maxDistance: distance,
					maxEffectiveDistance: distance / 2
				}
			})()
		case 'defence':
			return {
				defence: Math.round(level ** 1.5 * (1 - Math.random() / 2))
			}
		case 'diceResult':
			return {
				diceResult: getRandomWithChance([
					[1, 0.95],
					[2, 0.05]
				])
			}
		case 'hitChance':
			return {
				hitChance: (level * (1 - Math.random() / 1.5)) / 100
			}

		case 'criticalChance':
			return {
				criticalChance: ((level / 2) * (1 - Math.random() / 1.5)) / 100
			}
		case 'criticalMultiplier':
			return {
				criticalMultiplier: (level * 3 * (1 - Math.random() / 1.5)) / 100
			}
		default:
			return {}
	}
}
