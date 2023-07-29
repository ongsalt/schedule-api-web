<script lang="ts" setup>
import { ScheduleFilter, Schedule } from '~/types/schedule';
import { SearchCommand, FilterArgument } from '~/types/search';
import { daysShort } from '~/utils/datetime';

const { $client } = useNuxtApp()

const text = ref("")
const autocompletePopup = ref()
const isLoading = ref(false)
const schedules = ref<Schedule[]>([])

const commands: SearchCommand[] = [
  {
    key: "for",
    text: "Class",
    defualt: "M.6/5"
  },
  {
    key: "day",
    text: "In",
    option: days,
    defualt: "Monday"
  },
  {
    key: "period",
    text: "Period",
    isNumber: true,
    defualt: "8"
  },
  {
    key: "room",
    text: "At",
    defualt: "2305"
  },
  {
    key: "subjectName",
    text: "Studying",
    defualt: "Science"
  }
]

const filterArguments = ref<FilterArgument>(new FilterArgument())

const onInput = (event: any, command: SearchCommand) => {
  const value: string = event.target.innerText
  const res = filterArguments.value.set(command.key, value)
  if (res.ok) {
    console.log(`OK  set ${command.key} ${value}`)
  } else {
    console.log(`Err set${command.key} ${value}: ${res.reason}`)
  }
}

const onSearch = async () => {
  const filter: ScheduleFilter = filterArguments.value.scheduleFilter
  isLoading.value = true

  const data = await $client.schedule.search.query(filter)

  schedules.value = data
  // console.log(schedules.value)
  isLoading.value = false

  console.log(filter)
}

const loadPreviousSearch = () => {
  const str = localStorage.getItem("searchFilter")
  if (str) {
    filterArguments.value = FilterArgument.parse(str)
  }
  // or use default value
}

const getColorMode = (s: Schedule, i: number) => {
  if (s.subject.name === 'Free') {
    return "free"
  }
  if (i === 0) {
    return "current"
  }
  if (i === 1) {
    return "next"
  }
  return "normal"
}

watchEffect(() => {

  if (filterArguments.value.argument.size !== 0) {
    onSearch()
  }
})

onMounted(() => {
  loadPreviousSearch()
})

</script>

<template>
  <CommonContainer>
    <section>
      <h1 class="mb-32 "> Search </h1>
      <div class="filter-list">
        <div class="filter" v-for="command, i in commands" :class="{ disabled: !filterArguments.has(command.key) }">
          <h2 @click="filterArguments.setIfUndefined(command.key, command.defualt)"> {{ command.text }}
            <span class="highlight" contenteditable @input="event => onInput(event, command)"> {{ command.defualt }}
            </span>
          </h2>
          <Icon size="1.4rem" id="delete" class="delete" @click="filterArguments.remove(command.key)" />
        </div>

      </div>
      <!-- <button class="add" @click="onSearch">
        <h2>
          Search
        </h2>
        <Icon id="keyboard_return" size="1.5rem" />
      </button> -->
      <!-- <div class="autocomplete" ref="autocompletePopup">
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
        <li tabindex="1"> auto complete </li>
      </div> -->
    </section>
    <div class="divider small-screen"></div>
    <Transition name="fade" mode="out-in">
      <div class="blank" v-if="filterArguments.argument.size === 0">
        <h1> :-) </h1>
        <h2> Select some filter first </h2>
      </div>
      <CardGrid v-else-if="schedules.length !== 0">
        <ScheduleCard v-for="s, i in schedules" :classroom="s.room ?? 'Unknow room'"
          :teacher="s.subject.teachers.map(it => it.name).join(', ')" :subject="s.subject.name" :mode="getColorMode(s, i)"
          :id="s.subject.code" :meta="`${daysShort[s.day]} • ${s.period}`" :large="i === 0" />
      </CardGrid>
      <div class="blank" v-else>
        <h1> :-( </h1>
        <h2> No result found </h2>
      </div>
    </Transition>
  </CommonContainer>
</template>

<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.5s var(--ease-ios);
}

.fade-enter-from,
.fade-leave-to {
  scale: .95;
  filter: blur(1.2rem);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  scale: 1;
  opacity: 1;
} */


section {
  margin-top: 12vh;
}

.blank h1 {
  font-size: 10rem;
}

.blank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: .2;
  padding-bottom: 15vh;
}

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
  color: var(--color-contrast);
}

.delete:hover {
  color: var(--color-text) !important;
}

.filter:hover .delete {
  color: var(--color-contrast);
}

.disabled .delete {
  color: transparent !important;
}

.filter {
  scale: 1;
  transition: all .5s var(--ease-ios);
}

.filter * {
  filter: none;
  transition: all .5s var(--ease-ios);
}

.add {
  padding: 12px;
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

.disabled:not(:focus-within) {
  scale: .95;
}

.disabled:not(:focus-within) h2 {
  text-decoration: dashed;
  filter: grayscale();
  opacity: .5;
  /* text-decoration: underline; */
  color: var(--color-contrast);
}

.disabled:not(:focus-within) span {
  /* opacity: .5; */
}
</style>
