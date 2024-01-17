<script setup lang="ts">
import Block from '@/components/Calculator blocks/Block.vue'
import { computed } from 'vue'

const props = defineProps<{
	miss: number
	hit: number
}>()

const resultChance = computed(() => {
	return (1 - props.hit) * props.miss
})
</script>

<template>
	<Block title="Итоговый шанс попадения">
		<div>{{ resultChance * 100 }}%</div>
	</Block>
</template>
