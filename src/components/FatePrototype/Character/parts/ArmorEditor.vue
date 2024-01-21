<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { CharacterBodySize } from '@/types'
import { ArmorType } from '@/constants/Armor'
import ArmorComponent from '@/components/FatePrototype/Character/parts/ArmorComponent.vue'

const armor = defineModel<Armor[]>({
	required: true
})

function addNewArmor() {
	armor.value.push(
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
		<button @click="addNewArmor">NEW ARMOR</button>
	</div>
</template>

<style scoped lang="scss">
.weapon-editor {
	display: flex;
	gap: 24px;
	padding: 24px;
	overflow: auto;

	&__weapon {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex-shrink: 1;
		flex-grow: 0;
		max-width: 500px;
	}

	&__delete {
		background-color: #752d2d;
		color: white;
		height: 24px;
		border-radius: 8px;
		border: none;
	}
}
</style>
