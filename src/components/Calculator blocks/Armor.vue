<script setup>
import Block from '@/components/Calculator blocks/Block.vue'
import { computed, ref } from 'vue'
import { Armor } from '@/entities/Armor'

const armor = ref(0)

const percent = computed(() => Armor.BlockPercentage(armor.value))
</script>

<template>
	<Block title="Броня и процент блока">
		<p class="armor">{{ armor }}</p>
		<input
			v-model="armor"
			class="input"
			type="range"
			min="-100"
			max="100"
			step="1"
		/>
		<p class="armor">{{ Math.round(percent * 100) }}%</p>
	</Block>
</template>

<style scoped>
.input {
	width: 100%;
}

.armor {
	text-align: center;
}
</style>
