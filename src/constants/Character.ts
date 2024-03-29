import { CharacterBody, CharacterBodySize, SkillLevelModifiers, SkillModifiers, Skills, WeaponSlot } from '@/types'

export const MAX_CHARACTER_LEVEL = 30

export const BASE_CHARACTER_HEALTH_POINTS = 100
export const DICE_HIT_MULTIPLIER = 0.1
export const DICE_EVADE_MULTIPLIER = 0.1
export const BASE_CHARACTER_CRITICAL_MULTIPLIER = 1.5
export const SKILL_EXPERIENCE_CUP: SkillLevelModifiers = [20, 50, 90, 150, 250, 350, 450, 625, 825, 1000]
export const CHARACTER_LEVEL_CUPS = [
	920, 200, 233, 266, 300, 333, 366, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1075, 1150, 1225, 1300, 1375, 1450, 1525, 1600, 1675,
	1750, 9999999
]
export const CHARACTER_LEVEL_ADDITIONAL_HP_BONUS = [
	0, 15, 30, 50, 70, 90, 115, 140, 170, 200, 235, 275, 325, 375, 425, 500, 590, 690, 800, 930, 1130, 1300, 1500, 1750, 2000, 2100, 2200, 2300, 2400, 2500,
	2600
]

export const EMPTY_SKILL_SET: Skills = {
	agility: {
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
		additionalMaxHealth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	knowledge: {
		criticalChance: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1]
	},
	agility: {
		additionalMoveRange: [2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25],
		evadeChance: [0.02, 0.03, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.25],
		criticalMultiplier: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]
	},
	stealth: {
		evadeChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2],
		criticalMultiplier: [0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.175, 0.2, 0.225, 0.25]
	},
	shooting: {
		rangeDamageMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.7, 0.85, 1.0, 1.25],
		criticalMultiplier: [0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.2, 0.25, 0.3, 0.35]
	},
	constitution: {
		additionalMaxHealth: [20, 35, 60, 75, 115, 200, 300, 400, 650, 1000],
		//defenceMultiplier: [0.1, 0.2, 0.35, 0.45, 0.6, 0.8, 1.0, 1.1, 1.25, 1.5],
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
	contacts: {},
	craft: {}
}

export enum BodyPart {
	Head,
	Jaws,
	Eyes,
	Neck,
	Shoulder,
	UpperArm,
	Elbow,
	LowerArm,
	Wrist,
	Fingers,
	Chest,
	Stomach,
	Groin,
	UpperLeg,
	Knee,
	LowerLeg,
	Foot,
	Back,
	Tail,
	Wing
}

export const DEFAULT_HUMAN_BODY: CharacterBody = {
	size: CharacterBodySize.Medium,
	armorSlots: [
		{ size: 0.05, part: BodyPart.Head },
		{ size: 0.05, part: BodyPart.Jaws },
		{ size: 0.01, part: BodyPart.Eyes },
		{ size: 0.02, part: BodyPart.Neck },
		{ size: 0.02, part: BodyPart.Shoulder },
		{ size: 0.02, part: BodyPart.Shoulder },
		{ size: 0.05, part: BodyPart.UpperArm },
		{ size: 0.05, part: BodyPart.UpperArm },
		{ size: 0.01, part: BodyPart.Elbow },
		{ size: 0.01, part: BodyPart.Elbow },
		{ size: 0.045, part: BodyPart.LowerArm },
		{ size: 0.045, part: BodyPart.LowerArm },
		{ size: 0.015, part: BodyPart.Wrist },
		{ size: 0.015, part: BodyPart.Wrist },
		{ size: 0.01, part: BodyPart.Fingers },
		{ size: 0.01, part: BodyPart.Fingers },
		{ size: 0.09, part: BodyPart.Stomach },
		{ size: 0.09, part: BodyPart.Chest },
		{ size: 0.03, part: BodyPart.Groin },
		{ size: 0.07, part: BodyPart.UpperLeg },
		{ size: 0.07, part: BodyPart.UpperLeg },
		{ size: 0.01, part: BodyPart.Knee },
		{ size: 0.01, part: BodyPart.Knee },
		{ size: 0.055, part: BodyPart.LowerLeg },
		{ size: 0.055, part: BodyPart.LowerLeg },
		{ size: 0.02, part: BodyPart.Foot },
		{ size: 0.02, part: BodyPart.Foot },
		{ size: 0.05, part: BodyPart.Back }
	],
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand]
}
