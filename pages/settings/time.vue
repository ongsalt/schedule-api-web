<template>
        <h2 class="mb-16"> Time </h2>
        <p class="mb-32"> Configure each period duration. </p>
        <div class="mb-16 labeled">
            <label for="time"> School start time </label>
            <input name="time" type="time">
        </div>
        <div class="labeled">
            <label for="time"> Period duration </label>
            <input name="duration" type="number">
        </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'settings',
    consoleBg: true,
    middleware: "settings"
})

</script>

<style scoped>
</style>