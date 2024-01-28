import { WeaponProps, LootQuality } from '../entities/Weapon'
import { Knuckles } from '@/constants/Weapons'

export const DEFAULT_FIST_PROPS: WeaponProps = {
	name: 'Fist',
	type: Knuckles,
	minDamage: 0,
	maxDamage: 2,
	quality: LootQuality.Common
}
