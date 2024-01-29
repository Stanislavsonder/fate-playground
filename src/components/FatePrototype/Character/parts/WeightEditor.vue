<script setup lang="ts" generic="T extends string | number">
import { WeightSheet } from '@/types'

defineProps<{
	enumType?: any
}>()

const weight = defineModel<WeightSheet<T>>({
	required: true
})
</script>

<template>
	<ul class="weight-editor">
		<li
			v-for="value in weight"
			:key="value"
			class="weight-editor__entity"
		>
			<label for="weight">{{ enumType ? enumType[value[0]] : value[0] }}</label>
			<input
				id="weight"
				v-model.number="value[1]"
				type="range"
				min="0"
				max="100"
			/>
			<span>{{ value[1] }}</span>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.weight-editor {
	padding: 8px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 8px;

	&__entity {
		display: grid;
		grid-template-columns: 2fr 3fr 1fr;
	}

	label {
		text-align: right;
		padding-right: 8px;
	}
	span {
		padding-left: 8px;
	}
}
</style>
