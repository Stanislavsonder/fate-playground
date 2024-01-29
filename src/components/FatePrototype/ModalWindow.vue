<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
const isOpen = defineModel<boolean>()
const modal = ref()

onClickOutside(modal, event => {
	isOpen.value = false
})
</script>

<template>
	<div
		v-if="isOpen"
		ref="modal"
		class="modal-window"
	>
		<button
			class="modal-window__close"
			@click="isOpen = false"
		>
			Close
		</button>
		<slot />
	</div>
</template>

<style scoped lang="scss">
.modal-window {
	position: fixed;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	background-color: black;
	padding: 48px 24px 24px;
	width: 80%;
	height: 80%;
	overflow: auto;
	z-index: 100;

	&__close {
		position: absolute;
		right: 24px;
		top: 24px;
	}
}
</style>
