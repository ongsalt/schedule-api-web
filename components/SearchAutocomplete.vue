<template>
    <HeadlessCombobox @update:model-value="onExecuteAutocomplete" as="div" v-slot="{ open }">
        <HeadlessComboboxInput @change="input = $event.target.value" :displayValue="(person) => person.text" />
        <!-- <h2 class="container" ref="container" contenteditable="true" @input="handleInput"> </h2> -->
        <HeadlessComboboxOptions class="autocomplete-option">
            <HeadlessComboboxOption v-for="command in filteredCommand" :key="command.key" :value="command"
                v-slot="{ active, selected }" as="template">
                <li :class="{ active: active }">
                    {{ command.text }}
                </li>
            </HeadlessComboboxOption>
        </HeadlessComboboxOptions>
    </HeadlessCombobox>


    <!-- <div class="autocomplete">
        <li> auto complete </li>
        <li> auto complete </li>
        <li> auto complete </li>
        <li> auto complete </li>
    </div> -->
</template>

<script setup lang="ts">
import { z } from 'zod';

const container = ref()
const classRegex1 = /M\.[0-9]{1,}\/[0-9]{1,}/
const classRegex2 = /[0-9]{1,}\/[0-9]{1,}/

const input = ref("")

const isShowAutocomplete = ref(false)

defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])

type Command = {
    text: string[],
    key: string,
    option?: string[] // if no option present -> accept any string
    getOption?: () => any, // Implement later using cache table on server built from reading all item in schedule table
    isNumber?: boolean
    validate?: (text: string) => boolean
}

const commands: Command[] = [
    {
        key: "for",
        text: ["Which class?", "Class", "ม.ไหน", "ม."],
        validate: text => classRegex1.test(text) || classRegex2.test(text)
    },
    {
        key: "day",
        text: ["In", "Day", "วัน"],
        option: days,
        validate: text => days.includes(text.toLowerCase())
    },
    {
        key: "period",
        text: ["Period", "คาบ"],
        isNumber: true,
        validate: text => !isNaN(text as any) && !isNaN(parseInt(text)) // Check Int

    },
    {
        key: "room",
        text: ["At", "Where", "ที่"]
    },
    {
        key: "subjectName",
        text: ["Studying", "Learning", "เรียน", "วิชา"]
    }
]

const commandsForAutocomplete = commands.flatMap(command => {
    return command.text.map(text => ({ text, key: command.key }))
})

const filteredCommand = computed(() =>
    input.value === ''
        ? commandsForAutocomplete
        : commandsForAutocomplete.filter((command) => {
            const searchString = `${command.key}😭${command.text}`
            return searchString.toLowerCase().includes(input.value.toLowerCase())
        })
)


// Listener

const handleInput = (event: InputEvent) => {
    const target = (event.target! as any)
    const currentText: string = target.innerText

    isShowAutocomplete.value = true
    // target.focus()
    // let _range = document.getSelection()!.getRangeAt(0)
    // let range = _range.cloneRange()
    // range.selectNodeContents(target)
    // range.setEnd(_range.endContainer, _range.endOffset)
    // console.log(range.toString().length)
    // return range.toString().length;
}

const onExecuteAutocomplete = (autocompleteValue: string) => {
    console.log(autocompleteValue)
}

// Renderer
</script>

<style scoped>
.container {
    background-color: #ff000020;
    width: 100%;
    position: relative;
}

.container:focus {
    outline: none;
}

.autocomplete-option {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: var(--color-bg);
    overflow-y: hidden;
    border: 1px solid var(--color-contrast);
    box-shadow: var(--shadow0);
    border-radius: 6px;
}

.autocomplete-option li {
    margin: 2px;
    border-radius: 4px;
    padding: 2px 6px;
    text-indent: 0;
    list-style: none;
}

.autocomplete-option li.active {
    background-color: var(--color-accent-trans);
    color: var(--color-accent700);
}
</style>