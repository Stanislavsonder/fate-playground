<script setup>
import Block from "@/components/Calculator blocks/Block.vue";
import {computed, ref} from "vue";

const emit = defineEmits()

const baseChance = ref(100)
const distanceModifier = ref(0)
const buffModifier = ref(0)

const hitChance = computed(() => {
	const tmp  =  (2 - baseChance.value / 100) - ((1 - distanceModifier.value / 100)  * (1 - buffModifier.value / 100))
	emit('update:modelValue', tmp)
	return tmp

})

</script>

<template>
<Block title="Шанс попадания">
		<div class="inputs">
			<label>
				Базовый модификатор попадания
				<input
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
					v-model="baseChance">
			</label>
			<label>
				Модификатор расстояния
				<input
					class="input"
					type="number"
					min="0"
					max="100"
					step="1"
					v-model="distanceModifier">
			</label>
			<label>
				Баффы
				<input
					class="input"
					type="number"
					min="-100"
					max="100"
					step="1"
					v-model="buffModifier">
			</label>


		</div>

		<p class="armor">
			{{ Math.round((1 - hitChance) * 100) }}%
		</p>
</Block>
</template>

<style scoped>
.inputs {
	display: flex;
	justify-content: space-between;


	label, input {
		text-align: center;
	}
}
</style>
