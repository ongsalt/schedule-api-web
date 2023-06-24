// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
    ],
    build: {
        transpile: ['trpc-nuxt']
    },
    css: ['~/assets/css/main.css', '~/assets/css/utility.css', '~/assets/css/colors.css'],
    app: {
        pageTransition: {
            name: 'page',
            mode: 'in-out'
        },
        head: {
            link: [
                {
                    rel: "stylesheet",
                    fetchpriority: "high",
                    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300,0..1,-50..200"
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter"
                }
            ]
        },
    }
})
