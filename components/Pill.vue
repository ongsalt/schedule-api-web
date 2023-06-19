<template>
    <span :class="[varient, { lightLine: light }]">
        <slot />
    </span>
</template>

<script setup lang="ts">

type PillVarient = "light" | "outline" | "defualt"


const { varient, light } = defineProps<{ varient: PillVarient, light?: boolean }>()

</script>

<style scoped>

.outline {
    border: 1px solid black;
    padding: 8px 12px;
    border-radius: 9999px;
}
.outline.lightLine {
    border: 1px solid white;
}

.light {
    color: var(--color-accent);
    background-color: var(--color-accent-trans);
}
.defualt {

}
</style>