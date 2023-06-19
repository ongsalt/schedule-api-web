<script lang="ts" setup>

import ScheduleCard from '~/components/ScheduleCard.vue';
import { formatSchedule } from '~/utils/format';
import { getRandomSubjects } from '~/utils/mockup'
const s = getRandomSubjects(5, 9)
const formatted = formatSchedule(s)

console.log(s)
console.log(formatted)

</script>

<template>
  <main>

    <ScheduleCard classroom="1210" teacher="Apasri" subject="Light and modern physics"/>
    
    <div class="card expand">
      <div class="horizontal h-space">
        <h2> Table </h2>
        <div>
          <Icon id="tune"/>
        </div>
      </div>
      <ScheduleTable :schedules="formatted" /> 
    </div>
    <ScheduleCard classroom="1210" teacher="Apasri" subject="Light and modern physics" mode="Upcoming"/>
  </main>
</template>

<style scoped>
main {
  margin-top: 64px;
  padding: 12px;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 360px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}
.expand {
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: span 2;

  padding: 12px 18px;
  overflow-y: auto;
}

</style>
