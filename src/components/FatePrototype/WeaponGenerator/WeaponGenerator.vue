<script setup lang="ts">
import { Weapon } from '@/entities/Weapon'
import { ref } from 'vue'
import { LootLevel } from '@/types'
import WeaponCard from '@/components/FatePrototype/Character/parts/WeaponCard.vue'
import { AppStore } from '@/store/app.store'
import WeaponGeneratorService from '@/services/weaponGenerator.service'

const appStore = AppStore()

const level = ref(1)
const rarity = ref(LootLevel.Common)
const generator = new WeaponGeneratorService({
	level: level.value,
	lootLevel: rarity.value
})
const weapons = ref<Weapon[]>([generator.generate(), generator.generate(), generator.generate()])

function generate() {
	const generator = new WeaponGeneratorService({
		level: level.value,
		lootLevel: rarity.value
	})

	weapons.value = [generator.generate(), generator.generate(), generator.generate()]
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
