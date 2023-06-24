
type BackgroundMode = "immersive" | "console"

export function useColorTheme() {
    const backgroundMode = useState<BackgroundMode>("backgroundMode")

    return {
        backgroundMode
    }
}