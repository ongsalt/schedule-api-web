<script lang="ts" setup>

import { formatSchedule } from '~/utils/format';
import { getRandomSubjects } from '~/utils/mockup'
const s = getRandomSubjects(5, 9)
const formatted = formatSchedule(s)

console.log(s)
console.log(formatted)

</script>

<template>
  <main>

    <CurrentInfo classroom="1210" teacher="Apasri" subject="Light and modern physics"/>
    
    <div class="card expand">
      <h2> Main </h2>
      <ScheduleTable :schedules="formatted" /> 
    </div>
    <div class="card">
      <h3> Yomum 2 </h3>
    </div>
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
  grid-template-rows: auto 1fr;
  gap: 12px;
}
.expand {
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: span 2;
}

.drop {
  background-color: var(--color-accent100);
}
</style>
