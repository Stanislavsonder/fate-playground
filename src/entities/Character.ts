import { CharacterSize, Skills } from '../types'
import { Weapon, WeaponModifier, WeaponRange } from './Weapon'
import { Armor, ArmorModifier } from './Armor'
import { Wound } from './Wound'
import { BASE_CHARACTER_HIT_POINTS, EMPTY_SKILL_SET } from '../constants/Character'
import { copy, getArmorStat, getSkillBonus, getWeaponStat, getWoundsPenalty } from '../utils'
import { ArmorSlot } from '../constants/Armor'
import { DEFAULT_FIST_PROPS } from '../constants/Weapon'

type CharacterStats = Required<WeaponModifier & ArmorModifier> & {}

interface ICharacter {
	readonly name: string
	readonly luck: number
	readonly size: CharacterSize
	readonly currenHealthPoints: number
	readonly weapon: Weapon
	readonly armor: Armor[]
	readonly slots: ArmorSlot[]
	readonly skills: Skills
	readonly wounds: Wound[]

	readonly maxHealthPoints: number
	readonly minDamage: number
	readonly maxDamage: number
}

type CharacterProps = Partial<Pick<ICharacter, 'name' | 'luck' | 'size' | 'currenHealthPoints' | 'weapon' | 'armor' | 'slots' | 'skills' | 'wounds'>>

export class Character implements ICharacter {
	public readonly name: string
	public readonly luck: number
	public readonly size: CharacterSize
	public currenHealthPoints: number
	public readonly slots: ArmorSlot[]
	public skills: Skills
	public weapon: Weapon
	public armor: Armor[] = []
	public wounds: Wound[] = []

	private isWeaponBonusApplied = false
	private isWeaponPenaltyApplied = false

	constructor(props: CharacterProps) {
		this.name = props.name || 'New character'
		this.luck = props.luck || 0
		this.size = props.size || CharacterSize.Medium
		this.weapon = props.weapon || new Weapon(copy(DEFAULT_FIST_PROPS))
		this.armor = props.armor || []
		this.slots = props.slots || []
		this.skills = props.skills || copy(EMPTY_SKILL_SET)
		this.wounds = props.wounds || []
		this.currenHealthPoints = props.currenHealthPoints || this.maxHealthPoints
	}

	setWeaponBonus(value: boolean): void {
		this.isWeaponBonusApplied = value
	}

	setWeaponPenalty(value: boolean): void {
		this.isWeaponPenaltyApplied = value
	}

	setSkillLevel(skill: keyof Skills, level: number): number {
		if (!Number.isInteger(level) || level < 0 || level > 10) {
			console.error('Skill level must be a positive integer number and must be between 0 and 10')
			return this.skills[skill].level
		}
		this.skills[skill].level = level
		return this.skills[skill].level
	}

	setSkillSet(skills: Skills): void {
		this.skills = skills
	}

	get maxHealthPoints(): number {
		return BASE_CHARACTER_HIT_POINTS + getSkillBonus('additionalMaxHealth', this.skills) + getWoundsPenalty('maxHealthPoints', this.wounds)
	}

	get minDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.weapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return (
			getWeaponStat('minDamage', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) * (1 + damageTypeMultiplier + weaponRangeMultiplier)
		)
	}

	get maxDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.weapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return (
			getWeaponStat('maxDamage', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) * (1 + damageTypeMultiplier + weaponRangeMultiplier)
		)
	}

	get criticalChance(): number {
		return (
			getSkillBonus('criticalChance', this.skills) + getWeaponStat('criticalChance', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)
		)
	}

	get criticalMultiplier(): number {
		return (
			getSkillBonus('criticalMultiplier', this.skills) +
			getWeaponStat('criticalMultiplier', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)
		)
	}

	get evadeChance(): number {
		return getSkillBonus('evadeChance', this.skills) + getArmorStat('evadeChance', this.armor)
	}

	get defence(): number {
		return this.armor.reduce((a, b) => a + b.totalDefence, 0) * (1 + getSkillBonus('defenceMultiplier', this.skills))
	}

	get block(): number {
		return Armor.BlockPercentage(this.defence)
	}

	get hitChance(): number {
		return 1 + getWeaponStat('hitChance', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)
	}
}
