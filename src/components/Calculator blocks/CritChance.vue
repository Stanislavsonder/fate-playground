<script setup>
import Block from '@/components/Calculator blocks/Block.vue'
import { computed, ref } from 'vue'

const critSkillModifier = ref(0)
const critOtherModifier = ref(0)
const critWeaponModifier = ref(0)
const critBuffModifier = ref(0)

const critChance = computed(() => {
	return (1 - critSkillModifier.value / 100) * (1 - critOtherModifier.value / 100) * (1 - critWeaponModifier.value / 100) * (1 - critBuffModifier.value / 100)
})
</script>

<template>
	<Block title="Шанс крита">
		<div class="inputs">
			<label>
				Скилл
				<input
					v-model="critSkillModifier"
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
				/>
			</label>
			<label>
				Другие бонусы
				<input
					v-model="critOtherModifier"
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
				/>
			</label>

			<label>
				Оружие
				<input
					v-model="critWeaponModifier"
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
				/>
			</label>

			<label>
				Баффы
				<input
					v-model="critBuffModifier"
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
				/>
			</label>
		</div>

		<p class="armor">{{ Math.round((1 - critChance) * 100) }}%</p>
	</Block>
</template>

<style scoped>
.inputs {
	display: flex;
	justify-content: space-between;

	label,
	input {
		text-align: center;
	}
}
</style>
