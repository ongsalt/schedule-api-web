<template>
  <HeadlessCombobox v-model="selectedPeople" multiple>
    <ul v-if="selectedPeople.length > 0">
      <li v-for="person in selectedPeople" :key="person.id">
        {{ person.name }}
      </li>
    </ul>
    <HeadlessComboboxInput />
    <HeadlessComboboxOptions>
      <HeadlessComboboxOption v-for="person in people" :key="person.id" :value="person">
        {{ person.name }}
      </HeadlessComboboxOption>
    </HeadlessComboboxOptions>
  </HeadlessCombobox>
</template>
  
<script setup>

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]
const selectedPeople = ref([people[0], people[1]])
</script>
  