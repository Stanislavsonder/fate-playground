<script setup lang="ts">
import FightWindow from '@/components/FatePrototype/FightWindow.vue'
import LootGenerator from '@/components/FatePrototype/LootGenerator/LootGenerator.vue'
</script>

<template>
	<details>
		<summary>Loot generator (Armors / Weapons)</summary>
		<LootGenerator />
	</details>
	<details open>
		<summary>Fight window</summary>
		<FightWindow />
	</details>
</template>

<style lang="scss">
button {
	cursor: pointer;
}

ul,
ol,
li {
	list-style: none;
	margin: 0;
	padding: 0;
}

.weapon-editor {
	&__list {
		display: flex;
		gap: 24px;
		padding: 24px;
		overflow: auto;
	}

	&__weapons {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 16px;
	}

	&__weapon {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex-shrink: 0;
		max-width: 400px;
	}

	&__delete {
		background-color: #752d2d;
		color: white;
		height: 24px;
		border-radius: 8px;
		border: none;
	}
}
</style>
