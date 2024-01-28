<script setup lang="ts">
import { Armor, ArmorModifier } from '@/entities/Armor'
import { LootQuality } from '@/entities/Weapon'
import { BodyPart } from '../../../../constants/Character'
import { CharacterBodySize } from '../../../../types'

const { armor } = defineProps<{
	armor: Armor
	actionText?: string
}>()

const emit = defineEmits<{
	click: []
}>()

function formatValue(key: keyof ArmorModifier, value: number): string {
	if (['hitChance', 'criticalMultiplier', 'criticalChance', 'evadeChance'].includes(key)) {
		return (value > 0 ? '+' : '') + (value * 100).toFixed(2) + '%'
	}
	if (key === 'moveDistance') {
		return (value > 0 ? '+' : '-') + Math.abs(value) + ' ft.'
	}
	if (key === 'additionalHealthPoints') {
		return (value > 0 ? '+' : '-') + Math.abs(value) + ' hp'
	}

	return (value > 0 ? '+' : '') + value
}
</script>

<template>
	<article
		class="armor"
		:class="`armor--${LootQuality[armor.quality]}`"
	>
		<h2>{{ armor.name }}</h2>
		<p>{{ armor.slots.map(e => BodyPart[e]).join(', ') }}</p>
		<p>Size: {{ CharacterBodySize[armor.size] }}</p>
		<p>{{ armor.level }} level</p>
		<p class="armor__modifier">
			<span class="armor__modifier-key"> Defence: </span>
			<span class="armor__modifier-value"> {{ armor.defence }} </span>
			<span
				v-if="armor.modifiers.defence"
				class="armor__modifier-value"
				:class="{
					'armor__modifier-value--negative': armor.modifiers.defence < 0,
					'armor__modifier-value--positive': armor.modifiers.defence > 0
				}"
			>
				{{ formatValue('defence', armor.modifiers.defence) }}
			</span>
		</p>
		<div class="armor__modifiers">
			<p
				v-for="modifier in Object.keys(armor.modifiers)"
				:key="modifier"
				class="armor__modifier"
			>
				<span class="armor__modifier-key"> {{ modifier }}: </span>
				<span
					class="armor__modifier-value"
					:class="{
						'armor__modifier-value--negative': armor.modifiers[modifier] < 0,
						'armor__modifier-value--positive': armor.modifiers[modifier] > 0
					}"
				>
					{{ formatValue(modifier as keyof ArmorModifier, armor.modifiers[modifier]) }}
				</span>
			</p>
		</div>
		<button
			v-if="actionText"
			class="armor__save"
			@click="emit('click')"
		>
			{{ actionText }}
		</button>
	</article>
</template>

<style scoped lang="scss">
.armor {
	display: flex;
	flex-direction: column;
	border: 1px solid white;
	padding: 16px;
	border-radius: 16px;
	background-color: #ffffff;
	color: black;

	&--Garbage {
		background-color: gray;
		color: white;
	}

	&--Good {
		background-color: #469813;
		color: white;
	}

	&--Skillful {
		color: white;
		background-color: #1863af;
	}

	&--Perfect {
		background-color: #792dbe;
		color: white;
	}

	&--Legendary {
		background-color: #ffe45a;
	}

	&__modifier-value {
		font-weight: bold;

		&--positive {
			color: #00ff00;
		}

		&--negative {
			color: #ab4848;
		}
	}

	&__save {
		margin-top: auto;
		height: 40px;
		cursor: pointer;
	}
}
</style>
