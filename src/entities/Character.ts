import {ArmorSlot, Character as ICharacter, CharacterSize, CharacterStats,} from '../types'

export class Character implements ICharacter {
    public readonly name: string
    public readonly luck: number
    public readonly size: CharacterSize
    public currenHealthPoints: number
    public maxHealthPoints: number
    public readonly slots: ArmorSlot[]
    public stats: CharacterStats



    constructor(props: ICharacter) {
        this.name = props.name
        this.luck = props.luck
        this.size = props.size
        this.slots = props.slots
        this.size = props.size
        this.stats = props.stats
        this.wounds = props.wounds
    }

    private getInitialMaxHitPoints() {

    }
}
