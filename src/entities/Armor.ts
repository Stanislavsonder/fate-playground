import { CharacterSize } from '@/types'
import {
	ArmorSlot,
	ArmorType,
	BLOCK_CONSTANT,
	CLOTH_DEFENCE_MULTIPLIER,
	CLOTH_EVADE_CHANCE,
	CLOTH_MOVE_DISTANCE_MULTIPLIER,
	HEAVY_DEFENCE_MULTIPLIER,
	HEAVY_EVADE_CHANCE,
	HEAVY_MOVE_DISTANCE_MULTIPLIER,
	LIGHT_DEFENCE_MULTIPLIER,
	LIGHT_EVADE_CHANCE,
	LIGHT_MOVE_DISTANCE_MULTIPLIER,
	MEDIUM_DEFENCE_MULTIPLIER,
	MEDIUM_EVADE_CHANCE,
	MEDIUM_MOVE_DISTANCE_MULTIPLIER
} from '@/constants/Armor'
import { combineStats } from '@/utils'
import { CharacterBody } from '@/entities/Character'

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
	slots: ArmorSlot[]
	size: CharacterSize
	type: ArmorType
	modifiers?: ArmorModifier
}

export class Armor implements IArmor {
	public readonly name: string = ''
	public slots: ArmorSlot[] = []
	public readonly size: CharacterSize = CharacterSize.Medium
	public readonly type: ArmorType = ArmorType.Cloth
	public readonly defence: number = 0
	public readonly modifiers: ArmorModifier = {}

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
		return armor.reduce((a, b) => a + b.getStat('defence') * b.getStat('defenceMultiplier') * Armor.GetSlotMultiplier(b, body), 0)
	}

	public static GetEvadeChance(armor: Armor[], body: CharacterBody) {
		return armor.reduce((a, b) => a + b.getStat('evadeChance') * Armor.GetSlotMultiplier(b, body), 0)
	}

	public static GetSlotMultiplier(armor: Armor, body: CharacterBody) {
		let result = 0
		for (const slot in armor.slots) {
			result += (body.find(e => e[0] === armor.slots[slot]) || [0, 0])[1]
		}
		return result
	}

	private getTypeModifier(): ArmorModifier {
		switch (this.type) {
			case ArmorType.Cloth:
				return {
					evadeChance: CLOTH_EVADE_CHANCE,
					defenceMultiplier: CLOTH_DEFENCE_MULTIPLIER,
					moveDistanceMultiplier: CLOTH_MOVE_DISTANCE_MULTIPLIER
				}
			case ArmorType.Light:
				return {
					evadeChance: LIGHT_EVADE_CHANCE,
					defenceMultiplier: LIGHT_DEFENCE_MULTIPLIER,
					moveDistanceMultiplier: LIGHT_MOVE_DISTANCE_MULTIPLIER
				}
			case ArmorType.Medium:
				return {
					evadeChance: MEDIUM_EVADE_CHANCE,
					defenceMultiplier: MEDIUM_DEFENCE_MULTIPLIER,
					moveDistanceMultiplier: MEDIUM_MOVE_DISTANCE_MULTIPLIER
				}
			case ArmorType.Heavy:
				return {
					evadeChance: HEAVY_EVADE_CHANCE,
					defenceMultiplier: HEAVY_DEFENCE_MULTIPLIER,
					moveDistanceMultiplier: HEAVY_MOVE_DISTANCE_MULTIPLIER
				}
			default:
				return {}
		}
	}

	public getStat(stat: keyof ArmorModifier) {
		const stats: Partial<ArmorModifier> = {
			defence: this.defence
		}

		return Armor.CombineStats(stat, [stats[stat], this.modifiers[stat], this.getTypeModifier()[stat]])
	}
}
