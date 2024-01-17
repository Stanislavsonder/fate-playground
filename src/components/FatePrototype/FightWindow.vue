<script setup lang="ts">
import {Armor} from "@/entities/Armor";
import {CharacterSize, ArmorSlot, ArmorType, WeaponQuality} from "@/types";
import {Weapon} from "@/entities/Weapon";
import {Sword} from "@/constants/Weapons";
import {ref} from "vue";

const bronzeHelmet = new Armor({
	name: 'Bronze Helmet',
	size: CharacterSize.Medium,
	type: ArmorType.Heavy,
	defence: 24,
	slots: [ArmorSlot.Ears, ArmorSlot.TopHead, ArmorSlot.Nose],
	bonuses: {
		moveDistance: -10,
		evadeChance: 0.1,
		defence: 2
	}
})

const woodenSword = new Weapon({
	name: 'Wooden Sword',
	quality: WeaponQuality.Garbage,
	type: Sword,
	minDamage: 0,
	maxDamage: 8,
	criticalChance: 0,
	criticalMultiplier: 0,
	hitChance: 0,
	bonus: {
		minDamage: 15,
		maxDamage: 20
	}
})


const bonus = ref(false)
const penalty = ref(false)
</script>

<template>
<p>{{ bronzeHelmet.name}} : </p>
	<p>Defence: {{ bronzeHelmet.baseDefence}} +{{ bronzeHelmet.bonusDefence }} = {{ bronzeHelmet.totalDefence }}</p>
	<p>Evade chance: {{ bronzeHelmet.evadeChance}}</p>

	<br>
	<hr>
	<br>

	<p>{{ woodenSword.name }}:</p>
	<p>Type: {{ woodenSword.type.name }}</p>
	<p>Distance: {{ woodenSword.type.minDistance }} - {{ woodenSword.type.maxDistance}} ft</p>
	<p>Damage: {{ woodenSword.stats(bonus, penalty).minDamage }} - {{ woodenSword.stats(bonus, penalty).maxDamage}}</p>
	<p>Effective Distance:
		{{ woodenSword.type.getMinEffectiveDistance(bonus, penalty) }}
		-
		{{ woodenSword.type.getMaxEffectiveDistance(bonus, penalty) }} ft.
	</p>
	<label >
		<input type="checkbox" v-model="bonus" >
		Activate weapon bonus
	</label>
	<br>
	<label >
		<input type="checkbox" v-model="penalty" >
		Activate weapon penalty
	</label>
	<p>{{ woodenSword.type.stats(bonus, penalty)}}</p>
	<p>{{ woodenSword.stats(bonus, penalty)}}</p>
</template>

<style lang="scss">

</style>
