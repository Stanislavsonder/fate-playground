<script setup lang="ts">
import { Weapon, WeaponRange } from '@/entities/Weapon'
import { ALL_WEAPON_TYPES } from '@/constants/Weapons'

const weapon = defineModel<Weapon>({
	required: true
})
</script>

<template>
	<div class="weapon">
		<table>
			<thead>
				<tr>
					<td>Name</td>
					<td>
						<input
							v-model="weapon.name"
							type="text"
						/>
					</td>
				</tr>
				<tr>
					<td>Type</td>
					<td>
						<select v-model="weapon.type">
							<option
								v-for="weaponType in ALL_WEAPON_TYPES"
								:key="weaponType.name"
								:value="weaponType"
							>
								{{ weaponType.name }}
								({{ weaponType.range === WeaponRange.Ranged ? 'ranged' : 'melee' }})
							</option>
						</select>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Min Damage</td>
					<td>
						<input
							v-model="weapon.minDamage"
							type="number"
						/>
					</td>
				</tr>
				<tr>
					<td>Max Damage</td>
					<td>
						<input
							v-model="weapon.maxDamage"
							type="number"
						/>
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
					<td>Dice Result</td>
					<td>
						<input
							v-model="weapon.modifiers.diceResult"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td>Min Damage</td>
					<td>
						<input
							v-model="weapon.modifiers.minDamage"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td>Max Damage</td>
					<td>
						<input
							v-model="weapon.modifiers.maxDamage"
							type="number"
							step="1"
						/>
					</td>
				</tr>
				<tr>
					<td>Critical Chance</td>
					<td>
						<input
							v-model="weapon.modifiers.criticalChance"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Critical Multiplier</td>
					<td>
						<input
							v-model="weapon.modifiers.criticalMultiplier"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Damage Multiplier</td>
					<td>
						<input
							v-model="weapon.modifiers.damageMultiplier"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Hit Chance</td>
					<td>
						<input
							v-model="weapon.modifiers.hitChance"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Evade Chance</td>
					<td>
						<input
							v-model="weapon.modifiers.evadeChance"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Defence</td>
					<td>
						<input
							v-model="weapon.modifiers.defence"
							type="number"
							step="0.1"
						/>
					</td>
				</tr>
				<tr>
					<td>Min distance</td>
					<td>
						<input
							v-model="weapon.modifiers.minDistance"
							type="number"
							step="0.5"
						/>
					</td>
				</tr>
				<tr>
					<td>Min effective distance</td>
					<td>
						<input
							v-model="weapon.modifiers.minEffectiveDistance"
							type="number"
							step="0.5"
						/>
					</td>
				</tr>
				<tr>
					<td>Max effective distance</td>
					<td>
						<input
							v-model="weapon.modifiers.maxEffectiveDistance"
							type="number"
							step="0.5"
						/>
					</td>
				</tr>
				<tr>
					<td>Max distance</td>
					<td>
						<input
							v-model="weapon.modifiers.maxDistance"
							type="number"
							step="0.5"
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
