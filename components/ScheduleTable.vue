<template>
    <div>
        <table class="schedule-table">
            <thead>
                <tr>
                    <th> ชั่วโมงที่ </th>
                    <th v-for="a in period"> {{ a }} </th>
                </tr>
                <tr>
                    <th> เวลา </th>
                    <th v-for="a in period"> {{ a }} </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="d in day">
                    <td> {{ d }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { Schedule } from '~/types/schedule';

const { schedules } = defineProps<{
    schedules: (Schedule | undefined)[][]
}>()

const period = schedules.reduce((previous, day) => {
    return Math.max(previous, day.length)
}, 0)

const day = schedules.length

</script>

<style scoped>
.schedule-table th,.schedule-table td,table.schedule-table {
    border: 1px solid var(--color-border);
    text-align: center;
    padding: 4px;
}

.schedule-table {
    border-collapse: collapse;
}
</style>