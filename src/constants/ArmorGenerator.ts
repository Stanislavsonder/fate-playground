import { ChanceSheet, CharacterBodySize, WeightSheet } from '@/types'
import { weightSheetToChances } from '@/components/helpers/utils'
import { ArmorPreset } from '@/entities/ArmorPreset'
import { BodyPart } from '@/constants/Character'
import { ArmorType } from '@/constants/Armor'
import { ArmorGeneratorModifier } from '@/services/armorGenerator.service'
type ArmorTypeMultipliers = {
	evadeChance: number
	defenceMultiplier: number
	distanceModifier: number
}

export const DEFENCE_LEVEL_COEFFICIENT = 2
export const DEFENCE_RANDOM_AFFECT = 0.5
export const BASE_DEFENCE_VALUE = 10

export const ARMOR_TYPE_MULTIPLIERS: Record<ArmorType, ArmorTypeMultipliers> = {
	[ArmorType.Cloth]: {
		evadeChance: 1.25,
		defenceMultiplier: 0,
		distanceModifier: 1
	},
	[ArmorType.Light]: {
		evadeChance: 1.1,
		defenceMultiplier: 0.75,
		distanceModifier: 1
	},
	[ArmorType.Medium]: {
		evadeChance: 0.9,
		defenceMultiplier: 1.25,
		distanceModifier: 0.9
	},
	[ArmorType.Heavy]: {
		evadeChance: 0.65,
		defenceMultiplier: 2,
		distanceModifier: 0.65
	}
}

export const ADDITIONAL_BODY_SIZE_WEIGHT = 100
export const BODY_SIZE_WEIGHT: ChanceSheet<CharacterBodySize> = [
	[CharacterBodySize.Tiny, 5],
	[CharacterBodySize.Small, 5],
	[CharacterBodySize.Medium, 5],
	[CharacterBodySize.Big, 5],
	[CharacterBodySize.Giant, 5]
]

export const ARMOR_TYPE_CHANCES: ChanceSheet<ArmorType> = weightSheetToChances([
	[ArmorType.Cloth, 5],
	[ArmorType.Light, 30],
	[ArmorType.Medium, 100],
	[ArmorType.Heavy, 40]
])

// Weight
export const ADDITIONAL_BOOTS_MOVEMENT_WEIGHT = 150
export const ADDITIONAL_GAUNTLET_DAMAGE = 15
export const ADDITIONAL_GOOGLES_DICE_RESULT = 10

export const ADDITIONAL_CLOTH_ARMOR_EVADE = 150
export const ADDITIONAL_CLOTH_ARMOR_MOVEMENT = 75

export const ADDITIONAL_LIGHT_ARMOR_EVADE = 100
export const ADDITIONAL_LIGHT_ARMOR_MOVEMENT = 100

export const ADDITIONAL_MEDIUM_ARMOR_EVADE = 50
export const ADDITIONAL_MEDIUM_ARMOR_MOVEMENT = 50

export const ADDITIONAL_HEAVY_ARMOR_HEALTH_POINTS = 100
export const ADDITIONAL_HEAVY_ARMOR_EVADE = -20

export const ARMOR_MODIFIER_WEIGHT_SHEET: WeightSheet<ArmorGeneratorModifier> = [
	['damage', 0],
	['additionalHealthPoints', 100],
	['moveDistance', 20],
	['diceResult', 5],
	['defence', 100],
	['evadeChance', 20]
]

