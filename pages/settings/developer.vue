<template>
    <!-- <iframe width="942" height="530" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="Rick Astley - Never Gonna Give You Up (Official Music Video)" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe> -->
    <Test />
    <h1> ---- </h1>
    <Autocomplete :formatForDisplay="() => '1'"/>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'settings',
    consoleBg: true,
})

</script>

<style scoped></style>