<script setup lang="ts">
import BodyBuilder from '@/components/FatePrototype/BodyBuilder/BodyBuilder.vue'
import { ref } from 'vue'
import { CharacterBody } from '@/types'
import { DEFAULT_HUMAN_BODY } from '@/constants/Character'
import { copy } from '@/utils'
import FightWindow from '@/components/FatePrototype/FightWindow.vue'
import Calculator from '@/Calculator.vue'

const tmpBody = ref<CharacterBody>(copy(DEFAULT_HUMAN_BODY))
</script>

<template>
	<FightWindow />
	<Calculator />
	<BodyBuilder v-model="tmpBody" />
</template>

<style scoped lang="scss"></style>
