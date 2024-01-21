import { SkillPenalty } from '@/types'
import { BodyPart } from '@/constants/Character'

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
	slotsDisabled?: BodyPart[]
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
