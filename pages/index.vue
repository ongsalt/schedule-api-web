<script lang="ts" setup>
import { Schedule, ScheduleRecommendation } from '~/types/schedule';

const { $client } = useNuxtApp()

const classTarget = ref("M.6/5")
const isLoading = ref(false)
const schedules = ref<ScheduleRecommendation[]>([])

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
  console.log(forYear, forRoom)
  const data = await $client.schedule.getRecommend.query({
    forYear,
    forClass: forRoom
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
    <CardGrid v-if="schedules.length > 0">
      <ScheduleCard v-for="s in schedules" :classroom="s.room ?? ''" :teacher="s.teacherName" :subject="s.subjectName"
        :id="s.subjectCode" :meta="s.location" :large="s.location === 'Current'" />
    </CardGrid>
    <div class="blank" v-else>
      <h1> :-) </h1>
      <h2> School is end now </h2>
    </div>
  </CommonContainer>
</template>

<style scoped>
.hero {
  top: 35vh !important;
}

.blank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: .2;
  padding-bottom: 15vh;
}


.blank h1 {
  font-size: 10rem;
}


.page-enter-from,
.page-leave-to {
  top: 0px;
}
</style>
