<script setup lang="ts">
import { Armor } from '@/entities/Armor'
import { Weapon } from '@/entities/Weapon'
import LootInventoryCard from '@/components/FatePrototype/LootGenerator/LootInventoryCard.vue'
import { AppStore } from '@/store/app.store'
import { Character } from '@/entities/Character'
import { onUpdated } from 'vue'

const character = defineModel<Character>({
	required: true
})

const appStore = AppStore()
const size = 16

function addToInventory(item: Armor | Weapon): void {
	const itemCopy = item instanceof Armor ? Armor.Copy(item) : Weapon.Copy(item)
	character.value.addToInventory(itemCopy)
}

function removeFavoriteItem(item: Armor | Weapon): void {
	if (item instanceof Armor) {
		appStore.removeArmor(item)
	} else {
		appStore.removeWeapon(item)
	}
}

function removeFromInventory(item: Armor | Weapon): void {
	character.value.removeFromInventory(item)
}

function equip(item: Armor | Weapon): void {
	if (item instanceof Armor) {
		character.value.equipArmor(item)
	} else {
		character.value.equipWeapon(item)
	}
}

function unequip(item: Armor | Weapon): void {
	if (item instanceof Armor) {
		character.value.unequipArmor(item)
	} else {
		character.value.unequipWeapon(item)
	}
}

function isEnabled(item: Armor | Weapon): boolean {
	if (item instanceof Armor) {
		return character.value.isArmorApliable(item)
	} else {
		return character.value.isWeaponApliable(item)
	}
}
</script>

<template>
	<div class="inventory">
		<h2>Weapon</h2>
		<ul class="inventory__grid">
			<li
				v-for="weapon in character.weapon"
				:key="weapon"
				class="inventory__item"
			>
				<LootInventoryCard
					:value="weapon"
					action-text="Unequip"
					action-enabled
					@click="unequip(weapon)"
				/>
			</li>
		</ul>

		<h2>Armor</h2>
		<ul class="inventory__grid">
			<li
				v-for="armor in character.armor"
				:key="armor"
				class="inventory__item"
			>
				<LootInventoryCard
					:value="armor"
					action-text="Unequip"
					action-enabled
					@click="unequip(armor)"
				/>
			</li>
		</ul>

		<h2>Inventory</h2>
		<ul class="inventory__grid">
			<li
				v-for="(_, index) in new Array(size).fill(0)"
				:key="index"
				class="inventory__item"
			>
				<LootInventoryCard
					v-if="index < character.inventory.length"
					:value="character.inventory[index]"
					:action-text="isEnabled(character.inventory[index]) ? 'Equip' : 'Occupied'"
					:action-enabled="isEnabled(character.inventory[index])"
					@click="equip(character.inventory[index])"
					@remove="removeFromInventory(character.inventory[index])"
				/>
			</li>
		</ul>
		<h2>Favorites</h2>
		<ul class="inventory__grid">
			<li
				v-for="value in appStore.savedWeapon"
				:key="value"
				class="inventory__item"
			>
				<LootInventoryCard
					:value="value"
					action-text="Add"
					action-enabled
					@click="addToInventory(value)"
					@remove="removeFavoriteItem(value)"
				/>
			</li>
			<li
				v-for="value in appStore.savedArmor"
				:key="value"
				class="inventory__item"
			>
				<LootInventoryCard
					:value="value"
					action-text="Add"
					action-enabled
					@click="addToInventory(value)"
					@remove="removeFavoriteItem(value)"
				/>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.inventory {
	margin-bottom: 24px;

	&__grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-top: 8px;
	}

	&__item {
		position: relative;
		border: 1px solid black;
		background-color: rgba(255, 255, 255, 0.1);
		aspect-ratio: 1;
		border-radius: 4px;
		padding: 8px;
	}
}
</style>
