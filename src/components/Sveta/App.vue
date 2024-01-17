<script setup lang="ts">
import { computed, ref } from 'vue'
const COMPRESS_COUNT = 5
const BREATH_COUNT = 2

const maxErrors = 3
const errors = ref(0)
const successes = ref(0)

const compress = ref(0)
const breath = ref(0)

const stageCompress = ref(0)
const stageBreath = ref(0)

const isLose = computed(() => {
	return errors.value >= maxErrors
})

const aaa = ref(65)

const _compress = computed(() => stageCompress.value + compress.value)
const _breath = computed(() => stageBreath.value + breath.value)

const _percent = computed(() => aaa.value + '%')

setInterval(() => {
	aaa.value = Math.max(0, aaa.value - 0.3)
}, 10)

function validateCompress() {
	console.log(stageCompress.value)
	if (stageCompress.value > COMPRESS_COUNT) {
		failure()
	} else {
		validateStage()
	}
}

function validateBreath() {
	if (stageCompress.value < COMPRESS_COUNT || stageBreath.value > BREATH_COUNT) {
		console.log('error', stageCompress.value)
		failure()
	} else {
		validateStage()
	}
}
function validateStage() {
	if (stageBreath.value >= BREATH_COUNT && stageCompress.value >= COMPRESS_COUNT) {
		console.log('success')
		success()
	}
}

function success() {
	compress.value += stageCompress.value
	breath.value += stageBreath.value
	stageCompress.value = 0
	stageBreath.value = 0
	successes.value++
}

function failure() {
	// compress.value += stageCompress.value
	// breath.value += stageBreath.value
	// stageCompress.value = 0
	// stageBreath.value = 0
	errors.value++
}

function breathing() {
	aaa.value = Math.min(100, aaa.value + 10)
	stageBreath.value++
	validateBreath()
}

function compressing() {
	aaa.value = Math.min(100, aaa.value + 10)
	stageCompress.value++
	validateCompress()
}

function clear() {
	compress.value = 0
	breath.value = 0
	errors.value = 0
	successes.value = 0
	stageBreath.value = 0
	stageCompress.value = 0
}
</script>

<template>
	<div class="errors">
		<span
			v-for="(_, index) in new Array(maxErrors).fill(false)"
			class="error"
			:class="{ 'error-filled': index < errors }"
		/>
		<span>
			{{ successes }}
		</span>
	</div>
	<p>
		{{ isLose ? 'Пациент умер' : '' }}
	</p>
	<div class="buttons">
		<button
			:disabled="isLose"
			@click="compressing"
		>
			Компрессия
		</button>
		<button
			:disabled="isLose"
			@click="breathing"
		>
			Вдох
		</button>
	</div>
	<div class="buttons">
		<span>
			{{ _compress }}
		</span>
		<span>
			{{ _breath }}
		</span>
	</div>
	<div class="buttons">
		<span>
			{{ stageCompress }}
		</span>
		<span>
			{{ stageBreath }}
		</span>
	</div>
	<p class="progress">
		<span class="zone" />
	</p>
	<input
		v-model="aaa"
		type="range"
	/>
</template>

<style scoped>
.progress {
	position: relative;
	border: 1px solid white;
	height: 24px;
	border-radius: 8px;
	background-image: linear-gradient(to right, #b20000 0%, #5cb200 v-bind(_percent), transparent v-bind(_percent));
}

.zone {
	position: absolute;
	width: 150px;
	top: 0;
	left: 55%;
	border: 5px solid white;
	height: 32px;
	translate: 0 -4px;
}

.errors {
	display: flex;
	justify-content: center;
	margin: 48px 0;
	gap: 8px;
}

.error {
	width: 24px;
	height: 24px;
	border-radius: 100%;
	display: block;
	background-color: #919191;
	border: 1px solid white;
}

.error-filled {
	background-color: #752d2d;
}

.buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;

	button {
		border: none;
		padding: 4px 8px;
		border-radius: 4px;
		background-color: #b6b6b6;
		cursor: pointer;
		transition: all 0.15s ease-in-out;
	}

	button:not(:disabled):hover {
		background-color: #808080;
	}

	span {
		width: 100%;
		text-align: center;
	}
}
</style>
