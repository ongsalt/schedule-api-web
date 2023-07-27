<script setup lang="ts" generic="T extends string | number">

type PropsType = {
    formatForDisplay: (data: T) => string,
    resolve: (query: string) => Promise<T[]>,
}

const { formatForDisplay, resolve } = defineProps<PropsType>()
const selected = defineModel<T>({ required: true })

// Component generic is still in beta so...
const available: globalThis.Ref<T[]> = ref([])
const query = ref('')
const filtered = computed(() =>
    query.value === ''
        ? available.value
        : available.value.filter((item) => {
            return formatForDisplay(item).toLowerCase().includes(query.value.toLowerCase())
        })
)

onMounted(async () => {
    // Different pointer -> Fuck it
    available.value = await resolve("")
    // selected.value = available.value.find(it => it.id === selected.value.id)!
    console.log(selected.value)
    // selected.value = available.value.find(it => selected.value.id == it.id)
})

watch(query, async (it, oldValue) => {
    if (!oldValue || oldValue === "") {
        return
    }
    const data = await resolve(it)
    const newOne = data.filter(it => !available.value.includes(it))
    available.value = [...available.value, ...newOne]
}, { immediate: true })

</script>

<template>
    <HeadlessCombobox v-model="selected" as="div" class="relative">
        <HeadlessComboboxInput @change="query = $event.target.value"
            :display-value="it => formatForDisplay ? formatForDisplay(it as any) : ''" />
        <HeadlessComboboxOptions class="autocomplete-option" as="ul" v-if="filtered.length > 0">
            <HeadlessComboboxOption v-for="item in filtered" :key="item" :value="item" v-slot="{ active, selected }"
                as="template">
                <li :class="{ active: active, selected: selected }">
                    <Icon id="Done" class="icon" />
                    {{ formatForDisplay(item) }}
                </li>
            </HeadlessComboboxOption>
        </HeadlessComboboxOptions>
    </HeadlessCombobox>
</template>

<style scoped>
.fake-input {
    cursor: text;
    display: flex;
    align-items: center;
    background-color: var(--color-surface-elevated);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    outline: 0px solid #00000000;
    transition: outline .3s ease;
}

.fake-input:hover {
    outline: 1px solid var(--color-accent-trans);
}

.fake-input:focus {
    outline: 3px solid var(--color-accent-trans);
}

.fake-input p {
    /* flex: 1; */
    width: fit-content;
}

.fake-input input {
    flex: 1;
}

.autocomplete-option {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: var(--color-bg);
    overflow-y: auto;
    max-height: 240px;
    top: 40px;
    left: 0;
    right: 0;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow0);
    border-radius: 6px;
}

.autocomplete-option li {
    margin: 2px;
    border-radius: 4px;
    padding: 4px 6px;
    text-indent: 0;
    gap: 4px;
}

.autocomplete-option li.active {
    background-color: var(--color-accent-trans);
    color: var(--color-accent700);
}

.autocomplete-option li:not(.selected) .icon {
    opacity: 0;
}
</style>