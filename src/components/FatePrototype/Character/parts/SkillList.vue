<script setup lang="ts">
import { Skills } from '@/types'
import { capitalizeFirstLetter } from '@/helpers/utils'

const { skills } = defineProps<{
	skills: Skills
}>()
</script>

<template>
	<ul class="skill-list">
		<li
			v-for="skill in Object.keys(
				Object.fromEntries(
					Object.entries(skills)
						.filter(value => Boolean(value[1].level))
						.toSorted((a, b) => b[1].level - a[1].level)
				)
			)"
			:key="skill"
			class="skill"
		>
			<span>
				{{ skills[skill].level }}
			</span>
			<span>
				{{ capitalizeFirstLetter(skill) }}
			</span>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.skill-list {
	position: absolute;
	right: 16px;
	top: 50px;
}
.skill {
	display: grid;
	grid-template-columns: 20px 1fr;
}
</style>
