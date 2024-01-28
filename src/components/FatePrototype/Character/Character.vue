<script setup lang="ts">
import { Character } from '@/entities/Character'
import Stats from '@/components/FatePrototype/Character/parts/Stats.vue'
import RollAttack from '@/components/FatePrototype/Character/parts/RollAttack.vue'
import RollHit from '@/components/FatePrototype/Character/parts/RollHit.vue'
import RollEvade from '@/components/FatePrototype/Character/parts/RollEvade.vue'
import { ref } from 'vue'
import SkillEditor from '@/components/FatePrototype/Character/parts/SkillEditor.vue'
import ModalWindow from '@/components/FatePrototype/ModalWindow.vue'
import { BodyPart } from '@/constants/Character'
import Inventory from '@/components/FatePrototype/Character/parts/Inventory.vue'

const character = defineModel<Character>({
	required: true
})

const hp = ref(0)
const isSkillsOpen = ref(false)

function healDamage() {
	if (hp.value >= 0) {
		character.value.heal(hp.value)
	} else {
		character.value.hit(-hp.value)
	}
}
</script>

<template>
	<section class="character">
		<nav class="character__edit-buttons">
			<button
				class="character__edit-button"
				@click="isSkillsOpen = true"
			>
				Edit skills
			</button>
			<label>
				<input
					v-model="hp"
					type="number"
				/>
				<button @click="healDamage">Heal / Damage</button>
			</label>
		</nav>
		<Stats :character="character" />
		<p>
			<label>
				<input
					v-model="character.isWeaponAdvantageApplied"
					type="checkbox"
				/>
				Weapon advantage
			</label>
		</p>
		<p>
			<label>
				<input
					v-model="character.isWeaponDisadvantageApplied"
					type="checkbox"
				/>
				Weapon disadvantage
			</label>
		</p>
		<p>
			<span class="character__slots character__slots--free">
				{{ character.freeArmorSlots.map(e => BodyPart[e]).join(', ') }}
			</span>
			<br />
			<span class="character__slots character__slots--occupied">
				{{ character.occupiedArmorSlots.map(e => BodyPart[e]).join(', ') }}
			</span>
		</p>
		<RollHit :character="character" />
		<RollEvade :character="character" />
		<RollAttack :character="character" />
		<Inventory v-model="character" />

		<ModalWindow v-model="isSkillsOpen">
			<SkillEditor v-model="character.skills" />
		</ModalWindow>
	</section>
</template>

<style scoped lang="scss">
.character {
	background-color: rgba(255, 255, 255, 0.1);
	padding: 16px;
	border-radius: 8px;

	&__edit-buttons {
		display: flex;
		gap: 8px;
	}

	&__slots {
		&--occupied {
			color: red;
		}
	}
}
</style>
