<template>
    <Transition>
        <div v-if="isShow" class="background" :style="{ backgroundColor: color }">
        </div>
    </Transition>
</template>

<script setup lang="ts">
type PropsType = {
    isShow: boolean,
    hide?: () => void,
    color?: string
}

const { isShow, hide, color } = defineProps<PropsType>()
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
</style>