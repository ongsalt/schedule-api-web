<template>
    <Card class="sc-card" :class="colorMode">
        <div>
            <h2> Done </h2>
        </div>
    </Card>
</template>

<script setup lang="ts">

type ColorMode = "vibrant" | "accent" | "deep" | "surface" | "normal"

const { colorMode } = defineProps<{
    colorMode: ColorMode 
}>()

</script>

<style scoped>
.sc-top {
    margin-bottom: 32px;
}

.top {
    margin-bottom: 6px;
}

.anchor-bottom {
    align-items: end;
}

.sc-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.current {
    background: var(--color-accent300);
    background: linear-gradient(325deg, var(--color-accent) 45%, var(--color-accent300) 100%);

    background-color: var(--color-accent);
    box-shadow: 0px 2px 8px var(--color-accent-trans);

    
    transition: all .3s;
}


.next {
    background-color: rgb(18, 69, 64, 1);
    background-image: radial-gradient(circle, rgba(45, 112, 92, 1) 20%, rgba(18, 69, 64, 1) 90%);
    color: var(--color-bg);

}
</style>