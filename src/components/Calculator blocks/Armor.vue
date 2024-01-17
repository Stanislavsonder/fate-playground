<script setup>
import Block from "@/components/Calculator blocks/Block.vue";
import {computed, ref} from "vue";

const armor = ref(0)
const F = 0.06

const percent = computed(() => {
	return 1 - ((F * armor.value) / (1 + F * Math.abs(armor.value)))
})

</script>

<template>
<Block title="Броня и процент блока">
	<p class="armor">{{armor}}</p>
	<input class="input" type="range" min="-100" max="100" step="1" v-model="armor">
	<p class="armor">
		{{ Math.round(percent * 100) }}%
	</p>
</Block>
</template>

<style scoped>
.input {
	width: 100%;
}

.armor {
	text-align: center;
}
</style>
