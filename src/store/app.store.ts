import { defineStore } from 'pinia'
import { Weapon } from '@/entities/Weapon'
import { ref } from 'vue'

export const AppStore = defineStore('appStore', () => {
	const savedWeapon = ref<Weapon[]>([])

	function saveWeapon(weapon: Weapon) {
		savedWeapon.value.push(weapon)
	}

	function removeWeapon(weapon: Weapon) {
		savedWeapon.value = savedWeapon.value.filter(e => e !== weapon)
	}

	return {
		savedWeapon,
		saveWeapon,
		removeWeapon
	}
})
