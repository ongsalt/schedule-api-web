export type KeyMeta = {
    displayText: string,
    description?: string
    mutable: boolean,
    autocompleteResolver?: () => Promise<{
        title: string,
        description: string
    }[]>,
    formatForDisplay?: (data: any) => string,
    validate?: (data: any) => boolean,
    notRequire?: boolean
}