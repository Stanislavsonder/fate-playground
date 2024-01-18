<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterSize } from '@/types'
import { Weapon, WeaponQuality } from '@/entities/Weapon'
import { Sword } from '@/constants/Weapons'
import {reactive, ref, watch} from 'vue'
import { Character } from '@/entities/Character'
import { copy } from '@/utils'
import { EMPTY_SKILL_SET } from '@/constants/Character'
import { ArmorSlot, ArmorType } from '@/constants/Armor'
import SkillEditor from '@/components/FatePrototype/SkillEditor.vue'

const bronzeHelmet = new Armor({
	name: 'Bronze Helmet',
	size: CharacterSize.Medium,
	type: ArmorType.Heavy,
	defence: 24,
	slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
	bonuses: {
		moveDistance: -10,
		evadeChance: 0.1,
		defence: 2
	}
})

const glove = new Armor({
	name: 'Glove of wolf',
	size: CharacterSize.Medium,
	type: ArmorType.Light,
	defence: 3,
	slots: [ArmorSlot.Fingers, ArmorSlot.Wrist],
	bonuses: {
		moveDistance: +2,
		evadeChance: 0,
		defence: -1
	}
})

const woodenSword = new Weapon({
	name: 'Wooden Sword',
	quality: WeaponQuality.Garbage,
	type: Sword,
	minDamage: 0,
	maxDamage: 8,
	criticalChance: 0,
	criticalMultiplier: 0,
	hitChance: 0,
	bonus: {
		minDamage: 15,
		maxDamage: 20
	}
})

const ivan = reactive(
	new Character({
		name: 'Ivan',
		luck: 1,
		size: CharacterSize.Medium,
		slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
		weapon: woodenSword,
		armor: [bronzeHelmet, glove]
	})
)

const bonus = ref(false)
const penalty = ref(false)

watch(bonus, (value) => {
	ivan.setWeaponBonus(value)
})

watch(penalty, (value) => {
	ivan.setWeaponPenalty(value)
})
</script>

<template>
	<div class="big-container">
		<div class="container">
			<details>
				<summary>
					{{ bronzeHelmet.name }}
				</summary>
				<p>Defence: {{ bronzeHelmet.baseDefence }} +{{ bronzeHelmet.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>
				<p>Evade chance: {{ bronzeHelmet.evadeChance }}</p>
			</details>
			<details>
				<summary>
					{{ glove.name }}
				</summary>
				<p>Defence: {{ glove.baseDefence }} {{ glove.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>
				<p>Evade chance: {{ glove.evadeChance }}</p>
			</details>

			<details>
				<summary>
					{{ woodenSword.name }}
				</summary>
				<p>Type: {{ woodenSword.type.name }}</p>
				<p>Distance: {{ woodenSword.type.minDistance }} - {{ woodenSword.type.maxDistance }} ft</p>
				<p>Damage: {{ woodenSword.stats(bonus, penalty).minDamage }} - {{ woodenSword.stats(bonus, penalty).maxDamage }}</p>
				<p>
					Effective Distance:
					{{ woodenSword.type.getMinEffectiveDistance(bonus, penalty) }}
					-
					{{ woodenSword.type.getMaxEffectiveDistance(bonus, penalty) }} ft.
				</p>
				<label>
					<input
						v-model="bonus"
						type="checkbox"
					/>
					Activate weapon bonus
				</label>
				<br />
				<label>
					<input
						v-model="penalty"
						type="checkbox"
					/>
					Activate weapon penalty
				</label>
				<p>{{ woodenSword.type.stats(bonus, penalty) }}</p>
				<p>{{ woodenSword.stats(bonus, penalty) }}</p>
			</details>

			<div>
				<h2>
					{{ ivan.name }}
				</h2>
				<p>Weapon: {{ ivan.weapon.name }}</p>
				<p>Armor: {{ ivan.armor.map(e => e.name).join(', ') }}</p>
				<p>Max HP: {{ ivan.maxHealthPoints }}</p>
				<p>Current HP: {{ ivan.currenHealthPoints }}</p>
				<p>Damage: {{ Math.round(ivan.minDamage) }} - {{ Math.round(ivan.maxDamage) }}</p>
				<p>Hit chance: {{ Math.round(ivan.hitChance * 100) }}%</p>
				<p>Critical chance: {{ Math.round(ivan.criticalChance * 100) }}%</p>
				<p>Critical multiplier: {{ Math.round(ivan.criticalMultiplier * 100) }}%</p>
				<p>Evade chance: {{ Math.round(ivan.evadeChance * 100) }}%</p>
				<p>Defence: {{ Math.round(ivan.defence) }} ({{ Math.round(ivan.block * 100) }}%)</p>
				<p>Skills:</p>
				<ul>
					<li
						v-for="skill in Object.keys(ivan.skills)"
						:key="skill"
					>
						{{ skill }}: {{ ivan.skills[skill].level }}
					</li>
				</ul>
			</div>

		</div>
		<SkillEditor v-model="ivan.skills" />
	</div>


</template>

<style lang="scss">
.big-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 48px;
}

.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>
