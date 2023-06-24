export default defineNuxtRouteMiddleware((to, from) => {
    if (to.meta.consoleBg) {
        console.log(`Go to console page ${to.path}`)
        const nuxtApp = useNuxtApp()
    }
})