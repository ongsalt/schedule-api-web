<script lang="ts" setup>
import { Schedule } from '~/types/schedule';


const { $client } = useNuxtApp()

const classTarget = ref("M.6/5")
const isLoading = ref(false)
const schedules = ref<Awaited<ReturnType<typeof $client.schedule.search.query>>>([])

const classRegex = /M\.[0-9]{1,}\/[0-9]{1,}/

onMounted(() => {
  const res = localStorage.getItem('M.6/5')
  if (res) {
    classTarget.value = res
  }
  fetchSchedules()
})

const fetchSchedules = async () => {
  isLoading.value = true
  const [forYear, forRoom] = classTarget.value.slice(2).split('/').map(num => parseInt(num))
  const data = await $client.schedule.search.query({
    forYear,
    forRoom
  })

  schedules.value = data
  console.log(schedules.value)
  localStorage.setItem('M.6/5', classTarget.value)
  isLoading.value = false
}

const onUpdateClassTarget = async () => {
  const pass = classRegex.test(classTarget.value)
  console.log(pass)
  if (!pass) return

  await fetchSchedules()
}
</script>

<template>
  <CommonContainer>
    <section class="hero">
      <h4 class="mb-16">
        <input type="text" class="inline light" v-model="classTarget" @change="onUpdateClassTarget">
      </h4>
      <h1 class="mb-32"> It's been a long day </h1>
      <p class="secondary mb-32"> Trick: just skip the class </p>
    </section>
    <CardGrid v-if="schedules.length !== 0">
      <ScheduleCard classroom="1210" teacher="Apasri" subject="Light and modern physics" mode="current" id="ว23102"
        meta="Current" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="next" id="ค42069" meta="Next" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="free" id="ค42069" meta="6" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="7" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="8" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="9" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="10" />
      <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="11" />
    </CardGrid>
  </CommonContainer>
</template>

<style scoped>
.hero {
  top: 35vh !important;
}
</style>
