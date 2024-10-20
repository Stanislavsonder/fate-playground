<script setup lang="ts">
import FightWindow from '@/components/FatePrototype/FightWindow.vue'
import LootGenerator from '@/components/FatePrototype/LootGenerator/LootGenerator.vue'
import BodyEditor from '@/components/BodyEditor/BodyEditor.vue'
</script>

<template>
	<details>
		<summary>Loot generator (Armors / Weapons)</summary>
		<LootGenerator />
	</details>
	<details>
		<summary>Fight window</summary>
		<FightWindow />
	</details>

	<details open>
		<summary>Body editor</summary>
		<BodyEditor />
	</details>
</template>

<style lang="scss" src="./app/styles/reset.scss" />

<style lang="scss" src="./app/styles/variables.scss" />

<style lang="scss" src="./app/styles/main.scss" />
