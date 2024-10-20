<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
import { Creature, RenderConfig, BodyPartData } from './types'

const creature = defineModel<Creature>({
	required: true
})

const config = ref<RenderConfig>({
	canvasSize: 800,
	scale: 1,
	shiftX: 0,
	shiftY: 0,
	bodyPartColor: '#8FBC8F',
	connectionColor: '#2F4F4F'
})

// Ссылки на DOM-элементы
const canvasRef = ref<HTMLCanvasElement | null>(null)
const selectedPart = ref<string | null>(null)
const isDragging = ref(false)
const isEndingDrag = ref(false)
const isSpacePressed = ref(false)
const lastMousePosition = ref({ x: 0, y: 0 })

// Add a new ref to track mouse position when space is pressed
const spacebarMousePosition = ref<{ x: number; y: number } | null>(null)

// Add these new refs and computed properties
const shapes: BodyPartData['canvasData']['shape'][] = ['circle', 'rectangle', 'triangle']

// Add this new function to change the shape
function changeShape(shape: BodyPartData['canvasData']['shape']) {
	if (selectedPart.value) {
		creature.value.bodyParts[selectedPart.value].canvasData.shape = shape
		renderCreature()
	}
}

// Функция отрисовки существа
function renderCreature() {
	const canvas = canvasRef.value
	if (!canvas) return

	const ctx = canvas.getContext('2d')
	if (!ctx) {
		throw new Error('Canvas 2D контекст не поддерживается.')
	}

	// Очищаем канвас
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// Рисуем связи между частями тела
	ctx.strokeStyle = config.value.connectionColor
	ctx.lineWidth = 2

	for (const part in creature.value.bodyParts) {
		const bodyPart = creature.value.bodyParts[part]
		bodyPart.connectedWith.forEach(neighbor => {
			const neighborPart = creature.value.bodyParts[neighbor]

			const startPos = {
				x: bodyPart.canvasData.x * canvas.width * config.value.scale - config.value.shiftX,
				y: bodyPart.canvasData.y * canvas.height * config.value.scale - config.value.shiftY
			}
			const endPos = {
				x: neighborPart.canvasData.x * canvas.width * config.value.scale - config.value.shiftX,
				y: neighborPart.canvasData.y * canvas.height * config.value.scale - config.value.shiftY
			}

			ctx.beginPath()
			ctx.moveTo(startPos.x, startPos.y)
			ctx.lineTo(endPos.x, endPos.y)
			ctx.stroke()
		})
	}

	for (const part in creature.value.bodyParts) {
		const bodyPart = creature.value.bodyParts[part]
		const size = bodyPart.canvasData.size * Math.min(canvas.width, canvas.height) * config.value.scale // Updated to use canvasData.size
		const posX = bodyPart.canvasData.x * canvas.width * config.value.scale - config.value.shiftX
		const posY = bodyPart.canvasData.y * canvas.height * config.value.scale - config.value.shiftY
		const rotationAngle = bodyPart.canvasData.rotationAngle * (Math.PI / 180)
		ctx.fillStyle = config.value.bodyPartColor

		ctx.save()
		ctx.translate(posX, posY)
		ctx.rotate(rotationAngle)

		if (bodyPart.canvasData.shape === 'circle') {
			ctx.beginPath()
			const radiusX = (size * bodyPart.canvasData.aspectRatio) / 2
			const radiusY = size / bodyPart.canvasData.aspectRatio / 2
			ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI)
			ctx.fill()
		} else if (bodyPart.canvasData.shape === 'rectangle') {
			const width = size * bodyPart.canvasData.aspectRatio
			const height = size / bodyPart.canvasData.aspectRatio
			ctx.fillRect(-width / 2, -height / 2, width, height)
		} else if (bodyPart.canvasData.shape === 'triangle') {
			const width = size * bodyPart.canvasData.aspectRatio
			const height = size / bodyPart.canvasData.aspectRatio
			ctx.beginPath()
			ctx.moveTo(-width / 2, height / 2)
			ctx.lineTo(width / 2, height / 2)
			ctx.lineTo(0, -height / 2)
			ctx.closePath()
			ctx.fill()
		}

		// Рисуем органы
		bodyPart.organs.forEach(organ => {
			ctx.beginPath()
			ctx.arc(0, 0, size / 4, 0, 2 * Math.PI)
			ctx.fillStyle = organ.critical ? 'red' : 'blue'
			ctx.fill()
		})

		ctx.restore()

		// Add outline for selected part
		if (selectedPart.value && creature.value.bodyParts[selectedPart.value]) {
			const part = creature.value.bodyParts[selectedPart.value]
			const size = part.canvasData.size * Math.min(canvas.width, canvas.height) * config.value.scale // Updated to use canvasData.size
			const posX = part.canvasData.x * canvas.width * config.value.scale - config.value.shiftX
			const posY = part.canvasData.y * canvas.height * config.value.scale - config.value.shiftY

			ctx.save()
			ctx.translate(posX, posY)
			ctx.rotate(part.canvasData.rotationAngle * (Math.PI / 180))

			ctx.strokeStyle = 'yellow'
			ctx.lineWidth = 3
			if (part.canvasData.shape === 'circle') {
				ctx.beginPath()
				const radiusX = (size * part.canvasData.aspectRatio) / 2
				const radiusY = size / part.canvasData.aspectRatio / 2
				ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI)
				ctx.stroke()
			} else {
				const width = size * part.canvasData.aspectRatio
				const height = size / part.canvasData.aspectRatio
				ctx.strokeRect(-width / 2, -height / 2, width, height)
			}

			ctx.restore()

			// Display part name
			ctx.font = '18px Arial'
			ctx.fillStyle = 'white'
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 3
			ctx.strokeText(part.name, posX + 10, posY - 10)
			ctx.fillText(part.name, posX + 10, posY - 10)
		}
	}
}

