<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import ArmorComponent from '@/components/FatePrototype/Character/parts/ArmorComponent.vue'
import { storeToRefs } from 'pinia'
import { AppStore } from '@/store/app.store'
import LootCard from '@/components/FatePrototype/LootGenerator/LootCard.vue'
import { Character } from '@/entities/Character'

const character = defineModel<Character>({
	required: true
})
const { savedArmor } = storeToRefs(AppStore())

function addNewArmor(a: Armor) {
	character.value.armor.push(a)
}

function deleteArmor(index: number) {
	character.value.armor = character.value.armor.filter((e, i) => i !== index)
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
					:disabled="!character.isArmorApliable(w)"
					mode="remove"
					:action-text="character.isArmorApliable(w) ? 'Add to inventory' : 'Slot is occupied'"
					@click="addNewArmor(Armor.Copy(w))"
				/>
			</div>
		</div>
		<div class="weapon-editor__list">
			<div
				v-for="(w, i) in character.armor"
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
	</div>
</template>
