<script setup lang="ts">
defineProps<{
	title: string
}>()
</script>

<template>
<div class="block">
	<h2>{{ title }}</h2>
	<slot/>
</div>
</template>

<style scoped lang="scss">
.block {
	padding: 24px;
	background-color: #282828;
	border-radius: 24px;
	box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.47);
	margin: 48px;
}
</style>
