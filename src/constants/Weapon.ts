import { WeaponProps, WeaponQuality } from '../entities/Weapon'
import { Fist } from './Weapons'

export const DEFAULT_FIST_PROPS: WeaponProps = {
	name: 'Fist',
	type: Fist,
	minDamage: 0,
	maxDamage: 4,
	criticalChance: 0.2,
	criticalMultiplier: 1.5,
	hitChance: 1,
	quality: WeaponQuality.Common
}
