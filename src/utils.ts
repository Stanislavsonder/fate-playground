import { Skills, SkillModifier } from './types'
import { SKILL_MODIFIERS } from './constants/Character'
import { Weapon, WeaponModifier } from './entities/Weapon'
import { Armor, ArmorModifier } from './entities/Armor'
import { Wound, WoundConsequence } from './entities/Wound'

export function copy<T>(data: T): T {
	return JSON.parse(JSON.stringify(data))
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

export function getWeaponStat(stat: keyof WeaponModifier, weapon: Weapon, bonus = false, penalty = false): number {
	const stats = weapon.stats(bonus, penalty)
	if (stat in stats) {
		return stats[stat] as number
	}
	return 0
}

export function getArmorStat(stat: keyof ArmorModifier, armors: Armor[]): number {
	let result = 0
	armors.forEach(armor => {
		result += ((armor[stat] as number) || 0) + ((armor.bonuses && armor.bonuses[stat]) || 0) + ((armor.penalty && armor.penalty[stat]) || 0)
	})
	return result
}
