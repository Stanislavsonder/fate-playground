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

export type ArmorModifier = {
	evadeChance?: number
	defence?: number
	defenceMultiplier?: number
	moveDistance?: number
	moveDistanceMultiplier?: number
}

interface IArmor {
	name: string
	slots: ArmorSlot[]
	size: CharacterSize
	type: ArmorType
	defence: number
	defenceMultiplier?: number
	bonuses?: ArmorModifier
	penalty?: ArmorModifier
}

export class Armor implements IArmor {
	public readonly name: string = ''
	public readonly slots: ArmorSlot[] = []
	public readonly size: CharacterSize = CharacterSize.Medium
	public readonly type: ArmorType = ArmorType.Cloth
	public readonly defence: number = 0
	public readonly bonuses?: ArmorModifier
	public readonly penalty?: ArmorModifier

	constructor(props: IArmor) {
		this.name = props.name
		this.slots = props.slots
		this.size = props.size
		this.type = props.type
		this.defence = props.defence
		this.bonuses = props.bonuses
		this.penalty = props.penalty
	}

	private static BLOCK_CONSTANT = BLOCK_CONSTANT
	public static BlockPercentage(defence: number): number {
		return 1 - (Armor.BLOCK_CONSTANT * defence) / (1 + Armor.BLOCK_CONSTANT * Math.abs(defence))
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

	get baseDefence(): number {
		return (
			this.defence * ((this.getTypeModifier().defenceMultiplier || 0) + (this.bonuses?.defenceMultiplier || 0) + (this.penalty?.defenceMultiplier || 0))
		)
	}

	get bonusDefence(): number {
		return (this.bonuses?.defence || 0) + (this.penalty?.defence || 0)
	}

	get totalDefence(): number {
		return this.baseDefence + this.bonusDefence
	}

	get evadeChance(): number {
		return (this.getTypeModifier().evadeChance || 0) + (this.bonuses?.evadeChance || 0) + (this.penalty?.evadeChance || 0)
	}
}
