<script setup>
import Block from "@/components/Calculator blocks/Block.vue";
import {computed, ref} from "vue";
import Dice from "@/components/Dice.vue";

const weaponMinDamage = ref(10)
const weaponMaxDamage = ref(15)

const fight = ref(0)
const constitution = ref(0)

const diceResult = ref(0)

const multiplier = computed(() => {
	return 1 + (fight.value * 0.2) + (constitution.value * 0.05)
})

const damageMin = computed(() => {
	return Math.round(weaponMinDamage.value * multiplier.value)
})

const damageMax = computed(() => {
	return Math.round(weaponMaxDamage.value * multiplier.value)
})

const damageStep = computed(() => {
	return (damageMax.value - damageMin.value) / 8
})

const finalDamage = computed(() => {
	return damageMin.value + (damageStep.value * (diceResult.value + 4))
})

</script>

<template>
<Block title="Урон">
	<h3>Характеристики</h3>
	<div class="inputs char">
		<label>
			Драка / Стрельба
			<input type="number" v-model="fight" min="0" max="10" step="1">
		</label>

		<label>
			Телосложение
			<input type="number" v-model="constitution" min="0" max="10" step="1">
		</label>
	</div>

	<div class="inputs">
		<input type="number" v-model="weaponMinDamage" min="0" max="10000" step="1">
		-
		<input type="number" v-model="weaponMaxDamage" min="0" max="10000" step="1">
		x
		<span>{{ multiplier.toFixed(1) }}</span>
		=
		<strong>{{ damageMin }} - {{ damageMax }}</strong>
		 =
		<Dice v-model:result="diceResult"/>
		 =
		<span>
			{{ finalDamage.toFixed(2) }}
		</span>
	</div>
</Block>
</template>

<style scoped>
.char {
	display: flex;
	justify-content: center;
}
</style>
