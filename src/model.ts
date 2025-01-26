export type Result = {
    correct: boolean;
    message: string;
};

export interface ResultEvaluator {
    evaluate(): Result | null;
}

export class Unit {
    public readonly name: string
    public readonly multiplier: number;

    constructor(name: string, baseMultipler: number) {
        this.name = name;
        this.multiplier = baseMultipler;
    }

    public convert(quantity: number, target: Unit): number {
        const baseQuantity = quantity * this.multiplier;
        return baseQuantity / target.multiplier;
    }
}

export const WeightUnits = {
    g: new Unit("g", 1),
    dkg: new Unit("dkg", 10),
    kg: new Unit("kg", 1000),
} as const;

export const VolumeUnits = {
    mm: new Unit("ml", 1),
    cm: new Unit("cl", 10),
    dm: new Unit("dl", 100),
    m: new Unit("l", 1000),
} as const;

export const DistanceUnits = {
    mm: new Unit("mm", 1),
    cm: new Unit("cm", 10),
    dm: new Unit("dm", 100),
    m: new Unit("m", 1000),
} as const;

export function nextInt(min: number, max: number) {
    return Math.floor(min + Math.random() * (max - min));
}

export function pickOne<T>(values: T[]): T {
    return values[nextInt(0, values.length)];
}

export function pickTwo<T>(values: T[]): [T, T] {
    if (values.length < 2) {
        throw Error(`Input should have at least 2 items: ${values}`);
    }
    const firstIdx = nextInt(0, values.length);
    let secondIdx = nextInt(0, values.length);
    if (secondIdx == firstIdx) {
        secondIdx = (secondIdx + 1) % values.length;
    }
    return [values[firstIdx], values[secondIdx]];
}