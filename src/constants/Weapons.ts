import {WeaponType} from "../entities/WeaponType";
import {WeaponRange} from "../types";

export const Sword = new WeaponType({
    name: 'Sword',
    range: WeaponRange.Melee,
    minDistance: 0.5,
    minEffectiveDistance: 2,
    maxEffectiveDistance: 3,
    maxDistance: 4,
    bonus: {
       diceResult: 1
    },
    penalty: {
        diceResult: -1
    }
})
