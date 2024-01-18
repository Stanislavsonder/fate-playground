<script setup lang="ts">
import { Character } from '@/entities/Character'
import { Dice, DiceType } from '@/services/dice.service'
import { computed, ref } from 'vue'
import { Weapon } from '../../entities/Weapon'
import { Armor } from '../../entities/Armor'
import { CHARACTER_LEVEL_CUPS } from '../../constants/Character'

const character = defineModel<Character>({
	required: false,
	default: () => new Character({ name: 'Unknown character' })
})

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
	const damage = Weapon.GetDamage(character.value.minDamage, character.value.maxDamage, rollResultValue.value)
	return Math.round(isCritical.value ? damage * character.value.criticalMultiplier : damage)
})

function rollHit() {}

function rollAttack() {
	isCritical.value = character.value.rollCriticalChance()
	rollResult.value = character.value.rollDice()
}
</script>

<template>
	<section class="character">
		<h2>
			{{ character.name }}
			<span class="character__level"> ( {{ character.level }} Level ) </span>
		</h2>
		<p>Total XP: {{ character.experience }} / {{ CHARACTER_LEVEL_CUPS[character.level] }}</p>
		<h3>
			HP:
			<span class="character__value">
				<span
					:class="`character__value--${character.currenHealthPoints < character.maxHealthPoints / 3 ? 'negative' : character.currenHealthPoints < (2 * character.maxHealthPoints) / 3 ? 'neutral' : 'positive'}`"
				>
					{{ Math.round(character.currenHealthPoints) }}
				</span>
				/ {{ Math.round(character.maxHealthPoints) }}
			</span>
		</h3>
		<p>
			Damage:
			<span class="character__value"> {{ Math.round(character.minDamage) }} - {{ Math.round(character.maxDamage) }} </span>
		</p>
		<p>
			Defence:
			<span class="character__value"> {{ Math.round(character.defence) }} ({{ Math.round(Armor.BlockPercentage(character.defence) * 100) }}%) </span>
		</p>
		<p>
			Evade chance:
			<span
				class="character__value"
				:class="`character__value--${!character.evadeChance ? 'neutral' : 'positive'}`"
			>
				{{ Math.round(character.evadeChance * 100) }}%
			</span>
		</p>
		<p>
			Hit chance:
			<span
				class="character__value"
				:class="`character__value--${character.hitChance < 0.5 ? 'neutral' : 'positive'}`"
			>
				{{ Math.round(character.hitChance * 100) }}%
			</span>
		</p>
		<p>
			Critical chance:
			<span
				class="character__value"
				:class="`character__value--${!character.criticalChance ? 'neutral' : 'positive'}`"
			>
				{{ Math.round(character.criticalChance * 100) }}%
			</span>
		</p>
		<p>
			Critical multiplier:
			<span
				class="character__value"
				:class="`character__value--${!character.criticalMultiplier ? 'neutral' : 'positive'}`"
			>
				{{ Math.round(character.criticalMultiplier * 100) }}%
			</span>
		</p>

		<button @click="rollAttack">Roll attack!</button>
		<p class="character__roll-result">
			<span
				v-for="dice in rollResult"
				class="character__dice"
				:class="{ 'character__dice--lucky': dice.type === DiceType.Lucky }"
			>
				{{ dice.result }}
			</span>
		</p>
		<p>
			{{ rollResultValue }} |
			<span :class="{ 'character__damage--critical': isCritical }">
				{{ isCritical ? 'Crit!' : '' }}
				{{ finalDamage }} dmg.
			</span>
		</p>
	</section>
</template>

<style scoped lang="scss">
.character {
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

	&__roll-result {
		display: flex;
		gap: 8px;
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
