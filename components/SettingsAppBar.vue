<script setup lang="ts">

</script>

<template>
    <nav >
        <NuxtLink href="/">
            <div class="horizontal">
                <img src="/favicon.ico" alt="Logo" class="logo">
                <h3 style="color: var(--color-text);"> Settings </h3>
                <p style="color: var(--color-contrast);"> / </p>
                <h3 style="color: var(--color-text);"> Time </h3>
            </div>
        </NuxtLink>

        <div class="horizontal">
            <NuxtLink href="#">
                <CircularIcon id="info" size="1.4rem" />
            </NuxtLink>

            <NuxtLink href="/logout">
                <CircularIcon id="logout" size="1.4rem" />
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
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    gap: 12px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* width: 100lvw; */
    /* box-sizing: border-box; */
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow0);
    height: 40px;
    z-index: 10;
    margin: 0;
}

@media screen and (max-width: 640px) {
    .center {
        display: none;
    }

}
</style>