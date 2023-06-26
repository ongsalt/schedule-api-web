<template>
    <Transition>
        <div v-if="isShow" class="background" :style="{ backgroundColor: color }" @click="hide">
            <slot />
        </div>
    </Transition>
</template>

<script setup lang="ts">
type PropsType = {
    isShow: boolean,
    hide?: () => void,
    color?: string
}

const props = defineProps<PropsType>()

const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        if (props.hide && props.isShow) {
            console.log("Trigger hide using ESC")
            props.hide()
        }
    }
}

watch(props, (it) => {
    if (it.isShow) {
        document.addEventListener('keyup', listener)
    } else {
        document.removeEventListener('keyup', listener)
    }
})

</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    transition: opacity .4s;
    background-color: rgba(0, 0, 0, 0.6);
}

.v-enter-active,
.v-leave-active {
    transition: opacity .3s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>