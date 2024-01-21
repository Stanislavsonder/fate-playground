import { Skills, SkillModifiers, SkillLevelModifiers } from '@/types'
import { ArmorSlot } from '@/constants/Armor'
import { CharacterBody } from '@/entities/Character'

export const BASE_CHARACTER_HEALTH_POINTS = 100
export const DICE_HIT_MULTIPLIER = 0.1
export const DICE_EVADE_MULTIPLIER = 0.1
export const BASE_CHARACTER_CRITICAL_MULTIPLIER = 1.5
export const SKILL_EXPERIENCE_CUP: SkillLevelModifiers = [20, 50, 90, 150, 250, 350, 450, 625, 825, 1000]
export const CHARACTER_LEVEL_CUPS = [
	100, 150, 170, 225, 274, 1, 200, 233, 266, 300, 333, 366, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1075, 1150, 1225, 1300, 1375, 1450, 1525, 1600, 1675,
	1750
]
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
		additionalTheftDistance: [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.1, 1.3, 1.5, 2.0]
	},
	perception: {
		criticalChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		evadeChance: [0.01, 0.015, 0.02, 0.03, 0.04, 0.06, 0.07, 0.075, 0.09, 0.12],
		additionalViewRange: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
	},
	fight: {
		meleeDamageMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.7, 0.85, 1.0, 1.25],
		criticalMultiplier: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5],
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
	},
	knowledge: {
		criticalChance: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
	},
	agility: {
		additionalMoveRange: [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25],
		evadeChance: [0.02, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.25],
		criticalMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5]
	},
	stealth: {
		evadeChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2]
	},
	shooting: {
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
		rangeDamageMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.7, 0.85, 1.0, 1.25],
		criticalMultiplier: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
	},
	constitution: {
		additionalMaxHealth: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
		defenceMultiplier: [0.1, 0.2, 0.35, 0.45, 0.6, 0.8, 1.0, 1.1, 1.25, 1.5],
		physicalDamageMultiplier: [0.02, 0.04, 0.06, 0.08, 0.1, 0.125, 0.15, 0.175, 0.2, 0.25]
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

export const DEFAULT_HUMAN_BODY: CharacterBody = [
	[ArmorSlot.TopHead, 0.035],
	[ArmorSlot.Mask, 0.02],
	[ArmorSlot.Ears, 0.005],
	[ArmorSlot.Eye, 0.0025],
	[ArmorSlot.Eye, 0.0025],
	[ArmorSlot.Nose, 0.005],
	[ArmorSlot.Neck, 0.02],

	[ArmorSlot.Shoulder, 0.01],
	[ArmorSlot.TopArm, 0.03],
	[ArmorSlot.Elbow, 0.005],
	[ArmorSlot.LowArm, 0.03],
	[ArmorSlot.Wrist, 0.01],
	[ArmorSlot.Fingers, 0.005],

	[ArmorSlot.Shoulder, 0.01],
	[ArmorSlot.TopArm, 0.03],
	[ArmorSlot.Elbow, 0.005],
	[ArmorSlot.LowArm, 0.03],
	[ArmorSlot.Wrist, 0.01],
	[ArmorSlot.Fingers, 0.005],

	[ArmorSlot.Chest, 0.06],
	[ArmorSlot.Stomach, 0.06],
	[ArmorSlot.Back, 0.18],
	[ArmorSlot.Belt, 0.03],
	[ArmorSlot.Groin, 0.03],

	[ArmorSlot.TopLeg, 0.08],
	[ArmorSlot.Knee, 0.015],
	[ArmorSlot.LowLeg, 0.07],
	[ArmorSlot.Foot, 0.02],

	[ArmorSlot.TopLeg, 0.08],
	[ArmorSlot.Knee, 0.015],
	[ArmorSlot.LowLeg, 0.07],
	[ArmorSlot.Foot, 0.02]
]
