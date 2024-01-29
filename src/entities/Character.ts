import { CharacterBody, Skill, Skills, WeaponRange, WeaponSlot } from '@/types'
import { Weapon } from './Weapon'
import { Armor } from './Armor'
import { Wound } from './Wound'
import {
	BASE_CHARACTER_CRITICAL_MULTIPLIER,
	BASE_CHARACTER_HEALTH_POINTS,
	BodyPart,
	CHARACTER_LEVEL_ADDITIONAL_HP_BONUS,
	CHARACTER_LEVEL_CUPS,
	DEFAULT_HUMAN_BODY,
	DICE_EVADE_MULTIPLIER,
	DICE_HIT_MULTIPLIER,
	EMPTY_SKILL_SET,
	SKILL_EXPERIENCE_CUP
} from '@/constants/Character'
import { copy, getSkillBonus, getWoundsPenalty } from '@/components/helpers/utils'
import DiceService, { Dice } from '@/services/dice.service'
import { DEFAULT_FIST_PROPS } from '@/constants/Weapon'

type CharacterProps = {
	name?: string
	luck?: number
	currenHealthPoints?: number
	weapon?: Weapon[]
	armor?: Armor[]
	skills?: Skills
	wounds?: Wound[]
	body?: CharacterBody
}

export class Character {
	public readonly name: string = 'New character'
	public readonly luck: number = 0
	public currenHealthPoints: number
	public skills: Skills = copy(EMPTY_SKILL_SET)
	public weapon: Weapon[] = []
	public armor: Armor[] = []
	public wounds: Wound[] = []
	public body: CharacterBody = copy(DEFAULT_HUMAN_BODY)
	public currentDistance: number = 0

	public isWeaponAdvantageApplied = false
	public isWeaponDisadvantageApplied = false
	public inventory: (Armor | Weapon)[] = []
	private activeWeaponIndex = 0

	constructor(props: CharacterProps) {
		this.name = props.name ?? this.name
		this.luck = props.luck ?? this.luck
		this.weapon = props.weapon ?? this.weapon
		this.armor = props.armor ?? this.armor
		this.skills = props.skills ?? this.skills
		this.wounds = props.wounds ?? this.wounds
		this.body = props.body ?? this.body
		this.currenHealthPoints = props.currenHealthPoints ?? this.maxHealthPoints
	}

	private static GetSkillTotalExperience(skill: Skill): number {
		return SKILL_EXPERIENCE_CUP.slice(0, skill.level).reduce((a, b) => a + b, skill.experience)
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

	get activeWeapon(): Weapon | undefined {
		console.log(this)
		return this.weapon[0] || undefined
	}

	get maxHealthPoints(): number {
		return Math.max(
			BASE_CHARACTER_HEALTH_POINTS +
				CHARACTER_LEVEL_ADDITIONAL_HP_BONUS[this.level] +
				Armor.GetCombinedStats('additionalHealthPoints', this.armor) +
				getSkillBonus('additionalMaxHealth', this.skills) +
				getWoundsPenalty('maxHealthPoints', this.wounds),
			0
		)
	}

	get minDamage(): number {
		if (!this.activeWeapon) {
			console.log('ZERO')
			return 0
		}
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.activeWeapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			Weapon.GetMedianStat('minDamage', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied) *
				(1 +
					damageTypeMultiplier +
					weaponRangeMultiplier +
					Weapon.GetMedianStat(
						'damageMultiplier',
						this.weapon,
						this.activeWeaponIndex,
						this.isWeaponAdvantageApplied,
						this.isWeaponDisadvantageApplied
					)),
			0
		)
	}

	get maxDamage(): number {
		if (!this.activeWeapon) {
			return 0
		}
		const damageTypeMultiplier = getSkillBonus('physicalDamageMultiplier', this.skills)
		const weaponRangeMultiplier = getSkillBonus(
			this.activeWeapon.type.range === WeaponRange.Melee ? 'meleeDamageMultiplier' : 'rangeDamageMultiplier',
			this.skills
		)

		return Math.max(
			Weapon.GetMedianStat('maxDamage', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied) *
				(1 +
					damageTypeMultiplier +
					weaponRangeMultiplier +
					Weapon.GetMedianStat(
						'damageMultiplier',
						this.weapon,
						this.activeWeaponIndex,
						this.isWeaponAdvantageApplied,
						this.isWeaponDisadvantageApplied
					)),
			0
		)
	}

