import {Weapon as IWeapon, WeaponModifier, WeaponQuality} from '../types'
import {objectsSum} from "../utils";
import {WeaponType} from "./WeaponType";


export class Weapon implements IWeapon {
    public readonly name: string
    public readonly type: WeaponType
    public readonly quality: WeaponQuality
    public readonly minDamage: number
    public readonly maxDamage: number
    public readonly hitChance: number
    public readonly criticalChance: number
    public readonly criticalMultiplier: number
    public readonly bonus?: WeaponModifier
    public readonly penalty?: WeaponModifier

    constructor(props: IWeapon) {
        this.name = props.name
        this.type = props.type
        this.quality = props.quality
        this.minDamage = props.minDamage
        this.maxDamage = props.maxDamage
        this.hitChance = props.hitChance
        this.criticalChance = props.criticalChance
        this.criticalMultiplier = props.criticalMultiplier
        this.bonus = props.bonus
        this.penalty = props.penalty
    }

   stats(bonus = false, penalty = false): WeaponModifier {
        return objectsSum<WeaponModifier>({
            minDamage: this.minDamage,
            maxDamage: this.maxDamage,
            hitChance: this.hitChance,
            criticalChance: this.criticalChance,
            criticalMultiplier: this.criticalMultiplier
        },
            this.bonus,
            this.penalty,
            this.type.stats(bonus, penalty)
        )
    }






}
