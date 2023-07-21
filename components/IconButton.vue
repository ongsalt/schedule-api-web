<template>
    <CircularIcon v-bind="props" class="icon-button" @click="action" />
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number | string, color?: string, id: string, class?: string, action: () => any }>()

</script>

<style scoped>
.circle {
    background-color: transparent;
}

.circle:hover {
    background-color: var(--color-border);
}
</style>