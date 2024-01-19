import { Weapon, WeaponDistancesModifier, WeaponModifier, WeaponRange } from './Weapon'

interface IWeaponType extends WeaponDistancesModifier {
	name: string
	range: WeaponRange
	damageMultiplier: number
	hitChance: number
	bonus: WeaponModifier
	penalty: WeaponModifier
}

export class WeaponType implements IWeaponType {
	public readonly name: string
	public readonly range: WeaponRange
	public readonly minDistance: number
	public readonly minEffectiveDistance: number
	public readonly maxEffectiveDistance: number
	public readonly maxDistance: number
	public readonly bonus: WeaponModifier
	public readonly penalty: WeaponModifier
	public readonly hitChance: number
	public readonly damageMultiplier: number

	constructor(props: IWeaponType) {
		this.name = props.name
		this.range = props.range
		this.minDistance = props.minDistance
		this.minEffectiveDistance = props.minEffectiveDistance
		this.maxEffectiveDistance = props.maxEffectiveDistance
		this.maxDistance = props.maxDistance
		this.damageMultiplier = props.damageMultiplier
		this.hitChance = props.hitChance
		this.bonus = props.bonus
		this.penalty = props.penalty
	}

	getStat(stat: keyof WeaponModifier, bonus = false, penalty = false): number {
		const stats: Partial<WeaponModifier> = {
			minDistance: this.minDistance,
			maxDistance: this.maxDistance,
			minEffectiveDistance: this.minEffectiveDistance,
			maxEffectiveDistance: this.maxEffectiveDistance,
			damageMultiplier: this.damageMultiplier,
			hitChance: this.hitChance
		}

		return Weapon.CombineStats(stat, [stats[stat] || 0, bonus ? this.bonus[stat] || 0 : 0, penalty ? this.penalty[stat] || 0 : 0])
	}
}
