<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterBodySize } from '@/types'
import { Weapon, WeaponQuality } from '@/entities/Weapon'
import { Bow, Sword } from '@/constants/Weapons'
import { reactive, ref, watch } from 'vue'
import { Character } from '@/entities/Character'
import CharacterComponent from './Character/Character.vue'
import { ArmorType } from '@/constants/Armor'
import { BodyPart, EMPTY_SKILL_SET } from '@/constants/Character'
import { copy } from '@/utils'

const bronzeFullSet = {
	name: 'Full Bronze Set',
	size: CharacterBodySize.Medium,
	type: ArmorType.Medium,
	defence: 100,
	slots: [
		BodyPart.Head,
		BodyPart.Jaws,
		BodyPart.Eyes,
		BodyPart.Neck,
		BodyPart.Shoulder,
		BodyPart.Shoulder,
		BodyPart.UpperArm,
		BodyPart.UpperArm,
		BodyPart.Elbow,
		BodyPart.Elbow,
		BodyPart.LowerArm,
		BodyPart.LowerArm,
		BodyPart.Wrist,
		BodyPart.Wrist,
		BodyPart.Fingers,
		BodyPart.Fingers,
		BodyPart.Chest,
		BodyPart.Groin,
		BodyPart.Stomach,
		BodyPart.TopLeg,
		BodyPart.TopLeg,
		BodyPart.Knee,
		BodyPart.Knee,
		BodyPart.LowLeg,
		BodyPart.LowLeg,
		BodyPart.Foot,
		BodyPart.Foot
	]
}

const woodenSword = new Weapon({
	name: 'Wooden Sword',
	quality: WeaponQuality.Garbage,
	type: Sword,
	minDamage: 14,
	maxDamage: 20
})

const bow = new Weapon({
	name: 'Default bow',
	type: Bow,
	quality: WeaponQuality.Common,
	minDamage: 16,
	maxDamage: 24
})

const ivan = reactive(
	new Character({
		name: 'Ivan',
		luck: 1,
		skills: {
			...copy(EMPTY_SKILL_SET)
		},
		slots: [BodyPart.Head],
		weapon: [woodenSword],
		armor: [new Armor(copy(bronzeFullSet))]
	})
)

const ratLord = reactive(
	new Character({
		name: 'RatLord',
		luck: 6,
		skills: {
			...copy(EMPTY_SKILL_SET)
		},
		slots: [BodyPart.Head],
		weapon: [bow],
		armor: [new Armor(copy(bronzeFullSet))]
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
	<div class="big-container">
		<CharacterComponent v-model="ivan" />
		<CharacterComponent v-model="ratLord" />
	</div>
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
