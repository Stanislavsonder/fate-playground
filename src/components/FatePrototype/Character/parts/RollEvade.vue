<script setup lang="ts">
import { Dice, DiceType } from '@/services/dice.service'
import { Character } from '@/entities/Character'
import { computed, ref } from 'vue'

const { character } = defineProps<{
	character: Character
}>()

const rollResult = ref<Dice[]>([
	{
		result: 0,
		type: DiceType.Default
	},
	{
		result: 0,
		type: DiceType.Default
	},
	{
		result: 0,
		type: DiceType.Default
	},
	{
		result: 0,
		type: DiceType.Default
	}
])

const isEvade = ref(false)

const rollResultValue = computed(() => {
	return rollResult.value.reduce((a, b) => a + b.result, 0)
})

function rollHit() {
	const evade = character.rollEvadeChance()
	isEvade.value = evade.result
	rollResult.value = evade.diceResult
}
</script>

<template>
	<div class="character__roll">
		<button @click="rollHit">Roll Evade!</button>
		<p class="character__roll-result">
			<span
				v-for="(dice, index) in rollResult"
				:key="index"
				class="character__dice"
				:class="{ 'character__dice--lucky': dice.type === DiceType.Lucky }"
			>
				{{ dice.result }}
			</span>
			{{ rollResultValue }}
		</p>
		<p class="character__roll-result">
			<span :class="{ 'character__damage--critical': isEvade }">
				{{ isEvade ? 'Evade!' : '' }}
			</span>
		</p>
	</div>
</template>

<style scoped lang="scss">
.character {
	&__roll {
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		justify-content: center;

		button {
			height: 36px;
			border-radius: 16px;
			border: none;
			cursor: pointer;

			&:hover {
				background-color: #919191;
			}
		}
	}

	&__roll-result {
		display: flex;
		gap: 8px;
		justify-content: center;
	}

	&__dice {
		display: grid;
		place-content: center;
		width: 24px;
		height: 24px;
		background: white;
		color: black;
		font-size: 16px;
		border-radius: 4px;
		font-weight: bold;

		&--lucky {
			background-color: gold;
		}
	}

	&__damage {
		&--critical {
			color: #d24a4a;
		}
	}
}
</style>
