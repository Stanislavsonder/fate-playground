import { Character } from '@/entities/Character'
import { ChanceSheet, CharacterBody, CharacterBodySize, LootLevel, Skills, WeaponSlot } from '@/types'
import { copy, getRandomInt, getRandomWithChance, weightSheetToChances } from '@/helpers/utils'
import { BODY_SIZE_WEIGHT } from '@/constants/ArmorGenerator'
import WeaponGeneratorService from '@/services/weaponGenerator.service'
import ArmorGeneratorService from '@/services/armorGenerator.service'
import { DEFAULT_HUMAN_BODY, EMPTY_SKILL_SET } from '@/constants/Character'
import { ArmorType } from '@/constants/Armor'

type Props = {
	level: number
	lootLevel: LootLevel
	sizeWeight?: ChanceSheet<CharacterBodySize>
	weaponGenerator?: WeaponGeneratorService
	armorGenerator?: ArmorGeneratorService
	armorTypeChances?: ChanceSheet<ArmorType>
}

export default class CharacterGeneratorService {
	private readonly baseLevel: number = 1
	private readonly sizeWeight: ChanceSheet<CharacterBodySize> = copy(BODY_SIZE_WEIGHT)
	private readonly weaponGenerator: WeaponGeneratorService
	private readonly armorGenerator: ArmorGeneratorService

	constructor(props: Props) {
		this.baseLevel = props.level
		this.sizeWeight = props.sizeWeight ?? this.sizeWeight
		this.weaponGenerator =
			props.weaponGenerator ||
			new WeaponGeneratorService({
				level: props.level,
				lootLevel: props.lootLevel
			})
		this.armorGenerator =
			props.armorGenerator ||
			new ArmorGeneratorService({
				level: props.level,
				lootLevel: props.lootLevel,
				sizeWeight: this.sizeWeight,
				typeChances: props.armorTypeChances
			})
	}

	public generate(): Character {
		const name = this.getName()
		const luck = this.getLuck()
		const body = this.getBody()
		const skills = this.getSkills()

		const character = new Character({
			name,
			luck,
			body,
			skills
		})

		this.generateWeapon(character)
		this.generateFullArmorSet(character)

		return character
	}

	private getName(): string {
		return 'New Character'
	}

	private getLuck(): number {
		return getRandomInt(4) + 1
	}

	private getBody(): CharacterBody {
		const size = getRandomWithChance(weightSheetToChances(this.sizeWeight))
		const weaponSlots = [WeaponSlot.Hand, WeaponSlot.Hand]
		const armorSlots = copy(DEFAULT_HUMAN_BODY.armorSlots)

		return {
			size,
			weaponSlots,
			armorSlots
		}
	}

	private getSkills(): Skills {
		const skillNames = Object.keys(EMPTY_SKILL_SET) as (keyof Skills)[]
		const skills: Skills = copy(EMPTY_SKILL_SET)
		const skillsAmount = 20 + this.baseLevel ** 1.3
		for (let i = 0; i < skillsAmount; i++) {
			const skill = skillNames[getRandomInt(skillNames.length)]
			if (skills[skill].level === 10) {
				i--
				continue
			}
			skills[skill].level++
		}
		return skills
	}

	private generateFullArmorSet(character: Character) {
		let generations = 0
		while (character.freeArmorSlots.length > 0 && generations < 5000) {
			const armor = this.armorGenerator.generate()
			if (character.isArmorApliable(armor)) {
				character.addToInventory(armor)
				character.equipArmor(armor)
			}
			generations++
		}
	}

	private generateWeapon(character: Character) {
		const weapon = this.weaponGenerator.generate()
		if (character.isWeaponApliable(weapon)) {
			character.addToInventory(weapon)
			character.equipWeapon(weapon)
		}
	}
}
