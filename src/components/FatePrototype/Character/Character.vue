<script setup lang="ts">
import { Character } from '@/entities/Character'
import Stats from '@/components/FatePrototype/Character/parts/Stats.vue'
import RollAttack from '@/components/FatePrototype/Character/parts/RollAttack.vue'
import RollHit from '@/components/FatePrototype/Character/parts/RollHit.vue'
import RollEvade from '@/components/FatePrototype/Character/parts/RollEvade.vue'
import { ref } from 'vue'
import SkillEditor from '@/components/FatePrototype/Character/parts/SkillEditor.vue'
import ModalWindow from '@/components/FatePrototype/ModalWindow.vue'
import WeaponEditor from '@/components/FatePrototype/Character/parts/WeaponEditor.vue'
import ArmorEditor from '@/components/FatePrototype/Character/parts/ArmorEditor.vue'

const character = defineModel<Character>({
	required: false,
	default: () => new Character({ name: 'Unknown character' })
})

const hp = ref(0)

const isSkillsOpen = ref(false)
const isWeaponOpen = ref(false)
const isArmorOpen = ref(false)

function healDamage() {
	if (hp.value >= 0) {
		character.value.heal(hp.value)
	} else {
		character.value.hit(-hp.value)
	}
}
</script>

<template>
	<ModalWindow v-model="isWeaponOpen">
		<WeaponEditor v-model="character.weapon" />
	</ModalWindow>
	<ModalWindow v-model="isArmorOpen">
		<ArmorEditor v-model="character.armor" />
	</ModalWindow>
	<section class="character">
		<nav class="character__edit-buttons">
			<button
				class="character__edit-button"
				@click="isSkillsOpen = true"
			>
				Edit skills
			</button>
			<button
				class="character__edit-button"
				@click="isWeaponOpen = true"
			>
				Edit weapons
			</button>
			<button
				class="character__edit-button"
				@click="isArmorOpen = true"
			>
				Edit armor
			</button>
		</nav>
		<nav>
			<label>
				<input
					v-model="hp"
					type="number"
				/>
				<button @click="healDamage">Heal / Damage</button>
			</label>
		</nav>
		<Stats :character="character" />
		<RollHit :character="character" />
		<RollEvade :character="character" />
		<RollAttack :character="character" />
		<ModalWindow v-model="isSkillsOpen">
			<SkillEditor v-model="character.skills" />
		</ModalWindow>
	</section>
</template>

<style scoped lang="scss">
.character {
	&__edit-buttons {
		display: flex;
		gap: 8px;
	}
}
</style>
