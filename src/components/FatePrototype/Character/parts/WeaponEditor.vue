<script setup lang="ts">
import { Weapon, LootQuality } from '@/entities/Weapon'
import WeaponComponent from '@/components/FatePrototype/Character/parts/WeaponComponent.vue'
import { Knuckles } from '@/constants/Weapons'
import { AppStore } from '@/store/app.store'
import { storeToRefs } from 'pinia'
import WeaponCard from '@/components/FatePrototype/Character/parts/WeaponCard.vue'

const weapon = defineModel<Weapon[]>({
	required: true
})

const { savedWeapon } = storeToRefs(AppStore())

function addNewWeapon(w?: Weapon) {
	weapon.value.push(
		w ||
			new Weapon({
				name: 'Fists',
				type: Knuckles,
				minDamage: 0,
				maxDamage: 0,
				quality: LootQuality.Common
			})
	)
}

function deleteWeapon(index: number) {
	if (weapon.value.length === 1) {
		weapon.value = [
			new Weapon({
				name: 'Fists',
				type: Knuckles,
				minDamage: 0,
				maxDamage: 0,
				quality: LootQuality.Common
			})
		]
		return
	}
	weapon.value = weapon.value.filter((e, i) => i !== index)
}
</script>

<template>
	<div class="weapon-editor">
		<div>
			Favorites:
			<div class="weapon-editor__weapons">
				<WeaponCard
					v-for="w in savedWeapon"
					:key="w"
					:weapon="w"
					action-text="Add to inventory"
					@click="addNewWeapon(Weapon.Copy(w))"
				/>
			</div>
		</div>
		<div class="weapon-editor__list">
			<div
				v-for="(w, i) in weapon"
				:key="w"
				class="weapon-editor__weapon"
			>
				<WeaponComponent :model-value="w" />
				<button
					class="weapon-editor__delete"
					@click="deleteWeapon(i)"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>
