<template>
    <LoadingDimmed :hide="hide" :is-show="isShow" color="var(--color-bg-trans)" />
</template>

<script setup lang="ts">
type PropsType = {
    isShow: boolean,
    hide?: () => void,
}

const { isShow, hide, } = defineProps<PropsType>()

</script>

<style scoped></style>