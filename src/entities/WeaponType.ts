import {WeaponModifier, WeaponRange, WeaponType as IWeaponType} from '../types'
import {objectsSum} from "../utils";


export class WeaponType implements IWeaponType {
    public readonly name: string
    public readonly range: WeaponRange
    public readonly minDistance: number
    public readonly minEffectiveDistance: number
    public readonly maxEffectiveDistance: number
    public readonly maxDistance: number
    public readonly bonus: WeaponModifier
    public readonly penalty: WeaponModifier

    constructor(props: IWeaponType) {
        this.name = props.name
        this.range = props.range
        this.minDistance = props.minDistance
        this.minEffectiveDistance = props.minEffectiveDistance
        this.maxEffectiveDistance = props.maxEffectiveDistance
        this.maxDistance = props.maxDistance
        this.bonus = props.bonus
        this.penalty = props.penalty
    }

   getMinDistance(bonus = false, penalty = false): number {
        return this.minDistance + (bonus? this.bonus.minDistance || 0 : 0) + (penalty? this.penalty.minDistance || 0 : 0)
   }

    getMaxDistance(bonus = false, penalty = false): number {
        return this.maxDistance + (bonus? this.bonus.maxDistance || 0 : 0) + (penalty? this.penalty.maxDistance || 0 : 0)
    }

    getMinEffectiveDistance(bonus = false, penalty = false): number {
        return this.minEffectiveDistance + (bonus? this.bonus.minEffectiveDistance || 0 : 0) + (penalty? this.penalty.minEffectiveDistance || 0 : 0)
    }

    getMaxEffectiveDistance(bonus = false, penalty = false): number {
        return this.maxEffectiveDistance + (bonus? this.bonus.maxEffectiveDistance || 0 : 0) + (penalty? this.penalty.maxEffectiveDistance || 0 : 0)
    }

    stats(bonus = false, penalty = false): WeaponModifier {
        return objectsSum<WeaponModifier>({
            minDistance: this.minDistance,
            maxDistance: this.maxDistance,
            minEffectiveDistance: this.minEffectiveDistance,
            maxEffectiveDistance: this.maxEffectiveDistance
        }, bonus && this.bonus, penalty && this.penalty)
    }

}
