import { WeaponType } from './WeaponType'
import { MULTIPLIED_LIMITED_MODIFIERS, SUMMED_MODIFIERS } from '@/constants/Common'
import { combineStats, copy } from '@/utils'

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
	public readonly modifiers: WeaponModifier = {}

	constructor(props: WeaponProps) {
		this.name = props.name
		this.type = props.type
		this.quality = props.quality
		this.minDamage = props.minDamage
		this.maxDamage = props.maxDamage
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

	public static Copy(weapon: Weapon): Weapon {
		return new Weapon({
			...copy(weapon),
			type: weapon.type
		})
	}

	public getStat(stat: keyof WeaponModifier, isAdvantageApplied = false, isDisadvantageApplied = false): number {
		const stats: Partial<WeaponModifier> = {
			minDamage: this.minDamage,
			maxDamage: this.maxDamage
		}

		return Weapon.CombineStats(stat, [(stats[stat] || 0) + (this.modifiers[stat] || 0), this.type.getStat(stat, isAdvantageApplied, isDisadvantageApplied)])
	}
}
