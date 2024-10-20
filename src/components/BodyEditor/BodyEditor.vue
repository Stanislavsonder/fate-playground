<script setup lang="ts">
import { ref } from 'vue'
import CreatureCanvas from './CreatureCanvas.vue'
import { Creature } from './types'

function printCharacter() {
	const h = human.value
	const data = {}
	for (const part in h.bodyParts) {
		data[part] = {
			size: h.bodyParts[part].size,
			x: h.bodyParts[part].canvasData.x,
			y: h.bodyParts[part].canvasData.y,
			aspectRatio: h.bodyParts[part].canvasData.aspectRatio,
			shape: h.bodyParts[part].canvasData.shape,
			rotationAngle: h.bodyParts[part].canvasData.rotationAngle
		}
	}
	console.table(data)
	console.log(JSON.stringify(h, null, 2))
}

// Определяем существо
const human = ref<Creature>({
	name: 'Human',
	constitution: 1,
	bodyParts: {
		head: {
			name: 'Head',
			connectedWith: ['neck'],
			organs: [
				{
					id: 'brain',
					name: 'Brain',
					critical: true,
					vulnerability: 0.9,
					impactOnSurvival: 1
				},
				{
					id: 'left-eye',
					name: 'Left eye',
					critical: false,
					vulnerability: 0.5,
					impactOnSurvival: 0.2
				},
				{
					id: 'right-eye',
					name: 'Right eye',
					critical: false,
					vulnerability: 0.5,
					impactOnSurvival: 0.2
				},
				{
					id: 'nose',
					name: 'Nose',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'mouth',
					name: 'Mouth',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'left-ear',
					name: 'Left ear',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'right-ear',
					name: 'Right ear',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				}
			],
			canvasData: {
				size: 0.13,
				x: 0.5,
				y: 0.07,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		neck: {
			name: 'Neck',
			organs: [],
			connectedWith: ['chest', 'head'],
			canvasData: {
				size: 0.05,
				x: 0.5,
				y: 0.158,
				shape: 'rectangle',
				aspectRatio: 0.96,
				rotationAngle: 0
			}
		},
		chest: {
			name: 'Chest',
			organs: [
				{
					id: 'heart',
					name: 'Heart',
					critical: true,
					vulnerability: 0.8,
					impactOnSurvival: 1
				},
				{
					id: 'left-lung',
					name: 'Left lung',
					critical: false,
					vulnerability: 0.7,
					impactOnSurvival: 0.7
				},
				{
					id: 'right-lung',
					name: 'Right lung',
					critical: false,
					vulnerability: 0.7,
					impactOnSurvival: 0.7
				}
			],
			connectedWith: ['neck', 'stomach', 'left-shoulder', 'right-shoulder'],
			canvasData: {
				size: 0.13,
				x: 0.5,
				y: 0.234,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		stomach: {
			name: 'Stomach',
			organs: [
				{
					id: 'liver',
					name: 'Liver',
					critical: false,
					vulnerability: 0.6,
					impactOnSurvival: 0.5
				},
				{
					id: 'spleen',
					name: 'Spleen',
					critical: false,
					vulnerability: 0.5,
					impactOnSurvival: 0.3
				},
				{
					id: 'pancreas',
					name: 'Pancreas',
					critical: false,
					vulnerability: 0.5,
					impactOnSurvival: 0.3
				},
				{
					id: 'small-intestine',
					name: 'Small intestine',
					critical: false,
					vulnerability: 0.4,
					impactOnSurvival: 0.2
				},
				{
					id: 'large-intestine',
					name: 'Large intestine',
					critical: false,
					vulnerability: 0.4,
					impactOnSurvival: 0.2
				},
				{
					id: 'appendix',
					name: 'Appendix',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'stomach',
					name: 'Stomach',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'left-kidney',
					name: 'Left kidney',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				},
				{
					id: 'right-kidney',
					name: 'Right kidney',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				}
			],
			connectedWith: ['chest', 'groin'],
			canvasData: {
				size: 0.19,
				x: 0.5,
				y: 0.39,
				shape: 'rectangle',
				aspectRatio: 0.89,
				rotationAngle: 0
			}
		},
		groin: {
			name: 'Groin',
			organs: [
				{
					id: 'bladder',
					name: 'Bladder',
					critical: false,
					vulnerability: 0.4,
					impactOnSurvival: 0.2
				},
				{
					id: 'genitals',
					name: 'Genitals',
					critical: false,
					vulnerability: 0.3,
					impactOnSurvival: 0.1
				}
			],
			connectedWith: ['stomach', 'left-thigh', 'right-thigh'],
			canvasData: {
				size: 0.098,
				x: 0.5,
				y: 0.524,
				shape: 'rectangle',
				aspectRatio: 1.73,
				rotationAngle: 0
			}
		},
		'left-shoulder': {
			name: 'Left shoulder',
			organs: [],
			connectedWith: ['chest', 'left-upper-arm'],
			canvasData: {
				size: 0.08,
				x: 0.408,
				y: 0.214,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'left-upper-arm': {
			name: 'Left upper arm',
			organs: [],
			connectedWith: ['left-shoulder', 'left-elbow'],
			canvasData: {
				size: 0.064,
				x: 0.372,
				y: 0.286,
				shape: 'rectangle',
				aspectRatio: 0.65,
				rotationAngle: 23
			}
		},
		'left-elbow': {
			name: 'Left elbow',
			organs: [],
			connectedWith: ['left-upper-arm', 'left-lower-arm'],
			canvasData: {
				size: 0.05,
				x: 0.348,
				y: 0.344,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'left-lower-arm': {
			name: 'Left lower arm',
			organs: [],
			connectedWith: ['left-elbow', 'left-wrist'],
			canvasData: {
				size: 0.05,
				x: 0.338,
				y: 0.404,
				shape: 'rectangle',
				aspectRatio: 0.59,
				rotationAngle: 8
			}
		},
		'left-wrist': {
			name: 'Left wrist',
			organs: [],
			connectedWith: ['left-lower-arm', 'left-big-finger', 'left-index-finger', 'left-middle-finger', 'left-ring-finger', 'left-little-finger'],
			canvasData: {
				size: 0.042,
				x: 0.33,
				y: 0.46,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'left-big-finger': {
			name: 'Left big finger',
			organs: [],
			connectedWith: ['left-wrist'],
			canvasData: {
				size: 0.018,
				x: 0.304,
				y: 0.474,
				shape: 'rectangle',
				aspectRatio: 0.71,
				rotationAngle: 48
			}
		},
		'left-index-finger': {
			name: 'Left index finger',
			organs: [],
			connectedWith: ['left-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.314,
				y: 0.49,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 12
			}
		},
		'left-middle-finger': {
			name: 'Left middle finger',
			organs: [],
			connectedWith: ['left-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.326,
				y: 0.492,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 3
			}
		},
		'left-ring-finger': {
			name: 'Left ring finger',
			organs: [],
			connectedWith: ['left-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.338,
				y: 0.492,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 354
			}
		},
		'left-little-finger': {
			name: 'Left little finger',
			organs: [],
			connectedWith: ['left-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.348,
				y: 0.484,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 343
			}
		},
		'right-shoulder': {
			name: 'Right shoulder',
			organs: [],
			connectedWith: ['chest', 'right-upper-arm'],
			canvasData: {
				size: 0.08,
				x: 0.592,
				y: 0.214,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'right-upper-arm': {
			name: 'Right upper arm',
			organs: [],
			connectedWith: ['right-shoulder', 'right-elbow'],
			canvasData: {
				size: 0.064,
				x: 0.628,
				y: 0.286,
				shape: 'rectangle',
				aspectRatio: 0.65,
				rotationAngle: 337
			}
		},
		'right-elbow': {
			name: 'Right elbow',
			organs: [],
			connectedWith: ['right-upper-arm', 'right-lower-arm'],
			canvasData: {
				size: 0.05,
				x: 0.652,
				y: 0.344,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'right-lower-arm': {
			name: 'Right lower arm',
			organs: [],
			connectedWith: ['right-elbow', 'right-wrist'],
			canvasData: {
				size: 0.05,
				x: 0.662,
				y: 0.404,
				shape: 'rectangle',
				aspectRatio: 0.59,
				rotationAngle: 352
			}
		},
		'right-wrist': {
			name: 'Right wrist',
			organs: [],
			connectedWith: ['right-lower-arm', 'right-big-finger', 'right-index-finger', 'right-middle-finger', 'right-ring-finger', 'right-little-finger'],
			canvasData: {
				size: 0.042,
				x: 0.67,
				y: 0.46,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'right-big-finger': {
			name: 'Right big finger',
			organs: [],
			connectedWith: ['right-wrist'],
			canvasData: {
				size: 0.018,
				x: 0.696,
				y: 0.474,
				shape: 'rectangle',
				aspectRatio: 0.71,
				rotationAngle: 312
			}
		},
		'right-index-finger': {
			name: 'Right index finger',
			organs: [],
			connectedWith: ['right-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.686,
				y: 0.49,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 348
			}
		},
		'right-middle-finger': {
			name: 'Right middle finger',
			organs: [],
			connectedWith: ['right-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.674,
				y: 0.492,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 357
			}
		},
		'right-ring-finger': {
			name: 'Right ring finger',
			organs: [],
			connectedWith: ['right-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.662,
				y: 0.492,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 6
			}
		},
		'right-little-finger': {
			name: 'Right little finger',
			organs: [],
			connectedWith: ['right-wrist'],
			canvasData: {
				size: 0.016,
				x: 0.652,
				y: 0.484,
				shape: 'rectangle',
				aspectRatio: 0.47,
				rotationAngle: 17
			}
		},
		'left-thigh': {
			name: 'Left thigh',
			organs: [],
			connectedWith: ['groin', 'left-knee'],
			canvasData: {
				size: 0.12,
				x: 0.453,
				y: 0.636,
				shape: 'rectangle',
				aspectRatio: 0.69,
				rotationAngle: 2
			}
		},
		'left-knee': {
			name: 'Left knee',
			organs: [],
			connectedWith: ['left-thigh', 'left-lower-leg'],
			canvasData: {
				size: 0.07,
				x: 0.45,
				y: 0.728,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'left-lower-leg': {
			name: 'Left lower leg',
			organs: [],
			connectedWith: ['left-knee', 'left-ankle'],
			canvasData: {
				size: 0.1,
				x: 0.442,
				y: 0.836,
				shape: 'rectangle',
				aspectRatio: 0.57,
				rotationAngle: 4
			}
		},
		'left-ankle': {
			name: 'Left ankle',
			organs: [],
			connectedWith: ['left-lower-leg', 'left-big-toe', 'left-second-toe', 'left-third-toe', 'left-fourth-toe', 'left-little-toe'],
			canvasData: {
				size: 0.066,
				x: 0.416,
				y: 0.916,
				shape: 'rectangle',
				aspectRatio: 1.47,
				rotationAngle: 0
			}
		},
		'left-big-toe': {
			name: 'Left big toe',
			organs: [],
			connectedWith: ['left-ankle'],
			canvasData: {
				size: 0.01,
				x: 0.362,
				y: 0.898,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'left-second-toe': {
			name: 'Left second toe',
			organs: [],
			connectedWith: ['left-ankle'],
			canvasData: {
				size: 0.01,
				x: 0.362,
				y: 0.907,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'left-third-toe': {
			name: 'Left third toe',
			organs: [],
			connectedWith: ['left-ankle'],
			canvasData: {
				x: 0.362,
				y: 0.916,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'left-fourth-toe': {
			name: 'Left fourth toe',
			organs: [],
			connectedWith: ['left-ankle'],
			canvasData: {
				x: 0.362,
				y: 0.925,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'left-little-toe': {
			name: 'Left little toe',
			organs: [],
			connectedWith: ['left-ankle'],
			canvasData: {
				x: 0.362,
				y: 0.934,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'right-thigh': {
			name: 'Right thigh',
			organs: [],
			connectedWith: ['groin', 'right-knee'],
			canvasData: {
				x: 0.547,
				y: 0.636,
				size: 0.12,
				shape: 'rectangle',
				aspectRatio: 0.69,
				rotationAngle: 358
			}
		},
		'right-knee': {
			name: 'Right knee',
			organs: [],
			connectedWith: ['right-thigh', 'right-lower-leg'],
			canvasData: {
				x: 0.55,
				y: 0.728,
				size: 0.07,
				shape: 'circle',
				aspectRatio: 1,
				rotationAngle: 0
			}
		},
		'right-lower-leg': {
			name: 'Right lower leg',
			organs: [],
			connectedWith: ['right-knee', 'right-ankle'],
			canvasData: {
				x: 0.558,
				y: 0.836,
				size: 0.1,
				shape: 'rectangle',
				aspectRatio: 0.57,
				rotationAngle: 356
			}
		},
		'right-ankle': {
			name: 'Right ankle',
			organs: [],
			connectedWith: ['right-lower-leg', 'right-big-toe', 'right-second-toe', 'right-third-toe', 'right-fourth-toe', 'right-little-toe'],
			canvasData: {
				x: 0.584,
				y: 0.916,
				size: 0.066,
				shape: 'rectangle',
				aspectRatio: 1.47,
				rotationAngle: 0
			}
		},
		'right-big-toe': {
			name: 'Right big toe',
			organs: [],
			connectedWith: ['right-ankle'],
			canvasData: {
				x: 0.638,
				y: 0.898,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'right-second-toe': {
			name: 'Right second toe',
			organs: [],
			connectedWith: ['right-ankle'],
			canvasData: {
				x: 0.638,
				y: 0.907,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'right-third-toe': {
			name: 'Right third toe',
			organs: [],
			connectedWith: ['right-ankle'],
			canvasData: {
				x: 0.638,
				y: 0.916,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'right-fourth-toe': {
			name: 'Right fourth toe',
			organs: [],
			connectedWith: ['right-ankle'],
			canvasData: {
				x: 0.638,
				y: 0.925,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		},
		'right-little-toe': {
			name: 'Right little toe',
			organs: [],
			connectedWith: ['right-ankle'],
			canvasData: {
				x: 0.638,
				y: 0.934,
				size: 0.01,
				shape: 'rectangle',
				aspectRatio: 1.29,
				rotationAngle: 0
			}
		}
	}
})
</script>

<template>
	<div>
		<CreatureCanvas v-model="human" />
		<div class="body-control">
			<div
				v-for="(part, key) in human.bodyParts"
				:key="key"
				class="body-part-editor"
			>
				<details>
					<summary>{{ part.name }}</summary>
					<div class="input-group">
						<label>Size:</label>
						<input
							type="number"
							v-model.number="part.canvasData.size"
							step="0.002"
							min="0"
							max="1"
						/>
					</div>
					<div class="input-group">
						<label>X Position:</label>
						<input
							type="number"
							v-model.number="part.canvasData.x"
							step="0.002"
							min="0"
							max="1"
						/>
					</div>
					<div class="input-group">
						<label>Y Position:</label>
						<input
							type="number"
							v-model.number="part.canvasData.y"
							step="0.002"
							min="0"
							max="1"
						/>
					</div>
					<div class="input-group">
						<label>Aspect Ratio:</label>
						<input
							type="number"
							v-model.number="part.canvasData.aspectRatio"
							step="0.02"
							min="0.01"
							max="1.98"
						/>
					</div>
					<div class="input-group">
						<label>Shape:</label>
						<select v-model="part.canvasData.shape">
							<option value="rectangle">Rectangle</option>
							<option value="circle">Circle</option>
						</select>
					</div>
					<div class="input-group">
						<label>Rotation Angle:</label>
						<input
							type="number"
							v-model.number="part.canvasData.rotationAngle"
							step="1"
							min="0"
							max="360"
						/>
					</div>
				</details>
			</div>
		</div>
	</div>

	<button
		@click="printCharacter"
		class="print-button"
	>
		Print Character to Console
	</button>
</template>

<style scoped>
.flex {
	display: flex;
	align-items: flex-start;
}

.input-group {
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
}

label {
	font-weight: bold;
	margin-bottom: 0.5rem;
}

input[type='number'],
input[type='text'],
select {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1rem;
}

.print-button {
	background-color: #4caf50;
	border: none;
	color: white;
	padding: 15px 32px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 4px;
}

.print-button:hover {
	background-color: #45a049;
}

.body-part {
	background-color: #f9f9f9;
	border: 1px solid #ddd;
	border-radius: 4px;
	padding: 1rem;
	margin-bottom: 1rem;
}

.body-part h3 {
	font-size: 1.5rem;
	margin-top: 0;
	margin-bottom: 1rem;
}

.body-control {
	position: fixed;
	top: 1rem;
	left: 1rem;
	margin-top: 1rem;
	width: 300px;
	height: 100dvh;
	overflow: auto;
}

.body-part-editor {
	margin-bottom: 1rem;
	background-color: #747272;
	padding: 1rem;
	border-radius: 10px;
}
</style>
