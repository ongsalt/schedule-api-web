export type KeyMeta = {
    displayText: string,
    description?: string,
    multiple?: boolean,
    mutable: boolean,
    autocompleteResolver?: (query: string) => Promise<any[]>,
    formatForDisplay?: (data: any) => string,
    getDescriptionForDisplay?: (data: any) => string,
    autocompleteFormat?: (data: any) => string,
    validate?: (data: any) => boolean,
    notRequire?: boolean
} 