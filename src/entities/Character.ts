import { CharacterSize, Skill, Skills } from '../types'
import { Weapon, WeaponModifier, WeaponRange } from './Weapon'
import { Armor, ArmorModifier } from './Armor'
import { Wound } from './Wound'
import {
	BASE_CHARACTER_CRITICAL_MULTIPLIER,
	BASE_CHARACTER_HEALTH_POINTS,
	BASE_CHARACTER_HIT_CHANCE,
	CHARACTER_LEVEL_CUPS,
	EMPTY_SKILL_SET,
	SKILL_EXPERIENCE_CUP
} from '../constants/Character'
import { copy, getArmorStat, getSkillBonus, getWoundsPenalty } from '../utils'
import { ArmorSlot } from '../constants/Armor'
import { DEFAULT_FIST_PROPS } from '../constants/Weapon'
import DiceService, { Dice, DiceRollResult } from '@/services/dice.service'

type CharacterStats = Required<WeaponModifier & ArmorModifier> & {}

interface ICharacter {
	readonly name: string
	readonly luck: number
	readonly size: CharacterSize
	readonly currenHealthPoints: number
	readonly weapon: Weapon[]
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
	public weapon: Weapon[] = []
	public armor: Armor[] = []
	public wounds: Wound[] = []

	private isWeaponBonusApplied = false
	private isWeaponPenaltyApplied = false
	private activeWeaponIndex = 0

	constructor(props: CharacterProps) {
		this.name = props.name || 'New character'
		this.luck = props.luck || 0
		this.size = props.size || CharacterSize.Medium
		this.weapon = props.weapon || [new Weapon(copy(DEFAULT_FIST_PROPS))]
		this.armor = props.armor || []
		this.slots = props.slots || []
		this.skills = props.skills || copy(EMPTY_SKILL_SET)
		this.wounds = props.wounds || []
		this.currenHealthPoints = props.currenHealthPoints || this.maxHealthPoints
	}

	private static GetSkillTotalExperience(skill: Skill): number {
		return SKILL_EXPERIENCE_CUP.slice(0, skill.level).reduce((a, b) => a + b, skill.experience)
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

	get activeWeapon(): Weapon {
		return this.weapon[this.activeWeaponIndex]
	}

	get maxHealthPoints(): number {
		return Math.max(BASE_CHARACTER_HEALTH_POINTS + getSkillBonus('additionalMaxHealth', this.skills) + getWoundsPenalty('maxHealthPoints', this.wounds), 0)
	}

	get minDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.activeWeapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			Weapon.GetMedianStat('minDamage', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) *
				(1 +
					damageTypeMultiplier +
					weaponRangeMultiplier +
					Weapon.GetMedianStat('damageMultiplier', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)),
			0
		)
	}

	get maxDamage(): number {
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.activeWeapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			Weapon.GetMedianStat('maxDamage', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied) *
				(1 +
					damageTypeMultiplier +
					weaponRangeMultiplier +
					Weapon.GetMedianStat('damageMultiplier', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)),
			0
		)
	}

	get criticalChance(): number {
		return Math.max(
			getSkillBonus('criticalChance', this.skills) +
				Weapon.GetMedianStat('criticalChance', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get criticalMultiplier(): number {
		return Math.max(
			BASE_CHARACTER_CRITICAL_MULTIPLIER +
				getSkillBonus('criticalMultiplier', this.skills) +
				Weapon.GetMedianStat('criticalMultiplier', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get evadeChance(): number {
		return Math.max(
			getSkillBonus('evadeChance', this.skills) +
				getArmorStat('evadeChance', this.armor) +
				Weapon.GetMedianStat('evadeChance', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get defence(): number {
		return Math.round(
			(this.armor.reduce((a, b) => a + b.totalDefence, 0) +
				Weapon.GetMedianStat('defence', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied)) *
				(1 + getSkillBonus('defenceMultiplier', this.skills))
		)
	}

	get block(): number {
		return 1 - Armor.BlockPercentage(this.defence)
	}

	get hitChance(): number {
		return Math.max(
			BASE_CHARACTER_HIT_CHANCE *
				Weapon.GetMedianStat('hitChance', this.weapon, this.activeWeaponIndex, this.isWeaponBonusApplied, this.isWeaponPenaltyApplied),
			0
		)
	}

	get level(): number {
		const totalExperience = this.getTotalExperience()
		let tmpExperience = 0
		for (let i = 0; i < CHARACTER_LEVEL_CUPS.length; i++) {
			if (totalExperience <= tmpExperience) {
				return i
			}
			tmpExperience += CHARACTER_LEVEL_CUPS[i]
		}
		return CHARACTER_LEVEL_CUPS.length
	}

	get experience(): number {
		return this.getTotalExperience() - CHARACTER_LEVEL_CUPS.slice(0, this.level - 1).reduce((a, b) => a + b, 0)
	}

	private getTotalExperience(): number {
		return Object.values(this.skills).reduce((a, b) => a + Character.GetSkillTotalExperience(b), 0)
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

	public swapActiveWeapon(index?: number): void {
		if (index === undefined) {
			this.activeWeaponIndex = this.activeWeaponIndex + 1 > this.weapon.length ? 0 : this.activeWeaponIndex + 1
			return
		}

		if (!Number.isInteger(index) || index < 0 || index >= this.weapon.length) {
			console.error(`Cannot swap weapon index for ${index}`)
			return
		}

		this.activeWeaponIndex = index
	}

	public heal(hp: number) {
		this.currenHealthPoints = Math.min(this.maxHealthPoints, this.currenHealthPoints + hp)
	}

	public hit(hp: number) {
		this.currenHealthPoints = Math.max(0, this.currenHealthPoints - hp)
	}
}
