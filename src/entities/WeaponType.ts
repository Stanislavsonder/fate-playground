import { Weapon, WeaponDistancesModifier, WeaponModifier, WeaponRange } from './Weapon'

interface IWeaponType extends WeaponDistancesModifier {
	name: string
	range: WeaponRange
	hitChance: number
	advantage: WeaponModifier
	disadvantage: WeaponModifier
	generationData: {
		damageMultiplier: number
	}
}

export class WeaponType implements IWeaponType {
	public readonly name: string
	public readonly range: WeaponRange
	public readonly minDistance: number
	public readonly minEffectiveDistance: number
	public readonly maxEffectiveDistance: number
	public readonly maxDistance: number
	public readonly advantage: WeaponModifier
	public readonly disadvantage: WeaponModifier
	public readonly hitChance: number
	public readonly generationData

	constructor(props: IWeaponType) {
		this.name = props.name
		this.range = props.range
		this.minDistance = props.minDistance
		this.minEffectiveDistance = props.minEffectiveDistance
		this.maxEffectiveDistance = props.maxEffectiveDistance
		this.maxDistance = props.maxDistance
		this.hitChance = props.hitChance
		this.advantage = props.advantage
		this.disadvantage = props.disadvantage
		this.generationData = props.generationData
	}

	getStat(stat: keyof WeaponModifier, isAdvantageApplied = false, isDisadvantageApplied = false): number {
		const stats: Partial<WeaponModifier> = {
			minDistance: this.minDistance,
			maxDistance: this.maxDistance,
			minEffectiveDistance: this.minEffectiveDistance,
			maxEffectiveDistance: this.maxEffectiveDistance,
			hitChance: this.hitChance
		}

		return Weapon.CombineStats(stat, [
			stats[stat] || 0,
			isAdvantageApplied ? this.advantage[stat] || 0 : 0,
			isDisadvantageApplied ? this.disadvantage[stat] || 0 : 0
		])
	}
}
