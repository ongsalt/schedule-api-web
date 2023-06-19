<template>
    <div class="circle">
        <Icon :id="id" :size="size" :color="color || 'var(--color-text)'" :class="props.class" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number | string, color?: string, id: string, class?: string }>()

</script>

<style scoped>
.circle {
    aspect-ratio: 1/1;
    line-height: 1;
    border-radius: 50%;
    background-color: var(--color-border);
    height: 2.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .2s;
}

.circle:hover {
    background-color: var(--color-contrast);
}
</style>