<script setup lang="ts">
import { Weapon, WeaponModifier, LootQuality } from '@/entities/Weapon'

const { weapon } = defineProps<{
	weapon: Weapon
	actionText?: string
}>()

const emit = defineEmits<{
	click: []
}>()

function formatValue(key: keyof WeaponModifier, value: number): string {
	if (['hitChance', 'criticalMultiplier', 'criticalChance', 'evadeChance'].includes(key)) {
		return (value > 0 ? '+' : '') + (value * 100).toFixed(2) + '%'
	}
	if (['maxDistance', 'maxEffectiveDistance'].includes(key)) {
		return (value > 0 ? '+' : '-') + Math.abs(value) + ' ft.'
	}
	if (['minDistance', 'minEffectiveDistance'].includes(key)) {
		return (value > 0 ? '-' : '+') + Math.abs(value) + ' ft.'
	}

	return (value > 0 ? '+' : '') + value
}
</script>

<template>
	<article
		class="weapon"
		:class="`weapon--${LootQuality[weapon.quality]}`"
	>
		<h2>{{ weapon.name }}</h2>
		<p>{{ weapon.type.name }} ({{ weapon.level }} level)</p>
		<p class="weapon__modifier">
			<span class="weapon__modifier-key"> Damage: </span>
			<span class="weapon__modifier-value"> {{ weapon.minDamage }} - {{ weapon.maxDamage }} </span>
			<span
				v-if="weapon.modifiers.minDamage"
				class="weapon__modifier-value"
				:class="{
					'weapon__modifier-value--negative': weapon.modifiers.minDamage < 0,
					'weapon__modifier-value--positive': weapon.modifiers.minDamage > 0
				}"
			>
				{{ formatValue('minDamage', weapon.modifiers.minDamage) }}
			</span>
		</p>
		<div class="weapon__modifiers">
			<p
				v-for="modifier in Object.keys(weapon.modifiers)"
				:key="modifier"
				class="weapon__modifier"
			>
				<span class="weapon__modifier-key"> {{ modifier }}: </span>
				<span
					class="weapon__modifier-value"
					:class="{
						'weapon__modifier-value--negative': weapon.modifiers[modifier] < 0,
						'weapon__modifier-value--positive': weapon.modifiers[modifier] > 0
					}"
				>
					{{ formatValue(modifier as keyof WeaponModifier, weapon.modifiers[modifier]) }}
				</span>
			</p>
		</div>
		<button
			v-if="actionText"
			class="weapon__save"
			@click="emit('click')"
		>
			{{ actionText }}
		</button>
	</article>
</template>

<style scoped lang="scss">
.weapon {
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