// Вызываем отрисовку при монтировании компонента
onMounted(() => {
	if (canvasRef.value) {
		renderCreature()
	}
})

// Следим за изменениями в creature и config, чтобы перерисовывать канвас
watch(
	() => [creature, config],
	() => {
		if (canvasRef.value) {
			renderCreature()
		}
	},
	{ deep: true }
)

function onClick(event: MouseEvent) {
	if (isEndingDrag.value) {
		isEndingDrag.value = false
		return
	}

	if (!canvasRef.value) {
		return
	}

	const canvas = canvasRef.value
	const rect = canvas.getBoundingClientRect()
	const mouseX = event.clientX - rect.left
	const mouseY = event.clientY - rect.top

	for (const part in creature.value.bodyParts) {
		const bodyPart = creature.value.bodyParts[part]
		const size = bodyPart.canvasData.size * Math.min(canvas.width, canvas.height) * config.value.scale // Updated to use canvasData.size
		const posX = bodyPart.canvasData.x * canvas.width * config.value.scale - config.value.shiftX
		const posY = bodyPart.canvasData.y * canvas.height * config.value.scale - config.value.shiftY
		const halfSize = size / 2

		// Преобразуем координаты мыши с учетом поворота
		const rotationAngle = bodyPart.canvasData.rotationAngle * (Math.PI / 180)
		const dx = mouseX - posX
		const dy = mouseY - posY
		const rotatedX = dx * Math.cos(-rotationAngle) - dy * Math.sin(-rotationAngle)
		const rotatedY = dx * Math.sin(-rotationAngle) + dy * Math.cos(-rotationAngle)

		if (Math.abs(rotatedX) <= halfSize && Math.abs(rotatedY) <= halfSize) {
			selectedPart.value = part
			renderCreature()
			return
		}

		// If no part was clicked, deselect
		selectedPart.value = null
		renderCreature()
	}
}

function onMouseDown(event: MouseEvent) {
	if (selectedPart.value) {
		isDragging.value = true
		isEndingDrag.value = false
		lastMousePosition.value = { x: event.clientX, y: event.clientY }
	}
}

