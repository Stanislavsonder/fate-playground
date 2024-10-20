<script setup lang="ts">
import { enumKeys } from '@/helpers/utils'
import { LootLevel } from '@/types'
import { ref } from 'vue'
import { MAX_CHARACTER_LEVEL } from '@/constants/Character'
import LootCard from '@/components/FatePrototype/LootGenerator/LootCard.vue'
import { Weapon } from '@/entities/Weapon'
import { Armor } from '@/entities/Armor'
import WeaponGeneratorService from '@/services/weaponGenerator.service'
import ArmorGeneratorService from '@/services/armorGenerator.service'

const selectedLootLevel = ref(LootLevel.Common)
const selectedLevel = ref(1)
const type = ref<'weapon' | 'armor'>('weapon')
const loot = ref<Armor[] | Weapon[]>([])
const amount = ref(6)

function generateLoot() {
	const Generator = new (type.value === 'weapon' ? WeaponGeneratorService : ArmorGeneratorService)({
		lootLevel: selectedLootLevel.value,
		level: selectedLevel.value
	})
	loot.value = new Array(amount.value).fill(0).map(() => Generator.generate()) as Armor[] | Weapon[]
}
</script>

<template>
	<section class="loot-generator">
		<div class="loot-generator__settings">
			<div>
				<label class="loot-generator__level">
					<span>Loot level </span>
					<input
						v-model.number="selectedLevel"
						class="loot-generator__level-input"
						type="number"
						:min="1"
						:max="MAX_CHARACTER_LEVEL"
						:step="1"
					/>
					<input
						v-model.number="selectedLevel"
						class="loot-generator__level-range"
						type="range"
						:min="1"
						:max="MAX_CHARACTER_LEVEL"
						:step="1"
					/>
				</label>
			</div>
			<div>
				<label class="loot-generator__quality">
					<button
						v-for="quality in enumKeys(LootLevel)"
						:key="quality"
						class="loot-generator__quality-button"
						:class="{ 'loot-generator__quality-button--selected': LootLevel[quality] === selectedLootLevel }"
						@click="selectedLootLevel = LootLevel[quality]"
					>
						{{ quality }}
					</button>
				</label>
				<label class="loot-generator__quality">
					<button
						class="loot-generator__quality-button"
						:class="{ 'loot-generator__quality-button--selected': type === 'weapon' }"
						@click="type = 'weapon'"
					>
						Weapon
					</button>
					<button
						class="loot-generator__quality-button"
						:class="{ 'loot-generator__quality-button--selected': type === 'armor' }"
						@click="type = 'armor'"
					>
						Armor
					</button>
				</label>
			</div>
		</div>
		<div>
			<button
				class="loot-generator__generate"
				@click="generateLoot"
			>
				Generate!
			</button>
		</div>
		<ul class="loot-generator__list">
			<li
				v-for="entity in loot"
				:key="entity"
				class="loot-generator__loot"
			>
				<LootCard
					:value="entity"
					mode="save"
				/>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
.loot-generator {
	&__title {
		text-align: center;
		margin-bottom: 20px;
	}

	&__settings {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	&__level {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-bottom: 24px;
	}

	&__level-input {
		max-width: 150px;
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
		height: 40px;
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

	&__generate {
		height: 40px;
		width: 100%;
		border-radius: 8px;
		background-color: #bb5656;
		color: white;
		border: none;
		transition: filter 0.2s ease;

		&:hover {
			filter: brightness(0.8);
		}
	}

	&__list {
		margin: 24px 0;
		display: grid;
		justify-content: space-between;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 1fr;
		gap: 16px;
	}
}
</style>
