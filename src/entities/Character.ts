import { CharacterSize, Skills } from '../types'
import { Weapon, WeaponModifier, WeaponRange } from './Weapon'
import { Armor, ArmorModifier } from './Armor'
import { Wound } from './Wound'
import { BASE_CHARACTER_CRITICAL_MULTIPLIER, BASE_CHARACTER_HEALTH_POINTS, BASE_CHARACTER_HIT_CHANCE, EMPTY_SKILL_SET } from '../constants/Character'
import { copy, getArmorStat, getSkillBonus, getWeaponStat, getWoundsPenalty } from '../utils'
import { ArmorSlot } from '../constants/Armor'
import { DEFAULT_FIST_PROPS } from '../constants/Weapon'
import DiceService, { Dice, DiceRollResult } from '@/services/dice.service'

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

	readonly level: number
	readonly experience: number
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
		return Math.max(BASE_CHARACTER_HEALTH_POINTS + getSkillBonus('additionalMaxHealth', this.skills) + getWoundsPenalty('maxHealthPoints', this.wounds), 0)
	}

	get minDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.weapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			getWeaponStat('minDamage', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) *
				(1 + damageTypeMultiplier + weaponRangeMultiplier),
			0
		)
	}

	get maxDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.weapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			getWeaponStat('maxDamage', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) *
				(1 + damageTypeMultiplier + weaponRangeMultiplier),
			0
		)
	}

	get criticalChance(): number {
		return Math.max(
			getSkillBonus('criticalChance', this.skills) + getWeaponStat('criticalChance', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get criticalMultiplier(): number {
		return Math.max(
			BASE_CHARACTER_CRITICAL_MULTIPLIER +
				getSkillBonus('criticalMultiplier', this.skills) +
				getWeaponStat('criticalMultiplier', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get evadeChance(): number {
		return Math.max(getSkillBonus('evadeChance', this.skills) + getArmorStat('evadeChance', this.armor), 0)
	}

	get defence(): number {
		return Math.round(this.armor.reduce((a, b) => a + b.totalDefence, 0) * (1 + getSkillBonus('defenceMultiplier', this.skills)))
	}

	get block(): number {
		return 1 - Armor.BlockPercentage(this.defence)
	}

	get hitChance(): number {
		return Math.max(BASE_CHARACTER_HIT_CHANCE + getWeaponStat('hitChance', this.weapon, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied), 0)
	}

	get level(): number {
		return 1 // TODO
	}

	get experience(): number {
		return 1 // TODO
	}

	public rollDice(): Dice[] {
		return DiceService.roll(4, this.luck)
	}

	public rollCriticalChance(): boolean {
		return Math.random() <= this.criticalChance
	}

	public rollHitChance(): boolean {
		return Math.random() <= this.hitChance
	}

	public rollEvadeChance(): boolean {
		return Math.random() <= this.evadeChance
	}
}
