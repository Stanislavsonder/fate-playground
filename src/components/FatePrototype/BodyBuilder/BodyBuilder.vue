<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { BODY_PART_IMAGES, BodyPart, DEFAULT_HUMAN_BODY } from '@/constants/Character'
import { CharacterBody, CharacterBodyPart } from '@/types'
import { copy } from '@/utils'
import { computed, ref } from 'vue'

const body = defineModel<CharacterBody>({
	required: false,
	default: () => copy(DEFAULT_HUMAN_BODY)
})

const { current } = useMagicKeys()

const canvas = ref<HTMLCanvasElement | undefined>()
const currentIndex = ref(-1)
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)

draw()

function clear() {
	body.value.parts = []
}

function draw() {
	if (!canvas.value) {
		return
	}
	const ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D
	ctx.clearRect(0, 0, canvas.value?.width || 0, canvas.value?.height || 0)

	for (let bodyPart of body.value.parts) {
		ctx.fillStyle = '#000000'
		ctx.fillRect(bodyPart.x, bodyPart.y, bodyPart.width, bodyPart.height)
	}
}

function addBodyPart(slot: BodyPart) {
	body.value.parts.push({
		width: 50,
		height: 50,
		part: slot,
		y: 0,
		x: 0,
		angle: 0
	})
	draw()
}

function isMouseOnThisBodyPart(x: number, y: number, part: CharacterBodyPart): boolean {
	let left = part.x
	let right = part.x + part.width
	let top = part.y
	let bottom = part.y + part.height

	return x > left && x < right && y > top && y < bottom
}

function startDragging(e: MouseEvent) {
	startX.value = e.offsetX
	startY.value = e.offsetY
	let index = 0
	for (let bodyPart of body.value.parts) {
		if (isMouseOnThisBodyPart(startX.value, startY.value, bodyPart)) {
			currentIndex.value = index
			isDragging.value = true
			return
		}
		index++
	}
}

function stopDragging(e: MouseEvent) {
	if (!isDragging.value) {
		return
	}
	isDragging.value = false
}

function drag(e: MouseEvent) {
	if (!isDragging.value) {
		return
	}

	let mouseX = e.offsetX
	let mouseY = e.offsetY

	let dx = mouseX - startX.value
	let dy = mouseY - startY.value

	if (currentIndex.value === -1) {
		return
	}

	body.value.parts[currentIndex.value].x += dx
	body.value.parts[currentIndex.value].y += dy

	draw()

	startX.value = mouseX
	startY.value = mouseY
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
	<div class="builder__body">
		<canvas
			ref="canvas"
			class="builder__canvas"
			@mouseup="stopDragging"
			@mousedown="startDragging"
			@mouseout="stopDragging"
			@mousemove="drag"
		/>
	</div>
</template>

<style scoped lang="scss">
.builder {
	padding: 24px;

	&__canvas {
		height: 500px;
		background: #919191;
	}

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

	&__body-part {
		position: absolute;
		display: grid;
		place-content: center;
		color: white;
		background-size: contain;
		background-repeat: no-repeat;
		border: 2px solid white;
		background: rgba(0, 0, 0, 0.85);
		width: 100px;
		height: 100px;
		border-radius: 100%;

		img {
			pointer-events: none;
		}

		span {
			pointer-events: none;
			text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
		}
	}
}
</style>
