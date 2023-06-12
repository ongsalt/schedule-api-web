<script lang="ts" setup>

useHead({
    // title: route.name as Title,
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter"
        }
    ]
})
</script>

<template>
    <div>
        <!-- <div class="background">
        </div> -->
        <div class="grid grid-cols-2 w-screen h-screen m-0">
            <div class="flex justify-center items-center">
                <div>
                    <img src="/favicon.ico" alt="profile image" class="logo">
                    <h1>School Schedule bot</h1>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    position: absolute;
    z-index: 0;
    width: 100vw;
    height: 100vh;

    background-color: var(--color-bg);
    opacity: 0.1;
    background-image: repeating-radial-gradient(circle at 0 0, transparent 0, var(--color-bg) 48px), repeating-linear-gradient(var(--color-surface), var(--color-text-secondary));
}
</style>
