<script setup lang="ts">
import { Weapon, WeaponQuality } from '@/entities/Weapon'
import WeaponComponent from '@/components/FatePrototype/Character/parts/WeaponComponent.vue'
import { Fist } from '@/constants/Weapons'

const weapon = defineModel<Weapon[]>({
	required: true
})

function addNewWeapon() {
	weapon.value.push(
		new Weapon({
			name: 'Unknown weapon',
			type: Fist,
			minDamage: 0,
			maxDamage: 0,
			criticalChance: 0,
			criticalMultiplier: 1,
			hitChance: 0,
			quality: WeaponQuality.Common
		})
	)
}

function deleteWeapon(index: number) {
	if (weapon.value.length === 1) {
		weapon.value = [
			new Weapon({
				name: 'Unknown weapon',
				type: Fist,
				minDamage: 0,
				maxDamage: 0,
				criticalChance: 0,
				criticalMultiplier: 1,
				hitChance: 0,
				quality: WeaponQuality.Common
			})
		]
		return
	}
	weapon.value = weapon.value.filter((e, i) => i !== index)
}
</script>

<template>
	<div class="weapon-editor">
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
		<button @click="addNewWeapon">NEW WEAPON</button>
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
		flex-shrink: 0;
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
