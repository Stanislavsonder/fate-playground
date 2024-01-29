import { BodyPart } from '@/constants/Character'
export enum CharacterBodySize {
	Tiny, // Фея, кролик
	Small, // Полурослик, гном, ребенок
	Medium, // Взрослый человек, +-
	Big, // Большой орк, 2+м человек,
	Giant // Огромные существа
}

export type ArmorSlot = {
	part: BodyPart
	size: number
}

export enum WeaponSlot {
	Hand
}

export type CharacterBody = {
	size: CharacterBodySize
	armorSlots: ArmorSlot[]
	weaponSlots: WeaponSlot[]
}
// Skills

export type Skill = {
	level: number
	experience: number
}

export type Skills = {
	agility: Skill
	charisma: Skill
	constitution: Skill
	contacts: Skill
	craft: Skill
	deceit: Skill
	deduction: Skill
	driving: Skill
	fight: Skill
	knowledge: Skill
	lockpicking: Skill
	medicine: Skill
	perception: Skill
	provocation: Skill
	resources: Skill
	shooting: Skill
	stealth: Skill
	theft: Skill
	will: Skill
}

export type SkillPenalty = {
	[key in keyof Skills]: number
}

export type SkillLevelModifiers = [number, number, number, number, number, number, number, number, number, number]

export type SkillModifier = {
	additionalMaxHealth?: SkillLevelModifiers
	criticalChance?: SkillLevelModifiers
	evadeChance?: SkillLevelModifiers
	criticalMultiplier?: SkillLevelModifiers
	meleeDamageMultiplier?: SkillLevelModifiers
	rangeDamageMultiplier?: SkillLevelModifiers
	physicalDamageMultiplier?: SkillLevelModifiers
	defenceMultiplier?: SkillLevelModifiers
	additionalTheftDistance?: SkillLevelModifiers
	additionalViewRange?: SkillLevelModifiers
	additionalMoveRange?: SkillLevelModifiers
}

export type SkillModifiers = {
	[key in keyof Skills]: SkillModifier
}

export enum LootLevel {
	Garbage,
	Common,
	Uncommon,
	Rare,
	Epic,
	Legendary
}

export type ChanceSheet<T> = [T, number][]
export type WeightSheet<T> = ChanceSheet<T>

export enum LootQuality {
	Garbage,
	Common,
	Good,
	Skillful,
	Perfect,
	Legendary
}

export enum WeaponRange {
	Melee,
	Ranged
}

export type WeaponDistancesModifier = {
	minDistance: number
	minEffectiveDistance: number
	maxEffectiveDistance: number
	maxDistance: number
}

export type WeaponStats = {
	minDamage: number
	maxDamage: number
}

export type WeaponModifier = Partial<WeaponStats> &
	Partial<WeaponDistancesModifier> & {
		diceResult?: number
		damageMultiplier?: number
		evadeChance?: number
		defence?: number
		hitChance?: number
		criticalChance?: number
		criticalMultiplier?: number
	}
