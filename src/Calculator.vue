<script setup>
import Armor from "@/components/Calculator blocks/Armor.vue";
import CritChance from "@/components/Calculator blocks/CritChance.vue";
import HitChance from "@/components/Calculator blocks/HitChance.vue";
import MissChance from "@/components/Calculator blocks/MissChance.vue";
import {ref} from "vue";
import ResultHitChance from "@/components/Calculator blocks/ResultHitChance.vue";
import Damage from "@/components/Calculator blocks/Damage.vue";

const missChance = ref(0)
const hitChance = ref(0)

</script>

<template>
	<Damage/>
	<Armor/>
	<CritChance/>
	<HitChance v-model="hitChance"/>
	<MissChance v-model="missChance"/>
	<ResultHitChance :hit="hitChance" :miss="missChance"/>
</template>

<style lang="scss">
.inputs {
	label {
		flex-grow: 1;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-content: center;
		justify-content: center;
		margin: 8px;
	}
}
</style>
