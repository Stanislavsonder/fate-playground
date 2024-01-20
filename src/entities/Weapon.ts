import { WeaponType } from './WeaponType'
import { MULTIPLIED_LIMITED_MODIFIERS, SUMMED_MODIFIERS } from '@/constants/Common'
import { combineStats } from '@/utils'

export enum WeaponQuality {
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
	hitChance: number
	criticalChance: number
	criticalMultiplier: number
}

export type WeaponModifier = Partial<WeaponStats> &
	Partial<WeaponDistancesModifier> & {
		diceResult?: number
		damageMultiplier?: number
		evadeChance?: number
		defence?: number
	}

export type WeaponProps = WeaponStats & {
	name: string
	type: WeaponType
	quality: WeaponQuality
	modifiers?: WeaponModifier
}

interface IWeapon extends WeaponStats {
	name: string
	type: WeaponType
	quality: WeaponQuality
	modifiers: WeaponModifier
}

export class Weapon implements IWeapon {
	public readonly name: string
	public readonly type: WeaponType
	public readonly quality: WeaponQuality
	public readonly minDamage: number
	public readonly maxDamage: number
	public readonly hitChance: number
	public readonly criticalChance: number
	public readonly criticalMultiplier: number
	public readonly modifiers: WeaponModifier = {}

	constructor(props: WeaponProps) {
		this.name = props.name
		this.type = props.type
		this.quality = props.quality
		this.minDamage = props.minDamage
		this.maxDamage = props.maxDamage
		this.hitChance = props.hitChance
		this.criticalChance = props.criticalChance
		this.criticalMultiplier = props.criticalMultiplier
		this.modifiers = props.modifiers || {}
	}

	public static GetDamage(min: number, max: number, rollResult: number): number {
		const step = (max - min) / 8
		return Math.round(min + step * (rollResult + 4))
	}

	public static GetMedianStat(
		stat: keyof WeaponModifier,
		weapons: Weapon[],
		activeIndex: number,
		isAdvantageApplied = false,
		isDisadvantageApplied = false
	): number {
		let result = 0
		weapons.forEach((weapon, index) => {
			result += weapon.getStat(stat, index === activeIndex && isAdvantageApplied, index === activeIndex && isDisadvantageApplied)
		})
		return result / weapons.length
	}

	public static CombineStats = combineStats<keyof WeaponModifier>

	public getStat(stat: keyof WeaponModifier, isAdvantageApplied = false, isDisadvantageApplied = false): number {
		const stats: Partial<WeaponModifier> = {
			minDamage: this.minDamage,
			maxDamage: this.maxDamage,
			hitChance: this.hitChance,
			criticalChance: this.criticalChance,
			criticalMultiplier: this.criticalMultiplier
		}

		return Weapon.CombineStats(stat, [(stats[stat] || 0) + (this.modifiers[stat] || 0), this.type.getStat(stat, isAdvantageApplied, isDisadvantageApplied)])
	}
}