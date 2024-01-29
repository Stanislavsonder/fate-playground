<script setup lang="ts">
import { ref, watch } from 'vue'
import { Character } from '@/entities/Character'
import CharacterComponent from './Character/Character.vue'

const player1 = ref(
	new Character({
		name: 'Player 1',
		luck: 1
	})
)

const player2 = ref(
	new Character({
		name: 'Player 2',
		luck: 1
	})
)

const range = ref(10)

watch(
	range,
	value => {
		player1.value.currentDistance = value
		player2.value.currentDistance = value
	},
	{
		immediate: true
	}
)
</script>

<template>
	<div class="distance">
		<label class="distance__label">
			Distance
			<input
				v-model="range"
				type="number"
				min="0"
				max="40"
				step="1"
			/>
			<input
				v-model="range"
				type="range"
				min="0"
				max="40"
				step="1"
			/>
		</label>
	</div>
	<div class="big-container">
		<CharacterComponent v-model="player1" />
		<CharacterComponent v-model="player2" />
	</div>
</template>

<style scoped lang="scss">
.big-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 48px;
}

.distance {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 16px;

	&__label {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 8px;
		font-size: 18px;
		width: 100%;

		input {
			background-color: transparent;
			border: none;
			border-bottom: 2px solid white;
			color: white;
			text-align: center;
			font-size: 24px;
		}
	}
}
</style>
