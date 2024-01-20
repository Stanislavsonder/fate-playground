<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterSize } from '@/types'
import { Weapon, WeaponQuality } from '@/entities/Weapon'
import { Bow, Fist, Sword } from '@/constants/Weapons'
import { reactive, ref, watch } from 'vue'
import { Character } from '@/entities/Character'
import CharacterComponent from './Character/Character.vue'
import { ArmorSlot, ArmorType } from '@/constants/Armor'
import { EMPTY_SKILL_SET } from '@/constants/Character'
import { copy } from '@/utils'

const bronzeHelmetProps = {
	name: 'Bronze cuirass',
	size: CharacterSize.Medium,
	type: ArmorType.Medium,
	defence: 100,
	slots: [
		ArmorSlot.TopHead,
		ArmorSlot.Mask,
		ArmorSlot.Ears,
		ArmorSlot.Eyes,
		ArmorSlot.Nose,
		ArmorSlot.Neck,
		ArmorSlot.Shoulder,
		ArmorSlot.Shoulder,
		ArmorSlot.TopArm,
		ArmorSlot.TopArm,
		ArmorSlot.Elbow,
		ArmorSlot.Elbow,
		ArmorSlot.LowArm,
		ArmorSlot.LowArm,
		ArmorSlot.Wrist,
		ArmorSlot.Wrist,
		ArmorSlot.Fingers,
		ArmorSlot.Fingers,
		ArmorSlot.Chest,
		ArmorSlot.Back,
		ArmorSlot.Belt,
		ArmorSlot.Groin,
		ArmorSlot.Stomach,
		ArmorSlot.TopLeg,
		ArmorSlot.TopLeg,
		ArmorSlot.Knee,
		ArmorSlot.Knee,
		ArmorSlot.LowLeg,
		ArmorSlot.LowLeg,
		ArmorSlot.Foot,
		ArmorSlot.Foot
	]
}

const glove = new Armor({
	name: 'Glove of wolf',
	size: CharacterSize.Medium,
	type: ArmorType.Light,
	defence: 3,
	slots: [ArmorSlot.Fingers, ArmorSlot.Wrist],
	modifiers: {
		moveDistance: +2,
		evadeChance: 0,
		defence: -1
	}
})

const boots = new Armor({
	name: 'Boots of kek',
	size: CharacterSize.Small,
	type: ArmorType.Light,
	defence: 4,
	slots: [ArmorSlot.Foot, ArmorSlot.Foot, ArmorSlot.Fingers, ArmorSlot.Fingers],
	modifiers: {
		moveDistance: +5,
		evadeChance: 0.1,
		defence: 1
	}
})

const woodenSword = new Weapon({
	name: 'Wooden Sword',
	quality: WeaponQuality.Garbage,
	type: Sword,
	minDamage: 0,
	maxDamage: 8,
	criticalChance: 0.5,
	criticalMultiplier: 0,
	hitChance: 1,
	modifiers: {
		minDamage: 15,
		maxDamage: 20
	}
})

const ivan = reactive(
	new Character({
		name: 'Ivan',
		luck: 1,
		skills: {
			...copy(EMPTY_SKILL_SET),
			...{
				fight: { level: 3, experience: 0 },
				agility: { level: 1, experience: 0 },
				constitution: { level: 2, experience: 0 }
			}
		},
		size: CharacterSize.Medium,
		slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
		weapon: [woodenSword],
		armor: [new Armor(copy(bronzeHelmetProps))]
	})
)

const bow = new Weapon({
	name: 'Default bow',
	type: Bow,
	minDamage: 10,
	maxDamage: 20,
	hitChance: 0,
	criticalChance: 0.2,
	criticalMultiplier: 0,
	quality: WeaponQuality.Common
})

const fist = new Weapon({
	name: 'Fist',
	type: Fist,
	minDamage: 0,
	maxDamage: 3,
	hitChance: 0,
	criticalChance: 0.3,
	criticalMultiplier: 0,
	quality: WeaponQuality.Common
})

const ratLord = reactive(
	new Character({
		name: 'RatLord',
		luck: 6,
		skills: {
			...copy(EMPTY_SKILL_SET),
			...{
				perception: { level: 4, experience: 0 },
				agility: { level: 3, experience: 0 },
				deceit: { level: 3, experience: 0 },
				craft: { level: 2, experience: 0 },
				theft: { level: 2, experience: 0 },
				stealth: { level: 2, experience: 0 },
				shooting: { level: 1, experience: 0 },
				constitution: { level: 2, experience: 0 },
				knowledge: { level: 1, experience: 0 },
				will: { level: 1, experience: 0 }
			}
		},
		size: CharacterSize.Small,
		slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
		weapon: [fist, bow],
		armor: [new Armor(copy(bronzeHelmetProps))]
	})
)

