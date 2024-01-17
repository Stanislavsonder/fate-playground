<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterSize } from '@/types'
import { Weapon, WeaponQuality } from '@/entities/Weapon'
import { Sword } from '@/constants/Weapons'
import { reactive, ref } from 'vue'
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
	name: 'Glove of woolf',
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
		wounds: [],
		size: CharacterSize.Medium,
		slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
		skills: copy(EMPTY_SKILL_SET),
		weapon: woodenSword,
		armor: [bronzeHelmet, glove]
	})
)

const bonus = ref(false)
const penalty = ref(false)
</script>

<template>
	<details>
		<summary>
			{{ bronzeHelmet.name }}
		</summary>
		<p>Defence: {{ bronzeHelmet.baseDefence }} +{{ bronzeHelmet.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>
		<p>Evade chance: {{ bronzeHelmet.evadeChance }}</p>
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
	<SkillEditor v-model="ivan.skills" />
</template>

<style lang="scss"></style>
