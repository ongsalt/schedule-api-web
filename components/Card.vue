<template>
    <div class="card" :class="{ elevated: elevated, bordered: bordered }">
        <slot />
    </div>
</template>

<script setup lang="ts">
defineProps<{
    elevated?: boolean,
    bordered?: boolean
}>()
</script>

<style scoped>
.card {
    background-color: var(--color-bg);
    border-radius: 24px;
    padding: 18px 20px;
}

.elevated {
    box-shadow: var(--shadow1);
}

.bordered {
    border: 1px solid var(--color-border);
}
</style>