import { objectsSum } from '@/utils'
import { WeaponType } from './WeaponType'

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

export type WeaponDistances = {
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
	Partial<WeaponDistances> & {
		diceResult?: number
	}

export type WeaponProps = WeaponStats & {
	name: string
	type: WeaponType
	quality: WeaponQuality
	bonus?: WeaponModifier
	penalty?: WeaponModifier
}

interface IWeapon extends WeaponStats {
	name: string
	type: WeaponType
	quality: WeaponQuality
	bonus?: WeaponModifier
	penalty?: WeaponModifier
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
	public readonly bonus?: WeaponModifier
	public readonly penalty?: WeaponModifier

	constructor(props: WeaponProps) {
		this.name = props.name
		this.type = props.type
		this.quality = props.quality
		this.minDamage = props.minDamage
		this.maxDamage = props.maxDamage
		this.hitChance = props.hitChance
		this.criticalChance = props.criticalChance
		this.criticalMultiplier = props.criticalMultiplier
		this.bonus = props.bonus
		this.penalty = props.penalty
	}

	stats(bonus = false, penalty = false): WeaponModifier {
		return objectsSum<WeaponModifier>(
			{
				minDamage: this.minDamage,
				maxDamage: this.maxDamage,
				hitChance: this.hitChance,
				criticalChance: this.criticalChance,
				criticalMultiplier: this.criticalMultiplier
			},
			this.bonus,
			this.penalty,
			this.type.stats(bonus, penalty)
		)
	}
}
