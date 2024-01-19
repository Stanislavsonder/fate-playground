<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const COMPRESS_COUNT = 5 // Компрессий подряд
const BREATH_COUNT = 2 // Вхдохов подряд
const DEFAULT_SCORE = 65 // На каком проценте полоски начинается игра
const TIMER = 5 // Количество секунд на таймере
const MIN_ALLOWED_SCORE = 50 // Нижняя граница зоны в которой очки добавляются в процентах
const MAX_ALLOWED_SCORE = 90 // Верхняя граница зоны в которой очки добавляются в процентах
const SCORE_SPEED = 0.2 // Как быстро полоска уходит вниз в процентах за 10 миллисекунд
const BREATH_SCORE_ADDITION = 10 // Сколько процентов добавляется за клик по ВДОХ в процентах
const COMPRESSING_SCORE_ADDITION = 10 // Сколько процентов добавляется за клик по КОМПРЕССИЯ в процентах
const MAX_ERRORS = 3 // Сколько ошибок можно допустить

const MIN_ALLOWED_SCORE_PERCENT = MIN_ALLOWED_SCORE + '%'
const ALLOWED_SCORE_WIDTH = 100 - MIN_ALLOWED_SCORE - (100 - MAX_ALLOWED_SCORE) + '%'

const errors = ref(0)
const successes = ref(0)

const compress = ref(0)
const breath = ref(0)

const stageCompress = ref(0)
const stageBreath = ref(0)

watch(errors, value => {
	if (value >= MAX_ERRORS) {
		endGame(true)
	}
})

const score = ref(DEFAULT_SCORE)

const _compress = computed(() => stageCompress.value + compress.value)
const _breath = computed(() => stageBreath.value + breath.value)

const _percent = computed(() => score.value + '%')

setInterval(() => {
	if (isStarted.value) {
		results.value.push(score.value >= MIN_ALLOWED_SCORE && score.value <= MAX_ALLOWED_SCORE)
		score.value = Math.max(0, score.value - SCORE_SPEED)
	}
}, 10)

function validateCompress() {
	if (stageCompress.value > COMPRESS_COUNT) {
		failure()
	} else {
		validateStage()
	}
}

function validateBreath() {
	if (stageCompress.value < COMPRESS_COUNT || stageBreath.value > BREATH_COUNT) {
		failure()
	} else {
		validateStage()
	}
}
function validateStage() {
	if (stageBreath.value >= BREATH_COUNT && stageCompress.value >= COMPRESS_COUNT) {
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
	errors.value++
}

function breathing() {
	score.value = Math.min(100, score.value + BREATH_SCORE_ADDITION)
	stageBreath.value++
	validateBreath()
}

function compressing() {
	score.value = Math.min(100, score.value + COMPRESSING_SCORE_ADDITION)
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
	results.value = []
	score.value = DEFAULT_SCORE
	timer.value = TIMER
	result.value = ''
}

const isStarted = ref(false)
const isLoosed = ref(false)
const timer = ref(TIMER)
const results = ref<boolean[]>([])
const result = ref('')

function tick() {
	setTimeout(() => {
		timer.value -= 1

		if (timer.value <= 0) {
			endGame()
			return
		}

		tick()
	}, 1000)
}

function startGame() {
	isStarted.value = true
	clear()
	tick()
}

function endGame(isLoosing = false) {
	isStarted.value = false
	isLoosed.value = isLoosing
	calculateResult()
}

// Тут редактировать исход
function calculateResult() {
	const res = Math.round((results.value.filter(Boolean).length / results.value.length) * 100)
	let text = ''
	if (res < 20) {
		text = 'Ты лох. Пациент умер. '
	} else if (res < 50) {
		text = 'Пациент ожил, сказал что ты лох и умер обратно. '
	} else if (res < 80) {
		text = 'Пациент выжил, но он никогда не будет прежним. '
	} else {
		text = 'Пациент выжил и стал президентом США. Вы молодец! '
	}

	if (errors.value === 3) {
		text += 'Вы совешили много ошибок в этой жизни, ад ждет вас. '
	} else if (errors.value === 2) {
		text += 'Вы были на пороге полного провала, ребра пациента не справились. '
	} else if (errors.value === 1) {
		text += 'Не бывает жизни без ошибок. Так держать! '
	} else {
		text += 'Ноль ошибок. Молодец! '
	}

	result.value = text
}
</script>

<template>
	<div class="buttons buttons--center">
		<button
			:disabled="isStarted"
			@click="startGame"
		>
			Start
		</button>
	</div>
	<p class="timer">
		{{ timer }}
	</p>
	<div class="errors">
		<span
			v-for="(_, index) in new Array(MAX_ERRORS).fill(false)"
			class="error"
			:class="{ 'error-filled': index < errors }"
		/>
		<span>
			{{ successes }}
		</span>
	</div>
	<p>
		{{ isLoosed ? 'Пациент умер' : '' }}
	</p>
	<div class="buttons">
		<button
			:disabled="!isStarted"
			@click="compressing"
		>
			Компрессия
		</button>
		<button
			:disabled="!isStarted"
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
		<span class="zone"> {{ Math.round((results.filter(Boolean).length / results.length) * 100) || 100 }}% </span>
	</p>

	<div
		v-if="result"
		class="results"
	>
		{{ result }}
	</div>
</template>

<style scoped lang="scss">
.results {
	padding: 24px;
	text-align: center;
}

.progress {
	position: relative;
	border: 1px solid white;
	height: 24px;
	border-radius: 8px;
	background-image: linear-gradient(to right, #b20000 0%, #5cb200 v-bind(_percent), transparent v-bind(_percent));
}

.timer {
	text-align: center;
	font-size: 24px;
	padding: 8px;
}

.zone {
	position: absolute;
	top: 0;
	left: v-bind(MIN_ALLOWED_SCORE_PERCENT);
	width: v-bind(ALLOWED_SCORE_WIDTH);
	border: 5px solid white;
	height: 32px;
	translate: 0 -4px;
	text-align: center;
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

	&--center {
		grid-template-columns: 1fr;
		justify-content: center;
	}

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
