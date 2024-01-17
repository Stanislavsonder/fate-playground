
export function objectsSum<T>(...objects: Record<string, number>[]): T {
    const result = {}
    for (const object of objects) {
        if (!object) {
            continue
        }

        for (const key in object) {
            if (result.hasOwnProperty(key)) {
                result[key] += object[key]
            } else {
                result[key] = object[key]
            }
        }
    }
    return result as T
}
