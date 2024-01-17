<script setup lang="ts">

const dice = defineModel<number[]>({
	default: () => [0,0,0,0]
})

const result = defineModel<number>('result', {
	default: 0
})

function roll() {
	dice.value = dice.value.map(() => {
		return Math.floor(Math.random() * 3) - 1;
	})
	result.value = dice.value.reduce((a, b) => a + b)
}

function set(value) {
	result.value = value
}

</script>

<template>
<div class="dice">
	<div class="dice__inner">
		<ul>
			<li
				v-for="(die, index) in dice"
				:class="`dice__result dice__result--${die}`"
				:key="index">
				{{ die > 0 ? '+' : die < 0 ? '–' : 'o' }}
			</li>
		</ul>
		<span class="dice__res" :class="`dice__result--${Math.sign(result)}`">
		{{ result > 0 ? '+' : '' }}{{ result }}
	</span>
		<button @click="roll">Roll</button>
	</div>
	<div class="dice__inner">
		<button
			v-for="(_, index) in new Array(dice.length * 2 + 1).fill(0)"
			@click="set(index - dice.length)"
			class="dice__setter">
			{{ index - dice.length }}
		</button>
	</div>
</div>
</template>

<style scoped lang="scss">
.dice {
	display: inline-flex;
	flex-direction: column;
	width: auto;
	gap: 4px;
	padding: 6px 8px;
	background-color: #676767;
	border-radius: 8px;

	&__inner {
		display: inline-flex;
		gap: 4px;
	}


	ul {
		display: flex;
		gap: 2px;
		list-style: none;
		padding: 0;
	}

	.dice__result {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		border: 1px solid white;
		border-radius: 4px;
		color: white;
		padding-bottom: 4px;

		&---1 {
			color: #e74646;
		}

		&--1 {
			color: #8aea8a;
		}
	}

	button {
		background: white;
		border: 1px solid white;
		border-radius: 8px;
		padding: 0 8px;
		cursor: pointer;
	}

	&__setter {
		font-size: 4px;
		padding: 2px!important;
		width: 8px;
		height: 8px;


	}

	&__res {
		width: 16px;
		text-align: center;
		font-size: 12px;
	}
}

</style>