const bonus = ref(false)
const penalty = ref(false)

watch(bonus, value => {
	ivan.setWeaponBonus(value)
})

watch(penalty, value => {
	ivan.setWeaponPenalty(value)
})
</script>

<template>
	<div class="big-container">
		<CharacterComponent v-model="ivan" />

		<CharacterComponent v-model="ratLord" />
		<!--		<div class="container">-->
		<!--			<details>-->
		<!--				<summary>-->
		<!--					{{ bronzeHelmet.name }}-->
		<!--				</summary>-->
		<!--				<p>Defence: {{ bronzeHelmet.baseDefence }} +{{ bronzeHelmet.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>-->
		<!--				<p>Evade chance: {{ bronzeHelmet.evadeChance }}</p>-->
		<!--			</details>-->
		<!--			<details>-->
		<!--				<summary>-->
		<!--					{{ glove.name }}-->
		<!--				</summary>-->
		<!--				<p>Defence: {{ glove.baseDefence }} {{ glove.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>-->
		<!--				<p>Evade chance: {{ glove.evadeChance }}</p>-->
		<!--			</details>-->

		<!--			<details>-->
		<!--				<summary>-->
		<!--					{{ woodenSword.name }}-->
		<!--				</summary>-->
		<!--				<p>Type: {{ woodenSword.type.name }}</p>-->
		<!--				<p>Distance: {{ woodenSword.type.minDistance }} - {{ woodenSword.type.maxDistance }} ft</p>-->
		<!--				<p>Damage: {{ woodenSword.stats(bonus, penalty).minDamage }} - {{ woodenSword.stats(bonus, penalty).maxDamage }}</p>-->
		<!--				<p>-->
		<!--					Effective Distance:-->
		<!--					{{ woodenSword.type.getMinEffectiveDistance(bonus, penalty) }}-->
		<!--					- -->
		<!--					{{ woodenSword.type.getMaxEffectiveDistance(bonus, penalty) }} ft.-->
		<!--				</p>-->
		<!--				<label>-->
		<!--					<input-->
		<!--						v-model="bonus"-->
		<!--						type="checkbox"-->
		<!--					/>-->
		<!--					Activate weapon bonus-->
		<!--				</label>-->
		<!--				<br />-->
		<!--				<label>-->
		<!--					<input-->
		<!--						v-model="penalty"-->
		<!--						type="checkbox"-->
		<!--					/>-->
		<!--					Activate weapon penalty-->
		<!--				</label>-->
		<!--				<p>{{ woodenSword.type.stats(bonus, penalty) }}</p>-->
		<!--				<p>{{ woodenSword.stats(bonus, penalty) }}</p>-->
		<!--			</details>-->

		<!--			<div>-->
		<!--				<h2>-->
		<!--					{{ ivan.name }}-->
		<!--				</h2>-->
		<!--				<p>Weapon: {{ ivan.weapon.name }}</p>-->
		<!--				<p>Armor: {{ ivan.armor.map(e => e.name).join(', ') }}</p>-->
		<!--				<p>Max HP: {{ ivan.maxHealthPoints }}</p>-->
		<!--				<p>Current HP: {{ ivan.currenHealthPoints }}</p>-->
		<!--				<p>Damage: {{ Math.round(ivan.minDamage) }} - {{ Math.round(ivan.maxDamage) }}</p>-->
		<!--				<p>Hit chance: {{ Math.round(ivan.hitChance * 100) }}%</p>-->
		<!--				<p>Critical chance: {{ Math.round(ivan.criticalChance * 100) }}%</p>-->
		<!--				<p>Critical multiplier: {{ Math.round(ivan.criticalMultiplier * 100) }}%</p>-->
		<!--				<p>Evade chance: {{ Math.round(ivan.evadeChance * 100) }}%</p>-->
		<!--				<p>Defence: {{ Math.round(ivan.defence) }} ({{ Math.round(ivan.block * 100) }}%)</p>-->
		<!--				<p>Skills:</p>-->
		<!--				<ul>-->
		<!--					<li-->
		<!--						v-for="skill in Object.keys(ivan.skills)"-->
		<!--						:key="skill"-->
		<!--					>-->
		<!--						{{ skill }}: {{ ivan.skills[skill].level }}-->
		<!--					</li>-->
		<!--				</ul>-->
		<!--			</div>-->

		<!--		</div>-->
		<!--		<SkillEditor v-model="ivan.skills" />-->
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
