<script setup lang="ts">
import { formatSchedule } from '~/utils/format';

const schedules = formatSchedule(getRandomSubjects(5, 8))
</script>

<template>
    <main>
        <h2 class="mb-16"> Schedule </h2>
        <ScheduleTable :schedules="schedules" />
    </main>
</template>


<style scoped>
main {
    padding: 12px 36px;
}
</style>