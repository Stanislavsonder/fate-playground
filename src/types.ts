import { WeaponType as WeaponTypeClass } from './entities/WeaponType'
import { Wound } from './entities/Wound'
import { useMagicKeys } from '@vueuse/core'
import { BodyPart } from '@/constants/Character'
export enum CharacterBodySize {
	Tiny, // Фея, кролик
	Small, // Полурослик, гном, ребенок
	Medium, // Взрослый человек, +-
	Big, // Большой орк, 2+м человек,
	Giant // Огромные существа
}

export type CharacterBodyPart = {
	part: BodyPart
	size: number
}
export type CharacterBody = {
	size: CharacterBodySize
	parts: CharacterBodyPart[]
}
// Skills

export type Skill = {
	level: number
	experience: number
}

export type Skills = {
	agility: Skill
	alchemy: Skill
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
	magic: Skill
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
