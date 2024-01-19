<script setup lang="ts">
const isOpen = defineModel<boolean>()
</script>

<template>
	<div
		v-if="isOpen"
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
	bottom: 0;
	left: 50%;
	translate: -50%;
	background-color: black;
	padding: 48px 24px 24px;
	width: 100%;
	height: 50%;
	overflow: auto;

	&__close {
		position: absolute;
		right: 24px;
		top: 24px;
	}
}
</style>
