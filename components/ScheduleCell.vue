<template>
    <div v-if="schedule">
        <p class="pm-0 name"> {{ name }} </p>
        <p class="pm-0 teacher"> {{ teacher }} </p>
        <p class="pm-0 secondary"> {{ code }} </p>
        <p class="pm-0 secondary"> {{ room }} </p>
    </div>
    <div v-else>
        <p class="pm-0"> No data </p>
    </div>
</template>

<script setup lang="ts">
import { Schedule } from '~/types/schedule';

const { schedule } = defineProps<{ schedule?: Schedule }>()

// console.log(schedule)

const code = schedule?.subject.code
const name = schedule?.subject.name
const teacher = schedule?.subject.teacher.name
const room = schedule?.room

</script>

<style scoped>

</style>