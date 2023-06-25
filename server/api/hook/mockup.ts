import { z } from "zod"
import { mockupDatabase } from "~/server/service/mockup"

function isNumeric(str: string) {
    return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}


export default defineEventHandler(async event => {

    const params = getQuery(event)

    console.log("[hook] Triggering mockup")
    console.log(params)

    if (!params?.year || !params?.class) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Missing \'year\' and \'class\' query'
        }))
    }

    const mayBeYear = z.string().safeParse(params.year)
    const mayBeClass = z.string().safeParse(params.class)

    if (!mayBeYear.success || !mayBeClass.success) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Query \'year\' or/and \'class\' is not int.'
        }))
    }

    if (!isNumeric(mayBeYear.data) || !isNumeric(mayBeClass.data)) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Query \'year\' or/and \'class\' is not int.'
        }))
    }

    await mockupDatabase(parseInt(mayBeClass.data), parseInt(mayBeYear.data))

    return {
        ok: true
    }
})