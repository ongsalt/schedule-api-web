<script lang="ts" setup>
import { ScheduleFilter } from '~/types/schedule';

const text = ref("")
const autocompletePopup = ref()

// onMounted(() => {
//   autocompletePopup.value.style.top = '0px'
// })

const filter: ScheduleFilter = ref({
  
})

const print = (event: any) => console.log(event.target.innerText)

</script>

<template>
  <CommonContainer>
    <section>
      <h1 class="mb-32 "> Search </h1>
      <div class="filter-list">
        <div class="filter" ref="filterClass">
          <h2 class=""> Class
            <span class="highlight" contenteditable @input="print"> M.6/5 </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" />
        </div>
        <div class="filter" ref="filterDay">
          <h2 class=""> In
            <span class="highlight" contenteditable> Wednesday </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" />
        </div>
        <div class="filter" ref="filterPeriod">
          <h2 class=""> Period
            <span class="highlight" contenteditable> 8 </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" />
        </div>
        <div class="filter" ref="filterRoom">
          <h2 class=""> At
            <span class="highlight" contenteditable> 2305 </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" />
        </div>
        <div class="filter" ref="filterSubjectName">
          <h2 class=""> Studying
            <span class="highlight" contenteditable> Science </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" />
        </div>
      </div>
      <button class="highlight add"> Add filter
        <Icon id="keyboard_return" size="1.5rem" />
      </button>
      <!-- <div class="autocomplete" ref="autocompletePopup">
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
      </div> -->
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
  </CommonContainer>
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

.delete {
  transition: all .3s;
  color: transparent;
}

.delete:hover {
  color: var(--color-text) !important;
}

.filter:hover .delete {
  color: var(--color-contrast);
}

.add {
  opacity: .6;
  line-height: 1;
  background-color: transparent;
  padding: 4px 10px;
  border: 3px solid var(--color-accent);
  border-style: dashed;
  transition: opacity .2s;
  align-items: end;
  /* display: inline-block; */
}

.add:hover {
  opacity: 1;
}

.filter {
  display: flex;
  align-items: center;
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

input.highlight {
  display: inline;
  width: fit-content;
  box-sizing: border-box;
  max-width: 100%;
  border: none;
  font-weight: inherit;
  outline: none;
}

.autocomplete {
  margin: 0;
  padding: 0;
  position: absolute;
  background-color: var(--color-bg);
  overflow-y: hidden;
  border: 1px solid var(--color-contrast);
  box-shadow: var(--shadow0);
  border-radius: 6px;
}

.autocomplete li {
  margin: 2px;
  border-radius: 4px;
  padding: 2px 6px;
  text-indent: 0;
  list-style: none;
}

.autocomplete li:hover,
.autocomplete li:focus {
  background-color: var(--color-accent-trans);
  color: var(--color-accent700);
  outline: none;
}

.page-enter-from,
.page-leave-to {
  top: 0px;
}
</style>
