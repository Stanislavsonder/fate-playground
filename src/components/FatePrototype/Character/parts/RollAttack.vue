<script setup lang="ts">
import { Dice, DiceType } from '@/services/dice.service'
import { Character } from '@/entities/Character'
import { computed, ref } from 'vue'
import { Weapon } from '@/entities/Weapon'

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

const isCritical = ref(false)

const rollResultValue = computed(() => {
	return rollResult.value.reduce((a, b) => a + b.result, 0)
})

const finalDamage = computed(() => {
	const damage = Weapon.GetDamage(character.minDamage, character.maxDamage, rollResultValue.value)
	return Math.round(isCritical.value ? damage * character.criticalMultiplier : damage)
})

function rollAttack() {
	isCritical.value = character.rollCriticalChance()
	rollResult.value = character.rollDice()
}
</script>

<template>
	<div class="character__roll">
		<button @click="rollAttack">Roll attack!</button>
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
			<span :class="{ 'character__damage--critical': isCritical }">
				{{ isCritical ? 'Crit!' : '' }}
				{{ finalDamage }} dmg.
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
