<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { BODY_PART_IMAGES, BodyPart, DEFAULT_HUMAN_BODY } from '@/constants/Character'
import { CharacterBody } from '@/types'
import { copy } from '@/utils'
import { computed } from 'vue'

const body = defineModel<CharacterBody>({
	required: false,
	default: () => copy(DEFAULT_HUMAN_BODY)
})

const { current } = useMagicKeys()

const percentage = computed(() => {
	return body.value.parts.reduce((a, b) => a + b.size, 0)
})

function clear() {
	body.value.parts = []
}

function addBodyPart(slot: BodyPart) {
	body.value.parts.push({
		size: 0.1,
		part: slot,
		top: 50,
		left: 50,
		angle: 0
	})
}

function startDragging(event: DragEvent, i: number) {
	const style = window.getComputedStyle(event.target as HTMLElement)
	event.dataTransfer?.setData(
		'text/plain',
		parseInt(style.getPropertyValue('left'), 10) - event.clientX + ',' + (parseInt(style.getPropertyValue('top'), 10) - event.clientY) + ',' + i
	)
}

function stopDragging(event: DragEvent) {
	const [x, y, index]: [string, string, string] = event.dataTransfer?.getData('text/plain').split(',') as unknown as [string, string, string]
	body.value.parts[+index].left = event.clientX + parseInt(x, 10)
	body.value.parts[+index].top = event.clientY + parseInt(y, 10)
}

function scrollElement(event: WheelEvent, index: number) {
	if (current.has('control')) {
		const value = current.has('shift') ? 30 : 1
		const delta = event.deltaY <= 0 ? value : -value
		body.value.parts[index].angle = (body.value.parts[index].angle + delta) % 360

		return
	}
	const value = current.has('shift') ? 0.005 : 0.0005
	const delta = event.deltaY <= 0 ? value : -value
	body.value.parts[index].size = Math.max(Math.min(1, body.value.parts[index].size + delta), 0)
}

function remove(index: number) {
	body.value.parts = body.value.parts.filter((_, i) => i !== index)
}
</script>

<template>
	<div class="builder__body-parts">
		Add body part:
		{{ [...current].join(', ') }}
		<p>
			<button @click="clear">Clear</button>
		</p>
		<div class="builder__buttons">
			<template
				v-for="bodyPart in BodyPart"
				:key="bodyPart"
			>
				<button
					v-if="bodyPart >= 0"
					class="builder__button"
					@click="addBodyPart(bodyPart)"
				>
					{{ BodyPart[bodyPart] }}
				</button>
			</template>
		</div>
	</div>
	<p
		class="builder__info"
		:class="{
			'builder__info--warn': Math.fround(percentage * 100) > 100
		}"
	>
		{{ (percentage * 100).toFixed(2) }}%
	</p>
	<div
		class="builder__body"
		@dragover.prevent
		@drop.prevent="stopDragging"
	>
		<div
			v-for="(part, index) in body.parts"
			:key="index"
			draggable="true"
			class="builder__body-part"
			:style="{
				top: part.top + 'px',
				left: part.left + 'px',
				padding: part.size * 100 + 'px',
				backgroundImage: `url(${BODY_PART_IMAGES[part.part]})`,
				rotate: part.angle + 'deg'
			}"
			@dragstart="e => startDragging(e, index)"
			@wheel.prevent="e => scrollElement(e, index)"
			@dblclick="remove(index)"
		>
			<span
				draggable="false"
				:style="{
					rotate: -part.angle + 'deg'
				}"
			>
				{{ BodyPart[part.part] }}
				<br />
				{{ (part.size * 100).toFixed(2) }}%
				<br />
				{{ part.angle % 360 }} deg.
			</span>
		</div>
	</div>
	<p>{{ body }}</p>
</template>

<style scoped lang="scss">
.builder {
	padding: 24px;

	&__buttons {
		padding: 24px;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
	}

	&__button {
		height: 36px;
		border: none;
		background-color: rgba(93, 93, 93, 0.47);
		border-radius: 8px;
		color: white;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: rgba(93, 93, 93, 0.78);
		}
	}

	&__info {
		font-size: 24px;
		text-align: center;

		&--warn {
			color: #752d2d;
		}
	}

	&__body {
		position: relative;
		background-color: rgba(131, 131, 131, 0.49);
		height: 1000px;
	}

	&__body-part {
		position: absolute;
		display: grid;
		place-content: center;
		max-width: 500px;
		min-width: 40px;
		color: white;
		padding: 8px;
		aspect-ratio: 1;
		background-size: contain;
		background-repeat: no-repeat;

		span {
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
		}
	}
}
</style>
