<template>
    <Transition name="slide">
        <div class="container" v-if="show">
            <div class="bar">
                <p> {{ text ?? "You have made an unsaved change" }} </p>
                <LoadingAsyncButton :action="action" title="Save" overided-theme />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    action: () => any
    text?: string
    show: boolean
}>()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: translate 0.5s cubic-bezier(.18, 1.4, .5, 1.02), scale 0.5s var(--ease-ios);
}

.slide-enter-from,
.slide-leave-to {
    translate: 0 100px;
    scale: .8;
}

.container {
    position: fixed;
    bottom: 24px;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
}

.bar {
    display: flex;
    align-items: center;
    gap: 24px;
    width: fit-content;
    background-color: var(--color-blue500);
    color: white;
    border-radius: 12px;
    padding: 6px;
    padding-left: 12px;
    box-shadow: 0px 8px 12px var(--color-blue-trans);
}

button {
    background-color: var(--color-blue600);
}

button:hover {
    background-color: var(--color-blue700);
}
</style>