function onMouseMove(event: MouseEvent) {
	if (isSpacePressed.value) {
		if (!spacebarMousePosition.value) {
			// Set initial position if it's not set
			spacebarMousePosition.value = { x: event.clientX, y: event.clientY }
		} else {
			const dx = event.clientX - spacebarMousePosition.value.x
			const dy = event.clientY - spacebarMousePosition.value.y

			// Adjust the shift based on the current scale
			config.value.shiftX -= dx / config.value.scale
			config.value.shiftY -= dy / config.value.scale

			spacebarMousePosition.value = { x: event.clientX, y: event.clientY }
			renderCreature()
		}
	} else if (isDragging.value && selectedPart.value) {
		const dx = event.clientX - lastMousePosition.value.x
		const dy = event.clientY - lastMousePosition.value.y

		const part = creature.value.bodyParts[selectedPart.value]
		part.canvasData.x += dx / (config.value.canvasSize * config.value.scale)
		part.canvasData.y += dy / (config.value.canvasSize * config.value.scale)

		lastMousePosition.value = { x: event.clientX, y: event.clientY }

		renderCreature()
		isEndingDrag.value = true
	}
}

function onMouseUp() {
	isDragging.value = false
}

function onKeyDown(event: KeyboardEvent) {
	if (event.code === 'Space' && !isSpacePressed.value) {
		event.preventDefault()
		isSpacePressed.value = true
		// We'll set the initial mouse position in the next mousemove event
	}

	if (selectedPart.value) {
		const part = creature.value.bodyParts[selectedPart.value]
		const step = 0.01 // Adjust this value to change movement speed

		switch (event.key) {
			case 'Escape':
				selectedPart.value = null
				break
			case 'ArrowUp':
			case 'w':
				part.canvasData.y -= step
				break
			case 'ArrowDown':
			case 's':
				part.canvasData.y += step
				break
			case 'ArrowLeft':
			case 'a':
				part.canvasData.x -= step
				break
			case 'ArrowRight':
			case 'd':
				part.canvasData.x += step
				break
		}

		renderCreature()
	}
}

function onWheel(event: WheelEvent) {
	event.preventDefault()

	if (selectedPart.value) {
		const part = creature.value.bodyParts[selectedPart.value]

		if (event.ctrlKey) {
			// Change aspect ratio
			const aspectRatioSpeed = 0.05
			const newAspectRatio = part.canvasData.aspectRatio + (event.deltaY > 0 ? -aspectRatioSpeed : aspectRatioSpeed)
			part.canvasData.aspectRatio = Math.max(0, Math.min(20, newAspectRatio))
		} else if (event.shiftKey) {
			// Rotate the part
			const rotationSpeed = 2
			part.canvasData.rotationAngle += event.deltaY > 0 ? rotationSpeed : -rotationSpeed
		} else {
			// Scale the part
			const scaleSpeed = 0.01
			const scaleFactor = event.deltaY > 0 ? 1 - scaleSpeed : 1 + scaleSpeed
			part.canvasData.size *= scaleFactor
		}
	} else {
		const canvas = canvasRef.value
		if (!canvas) return
		const rect = canvas.getBoundingClientRect()
		const mouseX = event.clientX - rect.left
		const mouseY = event.clientY - rect.top

		const scaleSpeed = 0.1
		const scaleFactor = event.deltaY > 0 ? 1 - scaleSpeed : 1 + scaleSpeed
		const newScale = config.value.scale * scaleFactor

		if (newScale >= 0.1 && newScale <= 5) {
			const oldScale = config.value.scale

			// Calculate the position in the unscaled canvas
			const unscaledX = (mouseX + config.value.shiftX) / oldScale
			const unscaledY = (mouseY + config.value.shiftY) / oldScale

			// Update the scale
			config.value.scale = newScale

			// Calculate new shift values
			config.value.shiftX = unscaledX * newScale - mouseX
			config.value.shiftY = unscaledY * newScale - mouseY
		}
	}

	renderCreature()
}

function onKeyUp(event: KeyboardEvent) {
	if (event.code === 'Space') {
		isSpacePressed.value = false
		spacebarMousePosition.value = null
	}
}

