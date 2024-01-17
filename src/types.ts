import {WeaponType as WeaponTypeClass} from './entities/WeaponType'
// Common
export enum CharacterSize {
    Tiny, // Фея, кролик
    Small, // Полурослик, гном, ребенок
    Medium, // Взрослый человек, +-
    Big, // Большой орк, 2+м человек,
    Giant, // Огромные существа
}

// Weapon
export enum WeaponQuality {
    Garbage,
    Common,
    Good,
    Skillful,
    Perfect,
    Legendary
}

export enum WeaponRange {
    Melee,
    Ranged
}

export type WeaponDistances = {
    minDistance: number
    minEffectiveDistance: number
    maxEffectiveDistance: number
    maxDistance: number
}

export type WeaponType = WeaponDistances & {
    name: string
    range: WeaponRange,
    bonus: WeaponModifier,
    penalty: WeaponModifier,
}

export type WeaponStats = {
    minDamage: number
    maxDamage: number
    hitChance: number
    criticalChance: number
    criticalMultiplier: number
}

export type WeaponModifier = Partial<WeaponStats> & Partial<WeaponDistances> &{
    diceResult?: number
}


export type Weapon = WeaponStats & {
    name: string
    type: WeaponTypeClass
    quality: WeaponQuality
    bonus?: WeaponModifier,
    penalty?: WeaponModifier
}

// Armor

export enum ArmorSlot {
    TopHead,
    Mask,
    Ears,
    Eyes,
    Eye,
    Nose,
    Neck,
    Shoulder,
    TopArm,
    Elbow,
    LowArm,
    Wrist,
    Fingers,
    Finger,
    Chest,
    Stomach,
    Back,
    Belt,
    Groin,
    TopLeg,
    Knee,
    LowLeg,
    Foot,
    Tail,
    Wing
}

export enum ArmorType {
    Cloth,
    Light,
    Medium,
    Heavy
}

export type ArmorModifier = {
    evadeChance?: number
    defence?: number,
    defenceMultiplier?: number
    moveDistance?: number
    moveDistanceMultiplier?: number
}

export type Armor = {
    name: string
    slots: ArmorSlot[]
    size: CharacterSize
    type: ArmorType
    defence: number
    bonuses?: ArmorModifier
    penalty?: ArmorModifier
}


// Character

export type CharacterStat = {
    level: number
    experience: number
}

export type CharacterStats = {
    agility: CharacterStat
    alchemy: CharacterStat
    charisma: CharacterStat
    constitution: CharacterStat
    contacts: CharacterStat
    craft: CharacterStat
    deceit: CharacterStat
    deduction: CharacterStat
    driving: CharacterStat
    fight: CharacterStat
    knowledge: CharacterStat
    lockpicking: CharacterStat
    magic: CharacterStat
    medicine: CharacterStat
    perception: CharacterStat
    provocation: CharacterStat
    resourced: CharacterStat
    shooting: CharacterStat
    stealth: CharacterStat
    theft: CharacterStat
    will: CharacterStat
}

export enum WoundLevel {
    Light,
    Medium,
    Hard,
}

export type SkillPenalty = {
    name: keyof CharacterStat
    value: number
}

export type WoundConsequence = {
    skills?: SkillPenalty[]
    diceResult?: number
    defence?: number
    evade?: number
    accuracy?: number
    minDamage?: number
    maxDamage?: number
    maxHealthPoints?: number
    slotsDisabled?: ArmorSlot[]
}

export type Wound = {
    description: string
    level: WoundLevel
    consequence: WoundConsequence
}

export type Character = {
    name: string
    luck: number
    size: CharacterSize
    currenHealthPoints: number
    maxHealthPoints: number
    weapon: Weapon
    armor: Armor
    slots: ArmorSlot[]
    stats: CharacterStats
    wounds: Wound[]
}
