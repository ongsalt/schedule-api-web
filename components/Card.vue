<template>
    <div class="card">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.card {
    background-color: var(--color-accent);
    border-radius: 24px;
    padding: 18px 20px;
}
</style>