<script setup lang="ts">

</script>

<template>
    <nav>
        <div class="horizontal">
            <img src="/favicon.ico" alt="Logo" class="logo">   
            <h4> School schedule bot </h4>
        </div>
        <ClassSelector />
    </nav>
</template>


<style scoped>
.logo {
    height: 32px;
    aspect-ratio: 1/1;
    background-color: transparent;
}

nav {
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    gap: 12px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-bg-trans);
    backdrop-filter: blur(4px);
}
</style>