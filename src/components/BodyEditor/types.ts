export enum BodyPart {
	Head,
	Jaws,
	Eyes,
	Neck,
	Shoulder,
	UpperArm,
	Elbow,
	LowerArm,
	Wrist,
	Fingers,
	Chest,
	Stomach,
	Groin,
	UpperLeg,
	Knee,
	LowerLeg,
	Foot,
	Back,
	Tail,
	Wing
}

// Интерфейсы
export interface Organ {
	id: string
	name: string
	critical: boolean
	vulnerability: number
	impactOnSurvival: number
}

export interface CanvasData {
	x: number
	y: number
	size: number
	aspectRatio: number
	shape: 'rectangle' | 'circle' | 'triangle'
	rotationAngle: number
	coordinates?: number[][]
}

export interface BodyPartData {
	name: string
	organs: Organ[]
	connectedWith: string[]
	canvasData: CanvasData
}

export type CharacterBody = Record<string, BodyPartData>

export interface Creature {
	name: string
	constitution: number
	bodyParts: CharacterBody
}

export interface RenderConfig {
	canvasSize: number
	shiftX: number
	shiftY: number
	scale: number
	bodyPartColor: string
	connectionColor: string
}
