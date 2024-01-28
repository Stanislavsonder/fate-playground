import { defineStore } from 'pinia'
import { Weapon } from '@/entities/Weapon'
import { ref } from 'vue'
import { Armor } from '@/entities/Armor'

export const AppStore = defineStore('appStore', () => {
	const savedWeapon = ref<Weapon[]>([])
	const savedArmor = ref<Armor[]>([])

	function saveWeapon(weapon: Weapon) {
		savedWeapon.value.push(weapon)
	}

	function saveArmor(armor: Armor) {
		savedArmor.value.push(armor)
	}

	function removeWeapon(weapon: Weapon) {
		savedWeapon.value = savedWeapon.value.filter(e => e !== weapon)
	}

	function removeArmor(armor: Armor) {
		savedArmor.value = savedArmor.value.filter(e => e !== armor)
	}

	return {
		savedWeapon,
		saveWeapon,
		removeWeapon,
		savedArmor,
		saveArmor,
		removeArmor
	}
})
