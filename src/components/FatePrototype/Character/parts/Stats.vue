<script setup lang="ts">
import { Character } from '@/entities/Character'
import { CHARACTER_LEVEL_CUPS } from '@/constants/Character'
import { Armor } from '@/entities/Armor'
defineProps<{
	character: Character
}>()
</script>

<template>
	<h2>
		{{ character.name }}
		<span class="stats__level"> ( {{ character.level }} Level ) </span>
	</h2>
	<p>Total XP: {{ character.experience }} / {{ CHARACTER_LEVEL_CUPS[character.level] }}</p>
	<h3>
		HP:
		<span class="stats__value">
			<span
				:class="`stats__value--${character.currenHealthPoints < character.maxHealthPoints / 3 ? 'negative' : character.currenHealthPoints < (2 * character.maxHealthPoints) / 3 ? 'neutral' : 'positive'}`"
			>
				{{ Math.round(character.currenHealthPoints) }}
			</span>
			/ {{ Math.round(character.maxHealthPoints) }}
		</span>
	</h3>
	<p>Armor: {{ character.armor.map(e => e.name).join(', ') }}</p>
	<p>Weapon: {{ character.weapon.map(e => e.name).join(', ') }}</p>
	<p>
		Damage:
		<span class="stats__value"> {{ Math.round(character.minDamage) }} - {{ Math.round(character.maxDamage) }} </span>
	</p>
	<p>
		Weapon distance:
		<span class="stats__value"> {{ character.minWeaponDistance }} - {{ character.maxWeaponDistance }} ft. </span>
		(
		<span class="stats__value stats__value--positive"> {{ character.minEffectiveWeaponDistance }} - {{ character.maxEffectiveWeaponDistance }} ft. </span>
		)
	</p>
	<p>
		Defence:
		<span class="stats__value"> {{ Math.round(character.defence) }} ({{ Math.round(Armor.BlockPercentage(character.defence) * 100) }}%) </span>
	</p>
	<p>
		Evade chance:
		<span
			class="stats__value"
			:class="`stats__value--${!character.evadeChance ? 'neutral' : 'positive'}`"
		>
			{{ Math.round(character.evadeChance * 100) }}%
		</span>
	</p>
	<p>
		Hit chance:
		<span
			class="stats__value"
			:class="`stats__value--${character.hitChance < 0.5 ? 'neutral' : 'positive'}`"
		>
			{{ Math.round(character.hitChance * 100) }}%
		</span>
	</p>
	<p>
		Critical chance:
		<span
			class="stats__value"
			:class="`stats__value--${!character.criticalChance ? 'neutral' : 'positive'}`"
		>
			{{ Math.round(character.criticalChance * 100) }}%
		</span>
	</p>
	<p>
		Critical multiplier:
		<span
			class="stats__value"
			:class="`stats__value--${!character.criticalMultiplier ? 'neutral' : 'positive'}`"
		>
			{{ Math.round(character.criticalMultiplier * 100) }}%
		</span>
	</p>
</template>

<style scoped lang="scss">
.stats {
	&__level {
		font-size: 14px;
		font-style: italic;
	}

	&__value {
		font-weight: bold;

		&--positive {
			color: #5cb200;
		}

		&--negative {
			color: #752d2d;
		}
	}
}
</style>
