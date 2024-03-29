import { WeaponType } from '@/entities/WeaponType'
import { WeaponRange, WeaponSlot } from '@/types'

export const Rifle = new WeaponType({
	name: 'Rifle',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 15,
	minEffectiveDistance: 30,
	maxEffectiveDistance: 60,
	maxDistance: 300,
	hitChance: 0.75,
	generationData: {
		damageMultiplier: 1.3
	},
	advantage: {
		diceResult: +1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Pistol = new WeaponType({
	name: 'Pistol',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 6,
	minEffectiveDistance: 15,
	maxEffectiveDistance: 30,
	maxDistance: 60,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 1.2
	},
	advantage: {
		diceResult: +1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Crossbow = new WeaponType({
	name: 'Crossbow',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 10,
	minEffectiveDistance: 15,
	maxEffectiveDistance: 30,
	maxDistance: 60,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 1.1
	},
	advantage: {
		diceResult: +1
	},
	disadvantage: {}
})

export const Bow = new WeaponType({
	name: 'Bow',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 6,
	minEffectiveDistance: 10,
	maxEffectiveDistance: 30,
	maxDistance: 40,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 1
	},
	advantage: {
		diceResult: +1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const ThrowingKnife = new WeaponType({
	name: 'Throwing Knife',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 6,
	minEffectiveDistance: 6,
	maxEffectiveDistance: 20,
	maxDistance: 25,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 0.95
	},
	advantage: {
		diceResult: +1
	},
	disadvantage: {}
})

export const Whip = new WeaponType({
	name: 'Whip',
	range: WeaponRange.Ranged,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 6,
	maxEffectiveDistance: 15,
	maxDistance: 17,
	hitChance: 0.66,
	generationData: {
		damageMultiplier: 0.4
	},
	advantage: {},
	disadvantage: {}
})

export const Longsword = new WeaponType({
	name: 'Longsword',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 1.5,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 6,
	maxDistance: 7,
	generationData: {
		damageMultiplier: 1.3
	},
	hitChance: 0.65,
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Spear = new WeaponType({
	name: 'Spear',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 3,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 6,
	maxDistance: 6,
	hitChance: 0.85,
	generationData: {
		damageMultiplier: 1
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Scythe = new WeaponType({
	name: 'Scythe',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 3,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 6,
	maxDistance: 6,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 1.2
	},
	advantage: {},
	disadvantage: {}
})

export const Pitchfork = new WeaponType({
	name: 'Pitchfork',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 3,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 6,
	maxDistance: 6,
	hitChance: 0.9,
	generationData: {
		damageMultiplier: 0.9
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Battleaxe = new WeaponType({
	name: 'Battleaxe',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 3,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 5,
	maxDistance: 6,
	hitChance: 0.6,
	generationData: {
		damageMultiplier: 1.45
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const BattleHammer = new WeaponType({
	name: 'Battle Hammer',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand, WeaponSlot.Hand],
	minDistance: 2,
	minEffectiveDistance: 4,
	maxEffectiveDistance: 5,
	maxDistance: 5,
	hitChance: 0.7,
	generationData: {
		damageMultiplier: 1.4
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Flail = new WeaponType({
	name: 'Flail',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 2,
	minEffectiveDistance: 3,
	maxEffectiveDistance: 4,
	maxDistance: 5,
	hitChance: 0.78,
	generationData: {
		damageMultiplier: 1.1
	},
	advantage: {},
	disadvantage: {
		diceResult: -1
	}
})

export const Mace = new WeaponType({
	name: 'Mace',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0.5,
	minEffectiveDistance: 3,
	maxEffectiveDistance: 4,
	maxDistance: 4,
	hitChance: 0.85,
	generationData: {
		damageMultiplier: 1
	},
	advantage: {},
	disadvantage: {
		diceResult: -1
	}
})

export const Sword = new WeaponType({
	name: 'Sword',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0.5,
	minEffectiveDistance: 2,
	maxEffectiveDistance: 3,
	maxDistance: 4,
	hitChance: 0.9,
	generationData: {
		damageMultiplier: 1
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Saber = new WeaponType({
	name: 'Saber',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0.5,
	minEffectiveDistance: 2,
	maxEffectiveDistance: 3,
	maxDistance: 4,
	hitChance: 0.9,
	generationData: {
		damageMultiplier: 1
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Axe = new WeaponType({
	name: 'Axe',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 1,
	minEffectiveDistance: 2,
	maxEffectiveDistance: 3,
	maxDistance: 3,
	hitChance: 0.85,
	generationData: {
		damageMultiplier: 1.1
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Club = new WeaponType({
	name: 'Club',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 1,
	maxEffectiveDistance: 3,
	maxDistance: 3,
	hitChance: 1,
	generationData: {
		damageMultiplier: 0.7
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {}
})

export const Katar = new WeaponType({
	name: 'Katar',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 0,
	maxEffectiveDistance: 2,
	maxDistance: 3,
	hitChance: 0.9,
	generationData: {
		damageMultiplier: 1.1
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: { diceResult: -1 }
})

export const Dagger = new WeaponType({
	name: 'Dagger',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 0,
	maxEffectiveDistance: 2,
	maxDistance: 2,
	hitChance: 1,
	generationData: {
		damageMultiplier: 0.9
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Shield = new WeaponType({
	name: 'Shield',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 0,
	maxEffectiveDistance: 1,
	maxDistance: 1,
	hitChance: 0.65,
	generationData: {
		damageMultiplier: 0.65
	},
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	}
})

export const Knuckles = new WeaponType({
	name: 'Knuckle',
	range: WeaponRange.Melee,
	weaponSlots: [WeaponSlot.Hand],
	minDistance: 0,
	minEffectiveDistance: 0,
	maxEffectiveDistance: 1,
	maxDistance: 1,
	hitChance: 1,
	advantage: {
		diceResult: 1
	},
	disadvantage: {
		diceResult: -1
	},
	generationData: {
		damageMultiplier: 0.8
	}
})
export const ALL_WEAPON_TYPES = [
	Rifle,
	Pistol,
	Crossbow,
	Bow,
	ThrowingKnife,
	Whip,
	Longsword,
	Spear,
	Scythe,
	Pitchfork,
	Battleaxe,
	BattleHammer,
	Flail,
	Mace,
	Sword,
	Saber,
	Axe,
	Club,
	Katar,
	Dagger,
	Shield,
	Knuckles
]