onMounted(() => {
	if (canvasRef.value) {
		renderCreature()
		window.addEventListener('keydown', onKeyDown)
		window.addEventListener('keyup', onKeyUp)
		canvasRef.value.addEventListener('wheel', onWheel, { passive: false })
	}
})

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyDown)
	window.removeEventListener('keyup', onKeyUp)
	if (canvasRef.value) {
		canvasRef.value.removeEventListener('wheel', onWheel)
	}
})
</script>

<template>
	<div class="container">
		<div class="controls controls-up">
			<button @click="config.shiftY -= 1">↑</button>
			<button @click="config.shiftY -= 10">↑↑</button>
			<button @click="config.shiftY -= 100">↑↑↑</button>
		</div>
		<div class="controls controls-down">
			<button @click="config.shiftY += 1">↓</button>
			<button @click="config.shiftY += 10">↓↓</button>
			<button @click="config.shiftY += 100">↓↓↓</button>
		</div>
		<div class="controls controls-left">
			<button @click="config.shiftX -= 1">←</button>
			<button @click="config.shiftX -= 10">←←</button>
			<button @click="config.shiftX -= 100">←←←</button>
		</div>
		<div class="controls controls-right">
			<button @click="config.shiftX += 1">→</button>
			<button @click="config.shiftX += 10">→→</button>
			<button @click="config.shiftX += 100">→→→</button>
		</div>
		<canvas
			ref="canvasRef"
			class="creature-canvas"
			:width="config.canvasSize"
			:height="config.canvasSize"
			@click="onClick"
			@mousedown="onMouseDown"
			@mousemove="onMouseMove"
			@mouseup="onMouseUp"
			@mouseleave="onMouseUp"
			@wheel="onWheel"
		></canvas>
		<div
			v-if="selectedPart"
			class="shape-overlay"
		>
			<p>{{ creature.bodyParts[selectedPart].name }}</p>
			<p>size: {{ creature.bodyParts[selectedPart].canvasData.size.toFixed(3) }}</p>
			<p>x: {{ creature.bodyParts[selectedPart].canvasData.x.toFixed(3) }}</p>
			<p>y: {{ creature.bodyParts[selectedPart].canvasData.y.toFixed(3) }}</p>
			<p>aspectRatio: {{ creature.bodyParts[selectedPart].canvasData.aspectRatio.toFixed(2) }}</p>
			<p>angle: {{ creature.bodyParts[selectedPart].canvasData.rotationAngle.toFixed(0) }} deg</p>
			<button
				v-for="shape in shapes"
				:key="shape"
				class="shape-button"
				:class="{ 'shape-button--selected': shape === creature.bodyParts[selectedPart].canvasData.shape }"
				@click="changeShape(shape)"
			>
				{{ shape }}
			</button>
		</div>
	</div>
	<div>
		<p>Scale:</p>
		<input
			v-model="config.scale"
			type="range"
			min="0"
			max="5"
			step="0.1"
		/>
	</div>
</template>

<style scoped>
.container {
	position: relative;
	display: grid;
	grid-template-columns: 100px 1fr 100px;
	grid-template-rows: 100px 1fr 100px;
	gap: 16px;
}

.controls {
	display: flex;
	justify-content: center;
	align-items: center;

	button {
		width: 100px;
		font-size: 1.5rem;
		padding: 8px;
		margin: 4px;
		aspect-ratio: 1;
	}
}

.controls-up {
	grid-column: 2;
	grid-row: 1;
	display: flex;
	justify-content: center;
}

.controls-down {
	grid-column: 2;
	grid-row: 3;
	display: flex;
	justify-content: center;
}

.controls-left {
	grid-column: 1;
	grid-row: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.controls-right {
	grid-column: 3;
	grid-row: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
}

canvas {
	border: 3px solid #ccc;
	grid-column: 2;
	grid-row: 2;
}

.shape-overlay {
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 8px;
	top: 119px;
	left: 119px;
	padding: 16px;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 5px;
	z-index: 10;
	font-size: 16px;
}

.shape-button {
	padding: 5px 10px;
	background-color: #6d6d6d;
	color: white;
	border: none;
	border-radius: 3px;
	cursor: pointer;
}

.shape-button--selected {
	background-color: #45a049;
}

.shape-button:hover {
	background-color: #45a049;
}
</style>
