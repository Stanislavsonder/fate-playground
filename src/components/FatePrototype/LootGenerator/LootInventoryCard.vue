<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { Weapon } from '@/entities/Weapon'
import { onUpdated, ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import LootCard from '@/components/FatePrototype/LootGenerator/LootCard.vue'
import { LootQuality } from '@/types'

const { value, actionEnabled = false } = defineProps<{
	value: Armor | Weapon
	actionEnabled?: boolean
	actionText?: string
}>()
const emit = defineEmits<{
	click: []
	remove: []
}>()
const element = ref<HTMLButtonElement | undefined>()
const isHovered = useElementHover(element)
</script>

<template>
	<article
		ref="element"
		class="card"
		:class="`card--${LootQuality[value.quality]}`"
	>
		{{ value instanceof Armor ? 'Armor' : 'Weapon' }}
		<div>
			<button
				class="card__remove"
				@click="emit('remove')"
			>
				❌
			</button>
			<button
				v-if="actionText"
				class="card__action"
				:disabled="!actionEnabled"
				@click="emit('click')"
			>
				{{ actionText }}
			</button>
		</div>
	</article>
	<LootCard
		v-if="isHovered"
		class="card__tooltip"
		:value="value"
	/>
</template>

<style scoped lang="scss">
.card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	padding: 8px;
	border-radius: 4px;
	font-size: 12px;

	&--Garbage {
		background-color: #2d2d2d;
	}

	&--Common {
		background-color: #e1e1e1;
		color: #000000;
	}

	&--Good {
		background-color: #4e7938;
	}

	&--Skillful {
		background-color: #19557e;
	}

	&--Perfect {
		background-color: #5b2786;
	}

	&--Legendary {
		background-color: #ffe45a;
	}

	&__remove {
		position: absolute;
		display: grid;
		place-items: center;
		right: -4px;
		top: -4px;
		width: 20px;
		height: 20px;
		font-size: 10px;
		border-radius: 100%;
		border: none;
		padding: 0;
	}

	&__action {
		position: absolute;
		width: calc(100% - 16px);
		left: 8px;
		bottom: 8px;
		border-radius: 4px;
	}

	&__tooltip {
		position: absolute;
		width: 300px;
		height: auto;
		top: -16px;
		translate: 0 -100%;
		z-index: 10;
	}
}
</style>
