import { SkillPenalty } from '@/types'
import { ArmorSlot } from '@/constants/Armor'

export enum WoundLevel {
	Light,
	Medium,
	Hard
}

export type WoundConsequence = {
	skills?: SkillPenalty[]
	diceResult?: number
	defence?: number
	evade?: number
	accuracy?: number
	minDamage?: number
	maxDamage?: number
	maxHealthPoints?: number
	slotsDisabled?: ArmorSlot[]
}

interface IWound {
	readonly description: string
	readonly level: WoundLevel
	readonly consequence: WoundConsequence
}

export class Wound implements IWound {
	constructor(
		readonly description: string,
		readonly level: WoundLevel,
		readonly consequence: WoundConsequence
	) {}
}
