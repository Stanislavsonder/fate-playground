import { CharacterBody, CharacterBodySize } from '@/types'
import { ArmorType, BLOCK_CONSTANT } from '@/constants/Armor'
import { combineStats } from '@/utils'
import { BodyPart } from '@/constants/Character'

export type ArmorStats = {
	defence: number
}

export type MovementModifiers = {
	moveDistance?: number
	moveDistanceMultiplier?: number
}

export type DefenceModifiers = {
	defence?: number
	defenceMultiplier?: number
	diceResult?: number
}

export type ArmorModifier = DefenceModifiers &
	MovementModifiers & {
		evadeChance?: number
	}

interface IArmor extends ArmorStats {
	name: string
	slots: BodyPart[]
	size: CharacterBodySize
	type: ArmorType
	modifiers?: ArmorModifier
}

export class Armor implements IArmor {
	public readonly name: string = ''
	public slots: BodyPart[] = []
	public readonly size: CharacterBodySize = CharacterBodySize.Medium
	public readonly type: ArmorType = ArmorType.Cloth
	public readonly defence: number = 0
	public readonly modifiers: ArmorModifier = {}

	public isDisabled: boolean = false

	constructor(props: IArmor) {
		this.name = props.name
		this.slots = props.slots
		this.size = props.size
		this.type = props.type
		this.defence = props.defence
		this.modifiers = props.modifiers || {}
	}

	private static BLOCK_CONSTANT = BLOCK_CONSTANT
	public static BlockPercentage(defence: number): number {
		return (Armor.BLOCK_CONSTANT * defence) / (1 + Armor.BLOCK_CONSTANT * Math.abs(defence))
	}

	public static CombineStats = combineStats<keyof ArmorModifier>

	public static GetDefence(armor: Armor[], body: CharacterBody) {
		return armor.reduce((a, b) => a + b.getStat('defence') * Armor.GetSlotMultiplier(b, body), 0)
	}

	public static GetEvadeChance(armor: Armor[], body: CharacterBody) {
		return armor.reduce((a, b) => a + b.getStat('evadeChance') * Armor.GetSlotMultiplier(b, body), 0)
	}

	public static GetSlotMultiplier(armor: Armor, body: CharacterBody) {
		let result = 0
		for (const slot in armor.slots) {
			result += body.parts.find(e => e.part === armor.slots[slot])?.size || 0
		}
		return result
	}

	public getStat(stat: keyof ArmorModifier) {
		const stats: Partial<ArmorModifier> = {
			defence: this.defence
		}

		return this.isDisabled ? 0 : Armor.CombineStats(stat, [stats[stat], this.modifiers[stat]])
	}
}
