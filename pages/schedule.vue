<script setup lang="ts">

const { $client } = useNuxtApp()

const res = localStorage.getItem('M.6/5')!

const [forYear, forRoom] = res.slice(2).split('/').map(num => parseInt(num))

const { data } = $client.schedule.table.useQuery({
    forClass: forRoom,
    forYear: forYear
})

const schedules = computed(() => {
    if (data.value) {
        return formatSchedule(data.value)
    } 
})

</script>

<template>
    <main>
        <Card elevated yscroll>
            <h2 class="mb-16 mt-4"> Schedule {{ forYear }}/{{ forRoom }} </h2>
            <ScheduleTable v-if="schedules" :schedules="schedules" />
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