<script setup lang="ts">
import Block from '@/components/Calculator blocks/Block.vue'
import { computed, ref } from 'vue'

const emit = defineEmits<{
	'update:modelValue': [number]
}>()

const missSkillModifier = ref(0)
const missOtherModifier = ref(0)
const missArmorModifier = ref(0)
const missBuffModifier = ref(0)

const missChance = computed(() => {
	const tmp =
		(1 - missSkillModifier.value / 100) * (1 - missOtherModifier.value / 100) * (1 - missArmorModifier.value / 100) * (1 - missBuffModifier.value / 100)
	emit('update:modelValue', tmp)
	return tmp
})
</script>

<template>
	<Block title="Шанс уклонения">
		<div class="inputs">
			<label>
				Скилл
				<input
					v-model="missSkillModifier"
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
					v-model="missOtherModifier"
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
				/>
			</label>

			<label>
				Броня
				<input
					v-model="missArmorModifier"
					class="input"
					type="number"
					min="-100"
					max="100"
					step="1"
				/>
			</label>

			<label>
				Баффы
				<input
					v-model="missBuffModifier"
					class="input"
					type="number"
					min="-100"
					max="100"
					step="1"
				/>
			</label>
		</div>

		<p class="armor">{{ Math.round((1 - missChance) * 100) }}%</p>
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
