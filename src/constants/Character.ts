import { CharacterBody, CharacterBodySize, SkillLevelModifiers, SkillModifiers, Skills } from '@/types'
import eyeImage from '@/assets/bodyParts/eye.png'
import noseImage from '@/assets/bodyParts/nose.png'

export const BASE_CHARACTER_HEALTH_POINTS = 100
export const DICE_HIT_MULTIPLIER = 0.1
export const DICE_EVADE_MULTIPLIER = 0.1
export const BASE_CHARACTER_CRITICAL_MULTIPLIER = 1.5
export const SKILL_EXPERIENCE_CUP: SkillLevelModifiers = [20, 50, 90, 150, 250, 350, 450, 625, 825, 1000]
export const CHARACTER_LEVEL_CUPS = [
	920, 200, 233, 266, 300, 333, 366, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1075, 1150, 1225, 1300, 1375, 1450, 1525, 1600, 1675,
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
		criticalMultiplier: [0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.2, 0.25, 0.3, 0.35],
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
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
		evadeChance: [0.02, 0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16, 0.18, 0.2]
	},
	shooting: {
		additionalMaxHealth: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
		rangeDamageMultiplier: [0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.7, 0.85, 1.0, 1.25],
		criticalMultiplier: [0.025, 0.05, 0.075, 0.1, 0.125, 0.15, 0.2, 0.25, 0.3, 0.35]
	},
	constitution: {
		additionalMaxHealth: [15, 30, 45, 65, 100, 190, 250, 375, 575, 850],
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

export enum BodyPart {
	TopHead,
	Mask,
	Ears,
	Eyes,
	Eye,
	Nose,
	Neck,
	Shoulder,
	TopArm,
	Elbow,
	LowArm,
	Wrist,
	Fingers,
	Finger,
	Chest,
	Stomach,
	Back,
	Belt,
	Groin,
	TopLeg,
	Knee,
	LowLeg,
	Foot,
	Tail,
	Wing
}

export const DEFAULT_HUMAN_BODY: CharacterBody = {
	size: CharacterBodySize.Medium,
	parts: [
		{ size: 0.035, part: 0, top: 16, left: 354, angle: 0 },
		{ size: 0.02, part: 1, top: 181, left: 363, angle: 0 },
		{ size: 0.0025, part: 4, top: 86, left: 308, angle: 0 },
		{ size: 0.0025, part: 4, top: 90, left: 426, angle: 0 },
		{ size: 0.005, part: 2, top: 27, left: 439, angle: 0 },
		{ size: 0.005, part: 5, top: 112, left: 364, angle: 0 },
		{ size: 0.02, part: 6, top: 250, left: 362, angle: 0 },
		{ size: 0.01, part: 7, top: 241, left: 439, angle: 0 },
		{ size: 0.01, part: 7, top: 244, left: 276, angle: 0 },
		{ size: 0.03, part: 8, top: 264, left: 497, angle: 0 },
		{ size: 0.03, part: 8, top: 275, left: 210, angle: 0 },
		{ size: 0.005, part: 9, top: 346, left: 179, angle: 0 },
		{ size: 0.005, part: 9, top: 336, left: 526, angle: 0 },
		{ size: 0.03, part: 10, top: 396, left: 145, angle: 0 },
		{ size: 0.03, part: 10, top: 386, left: 544, angle: 0 },
		{ size: 0.01, part: 11, top: 455, left: 123, angle: 0 },
		{ size: 0.01, part: 11, top: 437, left: 553, angle: 0 },
		{ size: 0.005, part: 12, top: 483, left: 569, angle: 0 },
		{ size: 0.005, part: 12, top: 505, left: 117, angle: 0 },
		{ size: 0.06, part: 14, top: 318, left: 322, angle: 0 },
		{ size: 0.06, part: 15, top: 382, left: 353, angle: 0 },
		{ size: 0.18, part: 16, top: 298, left: 376, angle: 0 },
		{ size: 0.03, part: 17, top: 460, left: 360, angle: 0 },
		{ size: 0.03, part: 18, top: 533, left: 357, angle: 0 },
		{ size: 0.08, part: 19, top: 493, left: 409, angle: 0 },
		{ size: 0.08, part: 19, top: 492, left: 293, angle: 0 },
		{ size: 0.015, part: 20, top: 571, left: 435, angle: 0 },
		{ size: 0.015, part: 20, top: 573, left: 274, angle: 0 },
		{ size: 0.07, part: 21, top: 631, left: 433, angle: 0 },
		{ size: 0.07, part: 21, top: 643, left: 260, angle: 0 },
		{ size: 0.02, part: 22, top: 708, left: 458, angle: 0 },
		{ size: 0.02, part: 22, top: 723, left: 252, angle: 0 }
	]
}

export const BODY_PART_IMAGES: Record<BodyPart, string> = {
	[BodyPart.Eye]: eyeImage,
	[BodyPart.Nose]: noseImage
}
