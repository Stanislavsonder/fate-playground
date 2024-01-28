<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Character } from '@/entities/Character'
import CharacterComponent from './Character/Character.vue'

const ivan = reactive(
	new Character({
		name: 'Ivan',
		luck: 1
	})
)

const ratLord = reactive(
	new Character({
		name: 'RatLord',
		luck: 4
	})
)

const range = ref(10)

watch(
	range,
	value => {
		ivan.currentDistance = value
		ratLord.currentDistance = value
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
		<CharacterComponent v-model="ivan" />
		<CharacterComponent v-model="ratLord" />
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