	get minWeaponDistance(): number {
		if (!this.weapon.length) {
			return 0
		}
		return Math.max(...this.weapon.map(weapon => weapon.getStat('minDistance')))
	}

	get maxWeaponDistance(): number {
		if (!this.weapon.length) {
			return 0
		}
		return Math.min(...this.weapon.map(weapon => weapon.getStat('maxDistance')))
	}

	get minEffectiveWeaponDistance(): number {
		if (!this.weapon.length) {
			return 0
		}
		return Math.max(...this.weapon.map(weapon => weapon.getStat('minEffectiveDistance')))
	}

	get maxEffectiveWeaponDistance(): number {
		if (!this.weapon.length) {
			return 0
		}
		return Math.min(...this.weapon.map(weapon => weapon.getStat('maxEffectiveDistance')))
	}

	get criticalChance(): number {
		return Math.max(
			getSkillBonus('criticalChance', this.skills) +
				Weapon.GetMedianStat('criticalChance', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied),
			0
		)
	}

	get criticalMultiplier(): number {
		return Math.max(
			BASE_CHARACTER_CRITICAL_MULTIPLIER +
				getSkillBonus('criticalMultiplier', this.skills) +
				Weapon.GetMedianStat(
					'criticalMultiplier',
					this.weapon,
					this.activeWeaponIndex,
					this.isWeaponAdvantageApplied,
					this.isWeaponDisadvantageApplied
				),
			0
		)
	}

	get evadeChance(): number {
		return Math.min(
			Math.max(
				getSkillBonus('evadeChance', this.skills) +
					Armor.GetEvadeChance(this.armor, this.body) +
					Weapon.GetMedianStat('evadeChance', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied),
				0
			),
			1
		)
	}

	get defence(): number {
		return (
			Math.round(
				Armor.GetDefence(this.armor, this.body) +
					Weapon.GetMedianStat('defence', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied)
			) *
			(1 + getSkillBonus('defenceMultiplier', this.skills))
		)
	}

	get block(): number {
		return 1 - Armor.BlockPercentage(this.defence)
	}

	get hitChance(): number {
		if (this.currentDistance > this.maxWeaponDistance || this.currentDistance < this.minWeaponDistance) {
			return 0
		}

		const baseChance = Math.max(
			Weapon.GetMedianStat('hitChance', this.weapon, this.activeWeaponIndex, this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied),
			0
		)

		if (this.currentDistance >= this.minEffectiveWeaponDistance && this.currentDistance <= this.maxEffectiveWeaponDistance) {
			return baseChance
		}

		const isBeforeEffective = this.currentDistance < this.minEffectiveWeaponDistance
		const min = isBeforeEffective ? this.minWeaponDistance : this.maxEffectiveWeaponDistance
		const max = isBeforeEffective ? this.minEffectiveWeaponDistance : this.maxWeaponDistance
		const currentPercent = (this.currentDistance - (min - 0.1)) / (max + 0.1 - (min - 0.1))
		return isBeforeEffective ? currentPercent : (1 - currentPercent) * baseChance
	}

	get level(): number {
		const totalExperience = this.getTotalExperience()
		let tmpExperience = 0
		for (let i = 0; i < CHARACTER_LEVEL_CUPS.length; i++) {
			tmpExperience += CHARACTER_LEVEL_CUPS[i]
			if (totalExperience < tmpExperience) {
				return i
			}
		}
		return CHARACTER_LEVEL_CUPS.length
	}

	get experience(): number {
		return this.getTotalExperience() - CHARACTER_LEVEL_CUPS.slice(0, this.level).reduce((a, b) => a + b, 0)
	}

	public getTotalExperience(): number {
		return Object.values(this.skills).reduce((a, b) => a + Character.GetSkillTotalExperience(b), 0)
	}

	public rollDice(): Dice[] {
		return DiceService.roll(4, this.luck)
	}

	public rollCriticalChance(): boolean {
		return Math.random() <= this.criticalChance
	}

	public rollHitChance(): {
		diceResult: Dice[]
		result: boolean
	} {
		const dice = this.rollDice()
		const diceValue =
			dice.reduce((a, b) => a + b.result, 0) +
			(this.activeWeapon?.getStat('diceResult', this.isWeaponAdvantageApplied, this.isWeaponDisadvantageApplied) || 0)
		const additionalChance = diceValue * DICE_HIT_MULTIPLIER * this.hitChance

		return {
			diceResult: dice,
			result: Math.random() <= this.hitChance + additionalChance
		}
	}

