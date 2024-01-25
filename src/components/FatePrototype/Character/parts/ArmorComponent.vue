<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { ArmorType } from '@/constants/Armor'
import { CharacterBodySize } from '@/types'
import { BodyPart } from '@/constants/Character'

const armor = defineModel<Armor>({
	required: true
})

function removeSlot(index: number) {
	armor.value.slots = armor.value.slots.filter((_, i) => i !== index)
}
</script>

<template>
	<div
		class="weapon"
		:class="{ 'weapon--disabled': armor.isDisabled }"
	>
		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>
						<input
							v-model="armor.name"
							type="text"
						/>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<label>
							<input
								v-model="armor.isDisabled"
								type="checkbox"
							/>
							Disabled
						</label>
					</td>
				</tr>
				<tr>
					<td>Type</td>
					<td>
						<select v-model="armor.type">
							<template
								v-for="armorType in Object.values(ArmorType)"
								:key="armorType"
							>
								<option
									v-if="Number(armorType) >= 0"
									:value="armorType"
								>
									{{ ArmorType[armorType] }}
								</option>
							</template>
						</select>
					</td>
				</tr>
				<tr>
					<td>Size</td>
					<td>
						<select v-model="armor.size">
							<template
								v-for="armorSize in Object.values(CharacterBodySize)"
								:key="armorSize"
							>
								<option
									v-if="Number(armorSize) >= 0"
									:value="armorSize"
								>
									{{ CharacterBodySize[armorSize] }}
								</option>
							</template>
						</select>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Base defence</td>
					<td>
						<input
							v-model="armor.defence"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						Slots: {{ armor.slots.length ? '' : 'none' }}
						<p class="weapon__slots">
							<button
								v-for="(slot, index) in armor.slots"
								:key="index"
								@click="removeSlot(index)"
							>
								{{ BodyPart[slot] }}
							</button>
						</p>

						<details>
							<summary>Add slots</summary>
							<div class="weapon__slots">
								<template
									v-for="slot in BodyPart"
									:key="slot"
								>
									<button
										v-if="Number(slot) >= 0"
										@click="armor.slots.push(slot)"
									>
										{{ BodyPart[slot] }}
									</button>
								</template>
							</div>
						</details>
					</td>
				</tr>
				<tr>
					<td
						colspan="2"
						align="center"
					>
						<strong> BONUSES / PENALTY </strong>
					</td>
				</tr>
				<tr>
					<td>Defence</td>
					<td>
						<input
							v-model="armor.modifiers.defence"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td>Additional HP</td>
					<td>
						<input
							v-model="armor.modifiers.additionalHealthPoints"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td>Defence multiplier</td>
					<td>
						<input
							v-model="armor.modifiers.defenceMultiplier"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Evade chance</td>
					<td>
						<input
							v-model="armor.modifiers.evadeChance"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Move distance</td>
					<td>
						<input
							v-model="armor.modifiers.moveDistance"
							type="number"
							step="0.5"
						/>
					</td>
				</tr>
				<tr>
					<td>Move distance multiplier</td>
					<td>
						<input
							v-model="armor.modifiers.moveDistanceMultiplier"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped lang="scss">
.weapon {
	border: 1px solid white;
	padding: 16px;
	border-radius: 16px;
	background-color: #ffffff;
	color: black;
	flex-grow: 0;

	&--disabled {
		background-color: #886969;
	}

	&__slots {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		width: 100%;
		flex-grow: 0;
		flex-shrink: 1;

		button {
			flex-grow: 0;
			flex-shrink: 1;
		}
	}
}
table,
td,
td {
	padding: 4px;
}

strong {
	font-weight: bold;
}
</style>
