<template>
    <div class="card drop">
        <h4 class="sub"> {{ mode }} </h4>
        <h2 class="mb-32"> {{ subject }} </h2>
        <h4 class="sub"> Classroom </h4>
        <h3 class="mb-32"> {{ classroom }} </h3>
        <h4 class="sub"> Teacher </h4>
        <h3 class="mb-32"> {{ teacher }} </h3>
        <!-- <img class="bg" src="" alt=""> -->
    </div>
</template>

<script setup lang="ts">
const { subject, classroom, teacher, mode = 'Current subject' } = defineProps<{
    subject: string,
    classroom: string,
    teacher: string,
    mode?: string
}>()
</script>

<style scoped>

.drop {
  background-color: var(--color-accent100);
  position: relative;
}
</style>