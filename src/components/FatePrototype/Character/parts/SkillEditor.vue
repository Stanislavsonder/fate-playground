<script setup lang="ts">
import { Skills } from '@/types'
import { SKILL_EXPERIENCE_CUP } from '@/constants/Character'

const skills = defineModel<Skills>({
	required: true
})
</script>

<template>
	<div class="skill-editor">
		<ul class="skill-editor__list">
			<li
				v-for="skill in Object.keys(skills)"
				:key="skill"
				class="skill"
			>
				<span class="skill__name">{{ skill }}</span>
				<label class="skill__level">
					<span>Level</span>
					<input
						v-model="skills[skill].level"
						min="0"
						step="1"
						max="10"
						type="number"
					/>
				</label>
				<label class="skill__level">
					<span>Experience</span>
					<input
						v-model="skills[skill].experience"
						min="0"
						:max="SKILL_EXPERIENCE_CUP[skills[skill].level - 1] || 0"
						step="1"
						type="number"
					/>
				</label>
				<span> / {{ SKILL_EXPERIENCE_CUP[skills[skill].level - 1] || 0 }} exp. </span>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.skill-editor {
	background-color: #181818;
	color: white;
	border-radius: 24px;
	padding: 24px;

	&__list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
}

.skill {
	display: grid;
	grid-template-columns: 3fr 2fr 2fr 1fr;
	gap: 4px;
	align-items: center;
	padding: 4px 16px;
	border: 1px solid white;
	border-radius: 8px;

	&__name {
		text-transform: uppercase;
		font-weight: bold;
	}

	&__level {
		display: flex;
		flex-direction: column;
		text-align: center;

		input {
			text-align: center;
			background-color: transparent;
			border: none;
			color: white;
			font-weight: bold;
			border-bottom: 2px solid white;
		}
	}
}
</style>
