export type ResultOkVarient<T> = {
    ok: true,
    data: T
}
export type ResultErrorVarient = {
    ok: false,
    reason: any
}

export type Result<T> = ResultOkVarient<T> | ResultErrorVarient

export const Ok = <T>(data: T): ResultOkVarient<T> => ({
    ok: true,
    data
})

export const Err = (reason: string): ResultErrorVarient => ({
    ok: false,
    reason
})

export const Unwrap = <T>(result: Result<T>): T => {
    if (!result.ok) {
        throw createError({
            statusCode: 500,
            message: "Unhandled internal server error"
        })
    }
    return result.data
}