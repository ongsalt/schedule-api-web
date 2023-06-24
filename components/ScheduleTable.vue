<template>
    <div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th> Period </th>
                    <th v-for="a in period"> {{ a }} </th>
                </tr>
                <tr>
                    <th> Time </th>
                    <th v-for="a in period"> {{ formatRange(boundaries[a - 1]) }} </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in day">
                    <td> {{ days[d] }} </td>
                    <td v-for="a in period"> <ScheduleCell :schedule="schedules[d-1][a-1]"/> </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import ScheduleCell from '~/components/ScheduleCell.vue';
import { Schedule } from '~/types/schedule';
import { days, getTimeBoundary } from '~/utils/datetime'
import { formatRange } from '~/utils/format'


const timePerPeriod = 50 // Minutes


const { schedules } = defineProps<{
    schedules: (Schedule | undefined)[][]
}>()

const period = schedules.reduce((previous, day) => {
    return Math.max(previous, day.length)
}, 0)

const day = schedules.length
const boundaries = getTimeBoundary(period, timePerPeriod)

</script>

<style scoped>
.schedule-table th,.schedule-table td,table.schedule-table {
    border: 1px solid var(--color-border);
    text-align: center;
    padding: 4px 8px;
}

.schedule-table {
    border-collapse: collapse;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    width: 100%;
}
</style>