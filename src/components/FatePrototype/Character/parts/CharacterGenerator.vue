<script setup lang="ts">
import { ref } from 'vue'
import { BODY_SIZE_WEIGHT } from '@/constants/ArmorGenerator'
import { copy, enumKeys, weightSheetToChances } from '@/components/helpers/utils'
import WeightEditor from '@/components/FatePrototype/Character/parts/WeightEditor.vue'
import { CharacterBodySize, LootLevel, WeightSheet } from '@/types'
import { MAX_CHARACTER_LEVEL } from '@/constants/Character'
import { ArmorType } from '@/constants/Armor'
import { Character } from '@/entities/Character'
import CharacterGeneratorService from '@/services/characterGenerator.service'

const emit = defineEmits<{
	generate: [character: Character]
}>()

const bodySizes = ref(copy(BODY_SIZE_WEIGHT))
const armorType = ref<WeightSheet<ArmorType>>([
	[ArmorType.Cloth, 50],
	[ArmorType.Light, 50],
	[ArmorType.Medium, 50],
	[ArmorType.Heavy, 50]
])
const level = ref(1)
const lootLevel = ref(LootLevel.Common)

function generate() {
	const generator = new CharacterGeneratorService({
		level: level.value,
		lootLevel: lootLevel.value,
		sizeWeight: bodySizes.value,
		armorTypeChances: weightSheetToChances(armorType.value)
	})

	emit('generate', generator.generate())
}
</script>

<template>
	<div class="character-gen">
		<div class="character-gen__level">
			<p>Character level</p>
			<input
				v-model.number="level"
				class="loot-generator__level-input"
				type="number"
				:min="1"
				:max="MAX_CHARACTER_LEVEL"
				:step="1"
			/>
			<input
				v-model.number="level"
				class="loot-generator__level-range"
				type="range"
				:min="1"
				:max="MAX_CHARACTER_LEVEL"
				:step="1"
			/>
		</div>
		<label class="character-gen__quality">
			<button
				v-for="quality in enumKeys(LootLevel)"
				:key="quality"
				class="character-gen__quality-button"
				:class="{ 'character-gen__quality-button--selected': LootLevel[quality] === lootLevel }"
				@click="lootLevel = LootLevel[quality]"
			>
				{{ quality }}
			</button>
		</label>
		<div>
			<p>Body Size:</p>
			<WeightEditor
				v-model="bodySizes"
				:enum-type="CharacterBodySize"
			/>
		</div>
		<div>
			<p>Armor Type:</p>
			<WeightEditor
				v-model="armorType"
				:enum-type="ArmorType"
			/>
		</div>
		<button @click="generate">GENERATE!</button>
	</div>
</template>

<style scoped lang="scss">
.character-gen {
	display: flex;
	flex-direction: column;
	gap: 16px;

	&__level {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-bottom: 24px;
	}

	&__level-input {
		width: 100%;
		font-size: 24px;
		text-align: center;
		background-color: transparent;
		color: white;
		border: none;
		border-bottom: 2px solid white;
		margin-bottom: 8px;
	}

	&__level-range {
		width: 100%;
	}

	&__quality {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		margin-bottom: 24px;
	}

	&__quality-button {
		flex-grow: 1;
		border-radius: 8px;
		border: none;
		transition: filter 0.2s ease;

		&:hover {
			filter: brightness(0.8);
		}

		&--selected {
			background-color: #4646da;
			color: white;
		}
	}
}
</style>
