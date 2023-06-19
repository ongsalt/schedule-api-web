<script lang="ts" setup>
const searchMode = 1
</script>

<template>
  <section>
    <h1 class="mb-32 "> What you looking for? </h1>
    <div class="filter-list">
      <div class="filter">
        <h2 class=""> Which class?
          <span class="highlight"> M.6/5 </span>
        </h2>
      </div>
      <div class="filter">
        <h2 class=""> In
          <span class="highlight"> Wednesday </span>

        </h2>
      </div>
      <div class="filter">
        <h2 class=""> Period
          <span class="highlight"> 8 </span>

        </h2>
      </div>
      <div class="filter">
        <h2 class=""> At <span class="highlight"> 2305 </span>
        </h2>
      </div>
      <div class="filter">
        <h2 class=""> Studying <span class="highlight"> Science </span>
        </h2>
      </div>
    </div>
    <button class="highlight add"> Add filter </button>
  </section>
  <div class="divider small-screen"></div>
  <CardGrid>
    <ScheduleCard classroom="1210" teacher="Apasri" subject="Light and modern physics" mode="current" id="ว23102"
      meta="Wed • 1" />
    <ScheduleCard classroom="42069" class-target="6/5" teacher="Yomum" subject="jhgyfueyguhi" mode="next" id="ค42069"
      meta="Wed • 2" />
    <ScheduleCard classroom="177013" subject="jhgyfueyguhi" mode="free" id="ค42069" meta="Wed • 3" />
    <ScheduleCard classroom="2305" teacher="Kaoyum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="Wed • 4" />
    <ScheduleCard classroom="42069" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="Wed • 5" />
    <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="Wed • 6" />
    <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="Wed • 7" />
    <ScheduleCard classroom="42069" teacher="Yomum" subject="jhgyfueyguhi" mode="random" id="ค42069" meta="Wed • 8" />
  </CardGrid>
</template>

<style scoped>
.highlight {
  color: var(--color-accent);
  padding: 2px 8px;
  border-radius: 8px;
  background-color: var(--color-accent-trans);
  font-size: 2rem;
  /* border: 1px solid var(--color-accent); */
}

.add {
  opacity: .6;
  line-height: 1;
  background-color: transparent;
  padding: 4px 10px;
  border: 3px solid var(--color-accent);
  border-style: dashed;
  transition: opacity .2s;
  /* display: inline-block; */
}

.add:hover {
  opacity: 1;
}

.filter {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter>h2 {
  padding-top: 2px;
  padding-bottom: 2px;
}

.divider {
  height: 1px;
  width: 100%;
  /* background-color: red; */
  margin: 32px 0;
  border-bottom: 1px solid var(--color-border);
}
</style>
