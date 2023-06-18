<script setup lang="ts">
type Props = {
    action: () => any,
    title: string,
    icon?: string,
    disabled?: boolean,
    color?: string
}

const { action, disabled, color } = defineProps<Props>()
const isLoading = ref(false)

const onClick = async () => {
    isLoading.value = true
    await action()
    isLoading.value = false
}

</script>

<template>
    <button @click="onClick" class="action" :disabled="disabled ?? false">
        <div class="container" :class="{ loading: isLoading }">
            <Icon v-if="icon" :id="icon" size="20"/>
            {{ title }}
        </div>
        <div v-if="isLoading" class="loadingContainer">
            <LoadingIndicator color="var(--color-accent)" :size="10" :weight="2"/>
        </div>
    </button>
</template>

<style scoped>

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.loadingContainer {
    position: absolute;
    align-items: center;
    justify-content: center;
    display: flex;
}

.loading {
    opacity: 0;
}

</style>