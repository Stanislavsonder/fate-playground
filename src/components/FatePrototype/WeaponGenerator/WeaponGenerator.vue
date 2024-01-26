<script setup lang="ts">
import { Weapon } from '@/entities/Weapon'
import { ref } from 'vue'
import { generateWeapon } from '@/components/FatePrototype/WeaponGenerator/WeaponGenerator'
import { LootLevel } from '@/types'
import WeaponCard from '@/components/FatePrototype/Character/parts/WeaponCard.vue'
import { AppStore } from '@/store/app.store'

const appStore = AppStore()

const level = ref(1)
const rarity = ref(LootLevel.Common)
const weapons = ref<Weapon[]>([generateWeapon(level.value, rarity.value), generateWeapon(level.value, rarity.value), generateWeapon(level.value, rarity.value)])

function generate() {
	weapons.value = [generateWeapon(level.value, rarity.value), generateWeapon(level.value, rarity.value), generateWeapon(level.value, rarity.value)]
}
</script>

<template>
	<label>
		Level ({{ level }})
		<input
			v-model.number="level"
			type="range"
			min="1"
			max="30"
			step="1"
		/>
	</label>

	<select v-model="rarity">
		<template
			v-for="lootRarity in LootLevel"
			:key="lootRarity"
		>
			<option
				v-if="lootRarity >= 0"
				:value="lootRarity"
			>
				{{ LootLevel[lootRarity] }}
			</option>
		</template>
	</select>
	<button @click="generate">Generate!</button>
	<div class="weapons">
		<WeaponCard
			v-for="weapon in weapons"
			:key="weapon"
			:weapon="weapon"
			action-text="Save to favorites"
			@click="appStore.saveWeapon(Weapon.Copy(weapon))"
		/>
	</div>
</template>

<style scoped lang="scss">
.weapons {
	display: grid;
	gap: 24px;
	grid-template-columns: 1fr 1fr 1fr;
	height: 500px;
	margin: 24px 0;
}

button {
	height: 40px;
	width: 100%;
}
</style>
