<script setup lang="ts">
import { Weapon } from '@/entities/Weapon'
import { ref } from 'vue'
import { LootLevel } from '@/types'
import WeaponCard from '@/components/FatePrototype/Character/parts/WeaponCard.vue'
import { AppStore } from '@/store/app.store'
import WeaponGeneratorService from '@/services/weaponGenerator.service'
import ArmorGeneratorService from '@/services/armorGenerator.service'
import { Armor } from '@/entities/Armor'
import ArmorCard from '@/components/FatePrototype/Character/parts/ArmorCard.vue'

const appStore = AppStore()

const level = ref(1)
const rarity = ref(LootLevel.Common)
const generator = new ArmorGeneratorService({
	level: level.value,
	lootLevel: rarity.value
})
const armors = ref<Armor[]>([generator.generate(), generator.generate(), generator.generate()])

function generate() {
	const generator = new ArmorGeneratorService({
		level: level.value,
		lootLevel: rarity.value
	})

	armors.value = [generator.generate(), generator.generate(), generator.generate()]
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
		<ArmorCard
			v-for="armor in armors"
			:key="armor"
			:armor="armor"
			action-text="Save to favorites"
			@click="appStore.saveArmor(Armor.Copy(armor))"
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