	public rollEvadeChance(): {
		diceResult: Dice[]
		result: boolean
	} {
		const dice = this.rollDice()
		const diceValue = dice.reduce((a, b) => a + b.result, 0)
		const additionalChance = diceValue * DICE_EVADE_MULTIPLIER * this.evadeChance

		return {
			diceResult: dice,
			result: Math.random() <= this.evadeChance + additionalChance
		}
	}

	public heal(hp: number) {
		this.currenHealthPoints = Math.min(this.maxHealthPoints, this.currenHealthPoints + hp)
	}

	public hit(hp: number) {
		this.currenHealthPoints = Math.max(0, this.currenHealthPoints - Math.round(hp * this.block))
	}

	public equipWeapon(weapon: Weapon) {
		const index = this.inventory.indexOf(weapon)
		if (index === -1) {
			console.error(`Cannot equip ${weapon.name} to ${this.name}. Inventory does not contain ${weapon.name}`)
			return
		}

		if (!this.isWeaponApliable(weapon)) {
			console.error(`Cannot equip ${weapon.name} to ${this.name}. Slots are occupied`)
			return
		}

		this.weapon.push(weapon)
		this.inventory.splice(index, 1)
		this.activeWeaponIndex = this.weapon.length - 1
	}

	public unequipWeapon(weapon: Weapon) {
		this.weapon = this.weapon.filter(w => w !== weapon)
		this.activeWeaponIndex = this.weapon.length - 1
		this.inventory.push(weapon)
	}

	public equipArmor(armor: Armor): void {
		const index = this.inventory.indexOf(armor)
		if (index === -1) {
			console.error(`Cannot equip ${armor.name} to ${this.name}. Inventory does not contain ${armor.name}`)
			return
		}

		if (!this.isArmorApliable(armor)) {
			console.error(`Cannot equip ${armor.name} to ${this.name}. Slots are occupied`)
			return
		}

		this.inventory.splice(index, 1)
		this.armor.push(armor)
	}

	public unequipArmor(armor: Armor): void {
		const index = this.armor.indexOf(armor)
		if (index === -1) {
			console.error(`Cannot unequip ${armor.name} from ${this.name}. Armor is not equipped`)
			return
		}
		this.inventory.push(armor)
		this.armor.splice(index, 1)
	}

	get occupiedArmorSlots(): BodyPart[] {
		return this.armor.map(e => e.slots).flat()
	}

	get freeArmorSlots(): BodyPart[] {
		const occupied = copy(this.occupiedArmorSlots)
		const result = copy(this.body.armorSlots.map(e => e.part))
		for (let i = 0; i < occupied.length; i++) {
			const occupiedIndex = result.findIndex(e => occupied[i] === e)
			if (occupiedIndex >= 0) {
				result.splice(occupiedIndex, 1)
			}
		}
		return result
	}

	public isArmorApliable(armor: Armor): boolean {
		const freeSlots = copy(this.freeArmorSlots)
		for (let i = 0; i < armor.slots.length; i++) {
			const slotIndex = freeSlots.findIndex(e => e === armor.slots[i])
			if (slotIndex === -1) {
				return false
			}
			freeSlots.splice(slotIndex, 1)
		}
		return true
	}

	public addToInventory(item: Armor | Weapon): void {
		this.inventory.push(item)
	}

	public removeFromInventory(item: Armor | Weapon): void {
		const index = this.inventory.indexOf(item)
		if (index === -1) {
			console.error(`Cannot remove ${item.name} from ${this.name}. Inventory does not contain ${item.name}`)
			return
		}
		this.inventory.splice(index, 1)
	}

	get occupiedWeaponSlots(): WeaponSlot[] {
		return this.weapon.map(e => e.type.weaponSlots).flat()
	}

	get freeWeaponSlots(): WeaponSlot[] {
		const occupied = copy(this.occupiedWeaponSlots)
		const result = copy(this.body.weaponSlots)
		for (let i = 0; i < occupied.length; i++) {
			const occupiedIndex = result.findIndex(e => occupied[i] === e)
			if (occupiedIndex >= 0) {
				result.splice(occupiedIndex, 1)
			}
		}
		return result
	}

	public isWeaponApliable(weapon: Weapon): boolean {
		const freeSlots = copy(this.freeWeaponSlots)
		for (let i = 0; i < weapon.type.weaponSlots.length; i++) {
			const slotIndex = freeSlots.findIndex(e => e === weapon.type.weaponSlots[i])
			if (slotIndex === -1) {
				return false
			}
			freeSlots.splice(slotIndex, 1)
		}
		return true
	}
}
