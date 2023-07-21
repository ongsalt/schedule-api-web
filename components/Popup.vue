<template>
    <Teleport to="body">
        <Transition name="bg">
            <div v-if="isShow" class="fullscreen background"> </div>
        </Transition>

        <Transition name="box">
            <div v-if="isShow" class="fullscreen" @click.self="hide">
                <div class="box">

                    <div class="header" v-if="title">
                        <h3> {{ title }} </h3>
                    </div>

                    <slot>
                        <p>We're no strangers to love You know the rules and so do I (do I) A full commitment's what I'm
                            thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta
                            make you understand Never gonna give you up Never gonna let you down Never gonna run around and
                            desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you
                        </p>
                    </slot>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
    isShow: boolean,
    hide: () => any,
    title?: string
}>()
</script>

<style scoped>
.header {
    margin: -24px -16px 16px -16px;
    padding: 12px 16px;
    /* background-color: red; */
    /* background-color: var(--color-active); */
    border-bottom: 1px solid var(--color-border);
}

.background {
    background-color: var(--color-bg-trans);
}

.fullscreen {
    z-index: 9999;
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 18px;
    box-sizing: border-box;
}

.box {
    box-shadow: var(--shadow0);
    background-color: var(--color-bg);
    border-radius: 12px;
    border: 1px solid var(--color-border);
    min-width: min(320px, calc(100vw - 12px));
    max-width: 640px;
    max-height: calc(100vh - 12px);
    box-sizing: border-box;
    padding: 24px 16px 12px 16px;
    overflow-y: auto;
}

.bg-enter-active,
.bg-leave-active {
    transition: opacity 0.3s ease;
}

.bg-enter-from,
.bg-leave-to {
    opacity: 0;
}


.box-enter-active,
.box-leave-active {
    transition: scale 0.3s var(--ease1), opacity .3s ease;
}

.box-enter-from,
.box-leave-to {
    scale: .95;
    opacity: 0;
}
</style>