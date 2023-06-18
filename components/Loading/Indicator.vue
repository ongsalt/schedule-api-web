<script setup lang="ts">
type PropsType = {
    size?: number,
    weight?: number,
    color?: string
}

const { size, color, weight } = defineProps<PropsType>()

const radius = Math.round(size ?? 20)
const lineWeigth = Math.round(weight ?? 3)
const boxSize = 2 * (radius + lineWeigth) + 2

const viewBox = `${boxSize / 2} ${boxSize / 2} ${boxSize} ${boxSize}`

</script>

<template>
    <div class="loader" :style="{ width: `${boxSize}px`, height: `${boxSize}px` }">
        <svg class="circular" :viewBox="viewBox">
            <circle class="path" :style="{ stroke: color ?? 'white', strokeWidth: `${lineWeigth}px` }" :cx="boxSize"
                :cy="boxSize" :r="radius"></circle>
        </svg>
    </div>
</template>

<style scoped>
.loader {
    margin: 0px auto;
}

.circular {
    animation: rotate 2s linear infinite;
}

.path {
    fill: none;
    stroke-linecap: round;
    animation: animate-stroke 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}



@keyframes animate-stroke {
    0% {
        stroke-dasharray: 1, 100;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 44, 100;
        stroke-dashoffset: -18;
    }

    100% {
        stroke-dasharray: 44, 100;
        stroke-dashoffset: -62;
    }
}
</style>