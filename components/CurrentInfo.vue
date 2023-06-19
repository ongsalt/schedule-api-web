<template>
    <div class="card drop">
        <h4 class="sub"> Current subject </h4>
        <h2 class="mb-32"> {{ subject }} </h2>
        <h4 class="sub"> Classroom </h4>
        <h3 class="mb-32"> {{ classroom }} </h3>
        <h4 class="sub"> Teacher </h4>
        <h3 class="mb-32"> {{ teacher }} </h3>
    </div>
</template>

<script setup lang="ts">
const { subject, classroom, teacher } = defineProps<{
    subject: string,
    classroom: string,
    teacher: string
}>()
</script>

<style scoped></style>