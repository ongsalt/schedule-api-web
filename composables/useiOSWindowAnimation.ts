export function useiOSWindowAnimation() {

    
    const isCovered = useState<boolean>("isCovered")

    if (process.client) {
        const app = document.getElementById('__nuxt')
        const body = document.body
        
        watch(isCovered, (value) => {
            console.log(value)
            if (value) {
                body.classList.add("blackBg")
                app?.classList.add("covered")
            } else {
                body.classList.remove("blackBg")
                app?.classList.remove("covered")
            }
        }, { immediate: true })
    }

    function reset() {
        isCovered.value = false
    }

    function shrink() {
        isCovered.value = true
    }

    return {
        isCovered,
        shrink,
        reset
    }
}