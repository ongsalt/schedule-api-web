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
        <div class="background">
        </div>
        <div class="parent">
            <div class="header">
                <div class="logoWrapper">
                    <img src="/favicon.ico" alt="profile image" class="logo">
                </div>
                <h1>School Schedule Bot</h1>
            </div>
            <div class="half">
                <div class="content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    margin-bottom: 40px;
}


h1 {
    font-weight: 600;
    margin-bottom: 0;
}

.logoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    height: 52px;
    aspect-ratio: 1/1;
    border: 1px solid var(--color-border);
    object-fit: cover;
    background-color: var(--color-bg);
}

.logo {
    height: 42px;
    aspect-ratio: 1/1;
    background-color: transparent;
}


.parent {
    min-height: 100vh;
    padding: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: pink; */
}

@media screen and (min-width: 450px) {
    .parent {
        width: 450px;
        margin-left: auto;
        margin-right: auto;
    }
}

@media screen and (min-width: 840px) {
    .parent {
        position: absolute;
        z-index: 1;
        width: 100vw;
        height: 100vh;
        padding: 0;
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
        justify-content: center;
    }

    .content {
        width: clamp(360px, 65%, 420px);
    }

    .background {
        position: absolute;
        z-index: 0;
        width: 100vw;
        height: 100vh;

        background-color: var(--color-bg);
        opacity: 0.1;
        background-image: repeating-radial-gradient(circle at 0 0, transparent 0, var(--color-bg) 48px), repeating-linear-gradient(var(--color-text), var(--color-text-secondary));
    }


    .header {
        place-self: center;
        max-width: fit-content;
    }

    .half {
        background-color: var(--color-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        border-left-style: solid;
        border-left-width: 1px;
        border-image: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%) 1 100%;
        box-sizing: border-box;
    }
}
</style>

