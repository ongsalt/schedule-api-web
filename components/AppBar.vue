<script setup lang="ts">

const { y } = useWindowScroll()
const isTop = computed(() => y.value > 0)

const isShow = ref(false) 

</script>

<template>
    <nav :class="{ collapse: isTop }">
        <SearchPopup :is-show="isShow" :hide="() => isShow = false"/>
        <NuxtLink href="/">
            <div class="horizontal">
                <img src="/favicon.ico" alt="Logo" class="logo">
                <h3 style="color: var(--color-text);" class="app-title"> Yomum </h3>
            </div>
        </NuxtLink>
        <div class="center">
            <NuxtLink href="/"> Home </NuxtLink>
            <NuxtLink href="/schedule"> Schedule </NuxtLink>
            <NuxtLink href="/about"> About </NuxtLink>
        </div>
        <div class="horizontal">
            <NuxtLink href="#" @click="isShow = !isShow">
                <CircularIcon id="crop_square" size="1.4rem" />
            </NuxtLink>
            <NuxtLink href="/search">
                <CircularIcon id="search" size="1.4rem" />
            </NuxtLink>
            <div class="small-screen horizontal">

                <CircularIcon id="view_day" size="1.4rem" />
                <NuxtLink href="/about">
                    <CircularIcon id="info" size="1.4rem" />
                </NuxtLink>
            </div>
            <NuxtLink href="/settings/time">
                <CircularIcon id="settings" size="1.4rem" />
            </NuxtLink>
        </div>
        <NuxtLoadingIndicator />
    </nav>
</template>


<style scoped>
.logo {
    height: 32px;
    aspect-ratio: 1/1;
    background-color: transparent;
}

.center {
    position: fixed;
    left: 50vw;
    width: fit-content;
    translate: -50% 0;
    right: 50vw;
    display: flex;
    gap: 36px;
    place-content: center;
}

.center>a {
    color: var(--color-text);
}

.center>a:hover {
    color: var(--color-accent700);
}



nav {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    padding: 12px 48px;
    gap: 12px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    box-sizing: border-box;
    z-index: 2;
    background-color: transparent;
    border-bottom: 1px solid transparent;
    backdrop-filter: blur(4px);
    transition: height .2s, padding .2s, background-color .2s, border-bottom .2s;
    height: 96px;
}

nav.collapse {
    /* padding: 0 48px; */
    background-color: var(--color-bg-trans);
    border-bottom: 1px solid var(--color-border);
    /* backdrop-filter: none; */
}

@media screen and (max-width: 640px) {
    .center {
        display: none;
    }

    nav {
        padding: 4px 24px;
    }
    nav.collapse {
        height: 64px;
    }
}

@media screen and (max-width: 320px) {
    .app-title {
        display: none;
    }
}
</style>