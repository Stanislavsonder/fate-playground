export enum DiceType {
	Default,
	Lucky
}

export type Dice = {
	result: -1 | 0 | 1
	type: DiceType
}

export type DiceRollResult = {
	dice: Dice[]
	result: number
	bonus: number
}

export default new (class DiceService {
	public roll(amount: number = 4, luck = 0): Dice[] {
		const dices = Array(amount).fill(undefined)
		return dices.map((dice, index) => {
			if (this.isDiceLucky(index, luck)) {
				return {
					type: DiceType.Lucky,
					result: this.luckyDiceResult()
				}
			}
			return {
				type: DiceType.Default,
				result: this.diceResult()
			}
		})
	}

	private isDiceLucky(diceOrder: number, luck: number): boolean {
		return Math.random() <= (luck * 0.1) / Math.pow(2, diceOrder)
	}

	private luckyDiceResult(): Dice['result'] {
		return Math.random() <= 2 / 3 ? 1 : 0
	}

	private diceResult(): Dice['result'] {
		const randomValue = Math.random()
		return randomValue < 1 / 3 ? -1 : randomValue < 2 / 3 ? 0 : 1
	}
})()
