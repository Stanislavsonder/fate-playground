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

const bronzeFullSet = {
	name: 'Full Bronze Set',
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
		armor: [new Armor(copy(bronzeFullSet))]
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
		armor: [new Armor(copy(bronzeFullSet))]
	})
)

const range = ref(10)

watch(range, value => {
	ivan.currentDistance = value
	ratLord.currentDistance = value
})
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
				max="200"
				step="1"
			/>
			<input
				v-model="range"
				type="range"
				min="0"
				max="200"
				step="0.1"
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

		input {
			background-color: transparent;
			border: none;
			border-bottom: 2px solid white;
			color: white;
			text-align: center;
		}
	}
}
</style>
