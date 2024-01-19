import { Skills, SkillModifier } from './types'
import { SKILL_MODIFIERS } from './constants/Character'
import { Armor, ArmorModifier } from './entities/Armor'
import { Wound, WoundConsequence } from './entities/Wound'
import { MULTIPLIED_LIMITED_MODIFIERS, SUMMED_MODIFIERS } from '@/constants/Common'
import { WeaponModifier } from '@/entities/Weapon'

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
