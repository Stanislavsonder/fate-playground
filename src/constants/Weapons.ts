import { WeaponType } from '@/entities/WeaponType'
import { WeaponRange } from '@/entities/Weapon'

export const Sword = new WeaponType({
	name: 'Sword',
	range: WeaponRange.Melee,
	minDistance: 0.5,
	minEffectiveDistance: 2,
	maxEffectiveDistance: 3,
	maxDistance: 4,
	bonus: {
		diceResult: 1,
		maxDamage: 10
	},
	penalty: {
		diceResult: -1
	}
})

export const Fist = new WeaponType({
	name: 'Human Fist',
	range: WeaponRange.Melee,
	minDistance: 0,
	minEffectiveDistance: 0,
	maxEffectiveDistance: 2,
	maxDistance: 3,
	bonus: {},
	penalty: {}
})

export const Bow = new WeaponType({
	name: 'Bow',
	range: WeaponRange.Ranged,
	minDistance: 6,
	minEffectiveDistance: 10,
	maxEffectiveDistance: 30,
	maxDistance: 40,
	bonus: {},
	penalty: {}
})