export const ARMOR_PRESETS: ArmorPreset[] = [
	// Helmets:
	// (Medieval)
	new ArmorPreset({
		name: 'Armet',
		bodyParts: [BodyPart.Head, BodyPart.Eyes, BodyPart.Jaws, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Great Helm',
		bodyParts: [BodyPart.Head, BodyPart.Eyes, BodyPart.Jaws, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Bascinet',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Barbute',
		bodyParts: [BodyPart.Head, BodyPart.Eyes, BodyPart.Jaws],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Sallet',
		bodyParts: [BodyPart.Head, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Kettle Hat',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Morion',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Leather Cap',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern', 'sci-fi', 'magic', 'medieval']
	}),
	new ArmorPreset({
		name: 'Mail Coif',
		bodyParts: [BodyPart.Head, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Nasal Helm',
		bodyParts: [BodyPart.Head, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Padded Arming Cap',
		bodyParts: [BodyPart.Head, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Light],
		worldSettings: ['medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Phrygian Cap',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['medieval']
	}),
	// (Modern)
	new ArmorPreset({
		name: 'Combat Helmet',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Ballistic Face Mask',
		bodyParts: [BodyPart.Head, BodyPart.Jaws, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Riot Helmet',
		bodyParts: [BodyPart.Head, BodyPart.Jaws, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Tactical Helmet',
		bodyParts: [BodyPart.Head, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Bomb Suit Helmet',
		bodyParts: [BodyPart.Head, BodyPart.Jaws, BodyPart.Eyes, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: "Firefighter's Helmet",
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Hockey Goalie Mask',
		bodyParts: [BodyPart.Head, BodyPart.Jaws, BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Hard Hat',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Fencing Mask',
		bodyParts: [BodyPart.Head, BodyPart.Eyes, BodyPart.Jaws, BodyPart.Neck],
		possibleArmorTypes: [ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Shooting Glasses',
		bodyParts: [BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Safety Glasses',
		bodyParts: [BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Light],
		worldSettings: ['modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Paintball Mask',
		bodyParts: [BodyPart.Eyes, BodyPart.Jaws],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern', 'sci-fi']
	}),
	// (Other)
	new ArmorPreset({
		name: 'Spectacles',
		bodyParts: [BodyPart.Eyes],
		possibleArmorTypes: [ArmorType.Cloth],
		impossibleModifiers: ['defence'],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Crown',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Hood',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Mask',
		bodyParts: [BodyPart.Jaws],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Mantle',
		bodyParts: [],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Diadem',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Cloth],
		impossibleModifiers: ['defence'],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Circlet',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Cloth],
		impossibleModifiers: ['defence'],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Hat',
		bodyParts: [BodyPart.Head],
		possibleArmorTypes: [ArmorType.Cloth, ArmorType.Light],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi']
	}),

	// Hand:
	// (Medieval)
	new ArmorPreset({
		name: 'Gauntlet',
		bodyParts: [BodyPart.Wrist, BodyPart.Fingers],
		possibleArmorTypes: [ArmorType.Cloth, ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['magic', 'medieval', 'modern', 'sci-fi'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Vambrace',
		bodyParts: [BodyPart.LowerArm, BodyPart.Elbow, BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Rerebrace (Upper)',
		bodyParts: [BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Rerebrace (Lower)',
		bodyParts: [BodyPart.LowerArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Couter',
		bodyParts: [BodyPart.Elbow],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Pauldron',
		bodyParts: [BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Bracer',
		bodyParts: [BodyPart.LowerArm, BodyPart.Wrist],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['magic', 'medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Chain Mail Sleeves',
		bodyParts: [BodyPart.LowerArm, BodyPart.Wrist, BodyPart.Elbow, BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Spaulders',
		bodyParts: [BodyPart.Shoulder, BodyPart.Shoulder, BodyPart.Chest],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Bazuband',
		bodyParts: [BodyPart.Elbow, BodyPart.LowerArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Manica (Shoulder)',
		bodyParts: [BodyPart.LowerArm, BodyPart.Elbow, BodyPart.UpperArm, BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Manica',
		bodyParts: [BodyPart.LowerArm, BodyPart.Elbow, BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Hourglass Gauntlet',
		bodyParts: [BodyPart.Fingers, BodyPart.Wrist],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	// (Modern)
	new ArmorPreset({
		name: 'Tactical Gloves',
		bodyParts: [BodyPart.Fingers, BodyPart.Wrist],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Kevlar Sleeves',
		bodyParts: [BodyPart.LowerArm, BodyPart.Elbow, BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Riot Gear Forearm Protector (Lower)',
		bodyParts: [BodyPart.LowerArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Riot Gear Forearm Protector (Upper)',
		bodyParts: [BodyPart.UpperArm],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Armored Gloves',
		bodyParts: [BodyPart.Fingers, BodyPart.Wrist],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Elbow Pads',
		bodyParts: [BodyPart.Elbow],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy, ArmorType.Light],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Wrist Guards',
		bodyParts: [BodyPart.Wrist],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Firefighter Gloves',
		bodyParts: [BodyPart.Wrist, BodyPart.Fingers],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Tactical Shoulder Pads',
		bodyParts: [BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy, ArmorType.Light],
		worldSettings: ['modern'],
		isPair: true
	}),

	// Torso
	// (Medieval)
	new ArmorPreset({
		name: 'Hauberk',
		bodyParts: [
			BodyPart.Chest,
			BodyPart.Shoulder,
			BodyPart.Shoulder,
			BodyPart.UpperArm,
			BodyPart.UpperArm,
			BodyPart.Elbow,
			BodyPart.Elbow,
			BodyPart.LowerArm,
			BodyPart.LowerArm,
			BodyPart.Stomach,
			BodyPart.Groin,
			BodyPart.UpperLeg,
			BodyPart.UpperLeg
		],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Cuirass',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Lamellar Armor',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach, BodyPart.Groin, BodyPart.Shoulder, BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Gambeson',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach, BodyPart.Groin, BodyPart.Shoulder, BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Scale Armor',
		bodyParts: [BodyPart.Neck, BodyPart.Chest, BodyPart.Stomach, BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Surcoat',
		bodyParts: [
			BodyPart.Chest,
			BodyPart.Stomach,
			BodyPart.Groin,
			BodyPart.UpperLeg,
			BodyPart.Knee,
			BodyPart.LowerLeg,
			BodyPart.UpperLeg,
			BodyPart.Knee,
			BodyPart.LowerLeg
		],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Plackart',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Lorica Segmentata',
		bodyParts: [BodyPart.Shoulder, BodyPart.Shoulder, BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Peascod Belly',
		bodyParts: [BodyPart.Neck, BodyPart.Chest, BodyPart.Stomach, BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Cloth, ArmorType.Light],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Faulds',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Heavy, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Tassets',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Mail Skirt',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Codpiece',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Leather Girdle',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['medieval']
	}),
	// (Modern)
	new ArmorPreset({
		name: 'Bulletproof Vests',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Tactical Vests',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Flak Jackets',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach, BodyPart.Shoulder, BodyPart.Shoulder],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Plate Carriers',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Bomb Disposal Suit',
		bodyParts: [BodyPart.Neck, BodyPart.Chest, BodyPart.Stomach, BodyPart.Shoulder, BodyPart.Shoulder, BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Armored Jacket',
		bodyParts: [
			BodyPart.LowerArm,
			BodyPart.Elbow,
			BodyPart.UpperArm,
			BodyPart.Shoulder,
			BodyPart.LowerArm,
			BodyPart.Elbow,
			BodyPart.UpperArm,
			BodyPart.Shoulder,
			BodyPart.Neck,
			BodyPart.Chest,
			BodyPart.Stomach,
			BodyPart.Groin
		],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Riot Armor',
		bodyParts: [BodyPart.Shoulder, BodyPart.Shoulder, BodyPart.Neck, BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Impact Vests',
		bodyParts: [BodyPart.Chest, BodyPart.Stomach],
		possibleArmorTypes: [ArmorType.Light],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Groin Protector',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Ballistic Groin Protector',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Cricket Box',
		bodyParts: [BodyPart.Groin],
		possibleArmorTypes: [ArmorType.Light, ArmorType.Medium],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Riot Control Groin Guards',
		bodyParts: [BodyPart.Groin, BodyPart.UpperLeg, BodyPart.UpperLeg],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),

	// Legs
	// (Medieval)
	new ArmorPreset({
		name: 'Greave',
		bodyParts: [BodyPart.LowerLeg],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Sabaton',
		bodyParts: [BodyPart.Foot],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Cuisse',
		bodyParts: [BodyPart.UpperLeg],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Poleyn',
		bodyParts: [BodyPart.Knee],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['medieval'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Chausses',
		bodyParts: [BodyPart.UpperLeg, BodyPart.UpperLeg, BodyPart.Knee, BodyPart.Knee, BodyPart.LowerLeg, BodyPart.LowerLeg],
		possibleArmorTypes: [ArmorType.Cloth, ArmorType.Light],
		worldSettings: ['medieval']
	}),
	new ArmorPreset({
		name: 'Boots',
		bodyParts: [BodyPart.Foot, BodyPart.Foot],
		possibleArmorTypes: [ArmorType.Cloth, ArmorType.Light, ArmorType.Medium],
		worldSettings: ['medieval', 'modern', 'magic', 'sci-fi']
	}),
	new ArmorPreset({
		name: 'Gaiter',
		bodyParts: [BodyPart.LowerLeg, BodyPart.Foot],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light, ArmorType.Cloth],
		worldSettings: ['medieval', 'modern', 'magic', 'sci-fi'],
		isPair: true
	}),
	// (Modern)
	new ArmorPreset({
		name: 'Tactical Boots',
		bodyParts: [BodyPart.Foot, BodyPart.Foot],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Knee Pad',
		bodyParts: [BodyPart.Knee],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light, ArmorType.Heavy],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Shin Guards',
		bodyParts: [BodyPart.LowerLeg],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Light, ArmorType.Heavy],
		worldSettings: ['modern'],
		isPair: true
	}),
	new ArmorPreset({
		name: 'Steel-Toe Boots',
		bodyParts: [BodyPart.Foot, BodyPart.Foot],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'Ballistic Leg Armor',
		bodyParts: [BodyPart.UpperLeg, BodyPart.UpperLeg],
		possibleArmorTypes: [ArmorType.Medium, ArmorType.Heavy],
		worldSettings: ['modern']
	}),
	new ArmorPreset({
		name: 'EOD Leg Protection',
		bodyParts: [BodyPart.UpperLeg, BodyPart.LowerLeg, BodyPart.Knee],
		possibleArmorTypes: [ArmorType.Heavy],
		worldSettings: ['modern'],
		isPair: true
	})
]
