import { renderTrpcPanel } from "trpc-panel"
import { appRouter } from "~/server/trpc/routers"

export default defineEventHandler(event => {
    event.node.res.end(
        renderTrpcPanel(appRouter, {
            url: "http://localhost:3000/api/trpc"
        })
    )
})