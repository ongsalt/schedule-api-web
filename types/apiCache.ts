export type APICache<T> = {
    data: T,
    lastUpdated: number, // Timestamps
}

export function toAPICache<T>(data: T): APICache<T> {
    return {
        data,
        lastUpdated: Date.now()
    }
}