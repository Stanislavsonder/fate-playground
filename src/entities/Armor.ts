import { CharacterBody, CharacterBodySize, LootQuality } from '@/types'
import { ArmorType, BLOCK_CONSTANT } from '@/constants/Armor'
import { combineStats, copy } from '@/components/helpers/utils'
import { BodyPart } from '@/constants/Character'

export type ArmorStats = {
	defence: number
}

export type MovementModifiers = {
	moveDistance?: number
}

export type DefenceModifiers = {
	defence?: number
	diceResult?: number
	additionalHealthPoints?: number
}

export type ArmorModifier = DefenceModifiers &
	MovementModifiers & {
		evadeChance?: number
		damage?: number
	}

type ArmorProps = ArmorStats & {
	name: string
	level?: number
	slots?: BodyPart[]
	size?: CharacterBodySize
	type?: ArmorType
	quality?: LootQuality
	modifiers?: ArmorModifier
}

export class Armor {
	public readonly name: string = ''
	public slots: BodyPart[] = []
	public readonly level: number = 1
	public readonly quality: LootQuality = LootQuality.Common
	public readonly size: CharacterBodySize = CharacterBodySize.Medium
	public readonly type: ArmorType = ArmorType.Cloth
	public readonly defence: number = 0
	public readonly modifiers: ArmorModifier = {}

	public isDisabled: boolean = false

	constructor(props: ArmorProps) {
		this.name = props.name
		this.defence = props.defence
		this.level = props.level ?? this.level
		this.slots = props.slots ?? this.slots
		this.size = props.size ?? this.size
		this.type = props.type ?? this.type
		this.quality = props.quality ?? this.quality
		this.modifiers = props.modifiers ?? this.modifiers
	}

	private static BLOCK_CONSTANT = BLOCK_CONSTANT
	public static BlockPercentage(defence: number): number {
		return (Armor.BLOCK_CONSTANT * defence) / (1 + Armor.BLOCK_CONSTANT * Math.abs(defence))
	}

	public static CombineStats = combineStats<keyof ArmorModifier>

	public static GetCombinedStats(stat: keyof ArmorModifier, armor: Armor[]): number {
		return Armor.CombineStats(
			stat,
			armor.map(e => e.getStat(stat))
		)
	}

	public static GetDefence(armor: Armor[], body: CharacterBody) {
		return armor.reduce((a, b) => a + b.getStat('defence'), 0)
	}

	public static GetEvadeChance(armor: Armor[], body: CharacterBody) {
		return armor.reduce((a, b) => a + b.getStat('evadeChance') * Armor.GetSlotMultiplier(b, body), 0)
	}

	public static GetSlotMultiplier(armor: Armor, body: CharacterBody) {
		let result = 0
		for (const slot in armor.slots) {
			result += body.armorSlots.find(e => e.part === armor.slots[slot])?.size || 0
		}
		return result
	}

	public static Copy(armor: Armor): Armor {
		return new Armor({
			...copy(armor)
		})
	}

	public static CombineModifiers(...modifiers: ArmorModifier[]): ArmorModifier {
		const result: ArmorModifier = {}

		for (let modifier of modifiers) {
			for (let k in modifier) {
				const key = k as keyof ArmorModifier
				result[key] = Armor.CombineStats(key, [modifier[key], result[key]])
			}
		}

		return Object.fromEntries(Object.entries(result).filter(value => Boolean(value[1])))
	}

	public getStat(stat: keyof ArmorModifier) {
		const stats: Partial<ArmorModifier> = {
			defence: this.defence
		}

		return this.isDisabled ? 0 : Armor.CombineStats(stat, [stats[stat], this.modifiers[stat]])
	}
}
