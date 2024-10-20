import { Skills, SkillModifier, ChanceSheet, WeightSheet, WeaponModifier } from '@/types'
import { SKILL_MODIFIERS } from '@/constants/Character'
import { Armor, ArmorModifier } from '@/entities/Armor'
import { Wound, WoundConsequence } from '@/entities/Wound'
import { MULTIPLIED_LIMITED_MODIFIERS, SUBTRACTIVE_MODIFIERS, SUMMED_MODIFIERS } from '@/constants/Common'
import { MODIFIER_DECREATION_DIVIDER } from '@/constants/WeaponGenerator'

export function copy<T>(data: T): T {
	return JSON.parse(JSON.stringify(data))
}

export function combineStats<T extends keyof WeaponModifier | keyof ArmorModifier>(stat: T, values: (number | undefined)[]): number {
	if (SUMMED_MODIFIERS.includes(stat)) {
		return values.reduce((a, b) => (a || 0) + (b || 0), 0) || 0
	}

	if (MULTIPLIED_LIMITED_MODIFIERS.includes(stat)) {
		return Math.min(values.reduce((a, b) => (a || 0) + (b || 0), 0) || 0, 1)
	}

	if (SUBTRACTIVE_MODIFIERS.includes(stat)) {
		return values.reduce((a, b) => (a || 0) - (b || 0), 0) || 0
	}

	console.error('Unknown stat for combination: ', stat)
	return 0
}

export function objectsSum<T>(...objects: (Record<string, number> | undefined)[]): T {
	const result: Record<string, number> = {}
	for (const object of objects) {
		if (!object) {
			continue
		}

		for (const key in object) {
			if (result.hasOwnProperty(key)) {
				result[key] += object[key]
			} else {
				result[key] = object[key]
			}
		}
	}
	return result as T
}

export function getSkillBonus(bonus: keyof SkillModifier, skills: Skills): number {
	let result = 0
	for (const s in skills) {
		const skill = s as keyof Skills
		const level = skills[skill].level
		if (!level) {
			continue
		}
		const bonuses = SKILL_MODIFIERS[skill][bonus]
		result += bonuses && bonuses[level - 1] ? bonuses[level - 1] : 0
	}
	return result
}

export function getWoundsPenalty(stat: keyof Omit<WoundConsequence, 'skills' | 'slotsDisabled'>, wounds: Wound[]): number {
	let result = 0
	wounds.forEach(wound => {
		if (stat in wound.consequence) {
			result += wound.consequence[stat] as number
		}
	})
	return result
}

export function getArmorStat(stat: keyof ArmorModifier, armors: Armor[]): number {
	let result = 0
	armors.forEach(armor => {
		// @ts-ignore
		result += (armor[stat] || 0) + ((armor.bonuses && armor.bonuses[stat]) || 0) + ((armor.penalty && armor.penalty[stat]) || 0)
	})
	return result
}

export function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max)
}

export function getRandomWithChance<T>(values: ChanceSheet<T>): T {
	if (!values.length) {
		throw new Error('Unable to get random value: values not defined.')
	}
	const rand = Math.random()
	let nextChance = 0
	for (let i = 0; i < values.length; i++) {
		nextChance += values[i][1]
		if (rand <= nextChance) {
			return values[i][0]
		}
	}
	return values[values.length - 1][0]
}

export function weightSheetToChances<T>(weightSheet: WeightSheet<T>): ChanceSheet<T> {
	const entries = new Map<T, number>()
	let sum = 0
	weightSheet.forEach(element => {
		sum += element[1]
		const value = entries.get(element[0])
		if (value) {
			entries.set(element[0], value + element[1])
			return
		}
		entries.set(element[0], element[1])
	})

	return [...entries.entries()].map(e => {
		if (e[1] < 0) {
			e[1] = 0
		}

		return [e[0], e[1] / sum]
	})
}

export function invertModifiers(modifiers: WeaponModifier): WeaponModifier {
	const result = copy(modifiers)

	for (let k in result) {
		const key = k as keyof WeaponModifier
		result[key] = -(result[key] || 0)
	}

	return result
}

export function decreaseModifierChance<T>(pool: WeightSheet<T>, modifier: T, divider = MODIFIER_DECREATION_DIVIDER): void {
	const element = pool.find(e => e[0] === modifier)

	if (element) {
		element[1] /= divider
	}
}

export function enumKeys<T extends Record<string, any>>(obj: T): (keyof T)[] {
	const keys: (keyof T)[] = []
	for (const key in obj) {
		if (isNaN(Number(key))) {
			keys.push(key)
		}
	}
	return keys
}

export function splitCamelCase(str: string): string {
	return capitalizeFirstLetter(str.replace(/([a-z])([A-Z])/g, '$1 $2'))
}

export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
