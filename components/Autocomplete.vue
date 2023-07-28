<script setup lang="ts" generic="T extends { id: number }">

type PropsType = {
    getDescription?: (data: T) => string,
    formatForDisplay: (data: T) => string,
    resolve: (query: string) => Promise<T[]>,
}

const { formatForDisplay, resolve, getDescription } = defineProps<PropsType>()
const selected = defineModel<T>({ required: true })

// Component generic is still in beta so...
const available: globalThis.Ref<T[]> = ref([])
const query = ref('')
const filtered = computed(() =>
    query.value === ''
        ? available.value
        : available.value.filter((item) => {
            const isSameName = formatForDisplay(item).toLowerCase().includes(query.value.toLowerCase())
            if (!isSameName && getDescription) {
                const isSameDescription = getDescription(item).toLowerCase().includes(query.value.toLowerCase())
                return isSameDescription
            }
            return isSameName
        })
)

onMounted(async () => {
    // Different pointer -> Fuck it
    available.value = await resolve("")
    // selected.value = available.value.find(it => it.id === selected.value.id)!
    // console.log(selected.value)
    // selected.value = available.value.find(it => selected.value.id == it.id)
})

watch(query, async (it, oldValue) => {
    if (!oldValue || oldValue === "") {
        return
    }
    const data = await resolve(it)
    const availableId = available.value.map(it => it.id)
    const newOne = data.filter(it => !availableId.includes(it.id))
    available.value = [...available.value, ...newOne]
}, { immediate: true })

</script>

<template>
    <HeadlessCombobox v-model="selected" as="div" class="relative">
        <HeadlessComboboxInput @change="query = $event.target.value"
            :display-value="it => formatForDisplay ? formatForDisplay(it as any) : ''" />
        <HeadlessComboboxOptions class="autocomplete-option" as="ul" v-if="filtered.length > 0">
            <HeadlessComboboxOption v-for="item in filtered" :key="item.id" :value="item" v-slot="{ active, selected }"
                as="template">
                <li :class="{ active: active, selected: selected }">
                    <div class="horizontal">
                        <Icon id="Done" class="icon" />
                        {{ formatForDisplay(item) }}
                    </div>
                    <p v-if="getDescription" class="teacherName"> {{ getDescription(item) }} </p>
                </li>
            </HeadlessComboboxOption>
        </HeadlessComboboxOptions>
    </HeadlessCombobox>
</template>

<style scoped>
.autocomplete-option {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: var(--color-bg);
    overflow-y: auto;
    max-height: 150px;
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
    justify-content: space-between;
}

.autocomplete-option li .horizontal {
    gap: 0;
}

.autocomplete-option li p {
    opacity: .4;
}

.autocomplete-option li.active {
    background-color: var(--color-accent-trans);
    color: var(--color-accent700);
}

.autocomplete-option li:not(.selected) .icon {
    opacity: 0;
}
</style>