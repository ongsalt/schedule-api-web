export type KeyMeta = {
    displayText: string,
    description?: string
    mutable: boolean,
    autocompleteResolver?: (query: string) => Promise<object & {
        id: number
    }[]>,
    formatForDisplay?: (data: any) => string,
    autocompleteFormat?: (data: any) => string,
    validate?: (data: any) => boolean,
    notRequire?: boolean
} 