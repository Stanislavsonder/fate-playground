import { WeaponType } from './WeaponType'
import { combineStats, copy } from '@/helpers/utils'
import { LootQuality, WeaponModifier, WeaponStats } from '@/types'

export type WeaponProps = WeaponStats & {
	name: string
	type: WeaponType
	level?: number
	quality?: LootQuality
	modifiers?: WeaponModifier
}

interface IWeapon extends WeaponStats {
	name: string
	type: WeaponType
	quality: LootQuality
	modifiers: WeaponModifier
	level: number
}

export class Weapon implements IWeapon {
	public readonly name: string
	public readonly type: WeaponType
	public readonly minDamage: number
	public readonly maxDamage: number
	public readonly quality: LootQuality = LootQuality.Common
	public readonly modifiers: WeaponModifier = {}
	public readonly level: number = 1

	constructor(props: WeaponProps) {
		this.name = props.name
		this.type = props.type
		this.quality = props.quality ?? this.quality
		this.minDamage = props.minDamage
		this.maxDamage = props.maxDamage
		this.modifiers = props.modifiers || {}
		this.level = props.level ?? this.level
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
		return result / (weapons.length || 1)
	}

	public static CombineStats = combineStats<keyof WeaponModifier>

	public static CombineModifiers(...modifiers: WeaponModifier[]): WeaponModifier {
		const result: WeaponModifier = {}

		for (let modifier of modifiers) {
			for (let k in modifier) {
				const key = k as keyof WeaponModifier
				result[key] = Weapon.CombineStats(key, [modifier[key], result[key]])
			}
		}

		return Object.fromEntries(Object.entries(result).filter(value => Boolean(value[1])))
	}

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
