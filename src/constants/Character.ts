import { Skills, SkillModifiers, SkillLevelModifiers } from '@/types'

export const BASE_CHARACTER_HEALTH_POINTS = 100
export const BASE_CHARACTER_HIT_CHANCE = 1.0
export const BASE_CHARACTER_CRITICAL_MULTIPLIER = 1.5
export const SKILL_EXPERIENCE_CUP: SkillLevelModifiers = [10, 20, 40, 70, 120, 200, 250, 350, 500, 700]
export const EMPTY_SKILL_SET: Skills = {
	agility: {
		level: 0,
		experience: 0
	},
	alchemy: {
		level: 0,
		experience: 0
	},
	charisma: {
		level: 0,
		experience: 0
	},
	constitution: {
		level: 0,
		experience: 0
	},
	contacts: {
		level: 0,
		experience: 0
	},
	craft: {
		level: 0,
		experience: 0
	},
	deceit: {
		level: 0,
		experience: 0
	},
	deduction: {
		level: 0,
		experience: 0
	},
	driving: {
		level: 0,
		experience: 0
	},
	fight: {
		level: 0,
		experience: 0
	},
	knowledge: {
		level: 0,
		experience: 0
	},
	lockpicking: {
		level: 0,
		experience: 0
	},
	magic: {
		level: 0,
		experience: 0
	},
	medicine: {
		level: 0,
		experience: 0
	},
	perception: {
		level: 0,
		experience: 0
	},
	provocation: {
		level: 0,
		experience: 0
	},
	resources: {
		level: 0,
		experience: 0
	},
	shooting: {
		level: 0,
		experience: 0
	},
	stealth: {
		level: 0,
		experience: 0
	},
	theft: {
		level: 0,
		experience: 0
	},
	will: {
		level: 0,
		experience: 0
	}
}

export const SKILL_MODIFIERS: SkillModifiers = {
	theft: {
		criticalChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		additionalTheftDistance: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]
	},
	perception: {
		criticalChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		evadeChance: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1],
		additionalViewRange: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
	},
	fight: {
		meleeDamageMultiplier: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
		criticalMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
	},
	knowledge: {
		criticalChance: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
	},
	agility: {
		additionalMoveRange: [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25],
		evadeChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		criticalMultiplier: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0]
	},
	stealth: {
		evadeChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2]
	},
	shooting: {
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
		rangeDamageMultiplier: [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0],
		criticalMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	},
	constitution: {
		additionalMaxHealth: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
		defenceMultiplier: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2, 1.35, 1.5],
		physicalDamageMultiplier: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
	},
	lockpicking: {},
	driving: {},
	will: {},
	deduction: {},
	medicine: {},
	deceit: {},
	provocation: {},
	resources: {},
	charisma: {},
	alchemy: {},
	contacts: {},
	craft: {},
	magic: {}
}
