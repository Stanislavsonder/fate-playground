<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { Weapon } from '@/entities/Weapon'
import { computed } from 'vue'
import { ArmorType } from '../../../constants/Armor'
import { BodyPart } from '../../../constants/Character'
import { AppStore } from '@/store/app.store'
import { LootQuality, WeaponRange } from '@/types'

const {
	value,
	mode,
	disabled = false
} = defineProps<{
	value: Armor | Weapon
	actionText?: string
	mode?: 'remove' | 'save'
	disabled?: boolean
}>()

const emit = defineEmits<{
	click: []
}>()

const appStore = AppStore()

const skipModifiers = ['minDamage', 'maxDamage', 'defence', 'hitChance']

const isFavorite = computed(() => {
	return value instanceof Armor ? appStore.savedArmor.includes(value) : appStore.savedWeapon.includes(value)
})

const displayableModifiers = computed(() => {
	return Object.keys(value.modifiers).filter(modifier => skipModifiers.indexOf(modifier) === -1)
})

function formatSigned(value: number): string {
	return ' ' + (value > 0 ? '+' + value : String(value))
}

function splitCamelCase(str: string): string {
	return capitalizeFirstLetter(str.replace(/([a-z])([A-Z])/g, '$1 $2'))
}

function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatPercent(value: number, signs = 2): string {
	return (value * 100).toFixed(signs) + '%'
}

function formatModifier(name: string, value: number): string {
	if (['hitChance', 'criticalMultiplier', 'criticalChance', 'evadeChance'].includes(name)) {
		return (value > 0 ? '+' : '') + formatPercent(value)
	}
	if (['moveDistance', 'maxDistance', 'maxEffectiveDistance'].includes(name)) {
		return (value > 0 ? '+' : '-') + Math.abs(value) + ' ft.'
	}

	if (['minDistance', 'minEffectiveDistance'].includes(name)) {
		return (value > 0 ? '-' : '+') + Math.abs(value) + ' ft.'
	}

	if (name === 'additionalHealthPoints') {
		return (value > 0 ? '+' : '-') + Math.abs(value) + ' hp'
	}

	return (value > 0 ? '+' : '') + value
}

function toggleFavorite() {
	if (isFavorite.value) {
		if (value instanceof Armor) {
			appStore.removeArmor(value)
		} else {
			appStore.removeWeapon(value)
		}
		return
	}
	if (value instanceof Armor) {
		appStore.saveArmor(value)
	} else {
		appStore.saveWeapon(value)
	}
}
</script>

<template>
	<article
		class="card"
		:class="`card--${LootQuality[value.quality]}`"
	>
		<button
			v-if="mode"
			class="card__favorite"
			:class="{ 'card__favorite--enabled': isFavorite }"
			@click="toggleFavorite"
		>
			<span v-if="mode === 'save'">❤</span>
			<span v-if="mode === 'remove'">❌</span>
		</button>
		<h3 class="card__title">
			<span class="card__level">{{ value.level }}</span>
			{{ value.name }}
		</h3>
		<p>
			<template v-if="value instanceof Armor">
				Defence:
				<span class="card__stat">
					{{ value.defence }}
				</span>
				<span
					v-if="value.modifiers.defence"
					class="card__bonus card__stat"
					:class="{
						'card__bonus--negative': value.modifiers.defence < 0,
						'card__bonus--positive': value.modifiers.defence > 0
					}"
				>
					{{ formatSigned(value.modifiers.defence) }}
				</span>
			</template>
			<template v-if="value instanceof Weapon">
				Damage:
				<span class="card__stat">
					{{ value.minDamage }}
					-
					{{ value.maxDamage }}
				</span>
				<span
					v-if="value.modifiers.minDamage"
					class="card__bonus card__stat"
					:class="{
						'card__bonus--negative': value.modifiers.minDamage < 0,
						'card__bonus--positive': value.modifiers.minDamage > 0
					}"
				>
					{{ formatSigned(value.modifiers.minDamage) }}
				</span>
			</template>
		</p>
		<p v-if="value instanceof Weapon">
			Distance:
			<span class="card__stat">
				{{ value.type.minDistance }}
				-
				{{ value.type.maxDistance }}
			</span>
			(
			<span class="card__bonus card__stat">
				{{ value.type.minEffectiveDistance }}
				-
				{{ value.type.maxEffectiveDistance }}
			</span>
			) ft.
		</p>
		<p v-if="value instanceof Weapon">
			Hit Chance:
			<span class="card__stat">
				{{ formatPercent(value.type.hitChance, 0) }}
			</span>
			<span
				v-if="value.modifiers['hitChance']"
				class="card__bonus card__stat"
				:class="{
					'card__bonus--negative': value.modifiers['hitChance'] < 0,
					'card__bonus--positive': value.modifiers['hitChance'] > 0
				}"
			>
				{{ ' ' + formatModifier('hitChance', value.modifiers['hitChance']) }}
			</span>
		</p>
		<ul
			v-if="displayableModifiers.length"
			class="card__modifiers"
		>
			<li
				v-for="modifier in displayableModifiers"
				:key="modifier"
			>
				{{ splitCamelCase(modifier) }}:
				<span
					class="card__bonus card__stat"
					:class="{
						'card__bonus--negative': value.modifiers[modifier] < 0,
						'card__bonus--positive': value.modifiers[modifier] > 0
					}"
				>
					{{ formatModifier(modifier, value.modifiers[modifier]) }}
				</span>
			</li>
		</ul>

		<div class="card__bottom">
			<p>
				<template v-if="value instanceof Armor">
					{{ ArmorType[value.type] }}
				</template>
				<template v-else>
					{{ WeaponRange[value.type.range] }}
				</template>
			</p>
			<p>
				<template v-if="value instanceof Armor">
					{{ value.slots.map(slot => BodyPart[slot]).join(', ') }}
				</template>
				<template v-else>
					{{ value.type.name }}
				</template>
			</p>
		</div>
		<button
			v-if="actionText"
			class="card__action"
			:disabled="disabled"
			@click="emit('click')"
		>
			{{ actionText }}
		</button>
	</article>
</template>

<style scoped lang="scss">
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px;
	border-radius: 16px;
	background-color: #cbcbcb;
	border: 1px solid white;
	color: white;
	font-size: 14px;
	height: 100%;

	&--Garbage {
		background-color: #2d2d2d;
	}

	&--Common {
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

	&__favorite {
		position: absolute;
		display: grid;
		place-content: center;
		right: 16px;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-size: 14px;
		border: none;
		transition:
			color 0.2s ease-in-out,
			background-color 0.2s ease-in-out;

		&--enabled {
			color: #e75b5b;
			background-color: #f6afaf;
		}
	}

	&__title {
		font-weight: bold;
		height: 48px;
	}

	&__level {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
		background-color: rgba(31, 31, 31, 0.81);
		color: white;
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}

	&__stat {
		font-weight: bold;
		text-shadow: 0.5px 0.5px 0 rgba(0, 0, 0, 0.5);
	}

	&__bonus {
		&--positive {
			color: #00ff00;
		}
		&--negative {
			color: #ff0000;
		}
	}

	&__modifiers {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		padding: 8px 16px;
	}

	&__bottom {
		margin-top: auto;
		padding-top: 16px;
		font-size: 12px;
	}

	&__action {
		height: 24px;
		border: none;
		border-radius: 8px;
		margin-top: 8px;
		font-weight: bold;
	}
}
</style>
