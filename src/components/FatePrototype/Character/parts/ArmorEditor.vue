<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterBodySize } from '@/types'
import { ArmorType } from '@/constants/Armor'
import ArmorComponent from '@/components/FatePrototype/Character/parts/ArmorComponent.vue'
import { storeToRefs } from 'pinia'
import { AppStore } from '@/store/app.store'
import ArmorCard from '@/components/FatePrototype/Character/parts/ArmorCard.vue'
import { Weapon } from '@/entities/Weapon'
import LootCard from '@/components/FatePrototype/LootGenerator/LootCard.vue'

const armor = defineModel<Armor[]>({
	required: true
})
const { savedArmor } = storeToRefs(AppStore())

function addNewArmor(a?: Armor) {
	armor.value.push(
		a ||
			new Armor({
				name: 'Unknown armor',
				defence: 0,
				size: CharacterBodySize.Medium,
				type: ArmorType.Medium,
				slots: []
			})
	)
}

function deleteArmor(index: number) {
	armor.value = armor.value.filter((e, i) => i !== index)
}
</script>

<template>
	<div class="weapon-editor">
		<div>
			Favorites:
			<div class="weapon-editor__weapons">
				<LootCard
					v-for="w in savedArmor"
					:key="w"
					:value="w"
					mode="remove"
					action-text="Add to inventory"
					@click="addNewArmor(Armor.Copy(w))"
				/>
			</div>
		</div>
		<div class="weapon-editor__list">
			<div
				v-for="(w, i) in armor"
				:key="w"
				class="weapon-editor__weapon"
			>
				<ArmorComponent :model-value="w" />
				<button
					class="weapon-editor__delete"
					@click="deleteArmor(i)"
				>
					Delete
				</button>
			</div>
		</div>
		<button @click="addNewArmor">NEW ARMOR</button>
	</div>
</template>
