<script setup lang="ts">
import { formatSchedule } from '~/utils/format';

const schedules = formatSchedule(getRandomSubjects(5, 8))

</script>

<template>
    <main>
        <Card elevated yscroll>
            <h2 class="mb-16 mt-4"> Schedule </h2>
            <ScheduleTable :schedules="schedules" />
        </Card>
    </main>
</template>


<style scoped>
main {
    padding: 12px 36px;
}

.card-padding {
    padding: 12px;
}
</style>