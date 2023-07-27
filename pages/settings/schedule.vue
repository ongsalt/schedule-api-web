<script setup lang="ts">
import { Subject } from '~/types/subject';
import { Schedule } from '~/types/schedule';
import { KeyMeta } from '~/types/ui/keyMeta';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const daysId = [1, 2, 3, 4, 5, 6]

const { $client } = useNuxtApp()

const isSidePaneShow = ref(false)
const doCreatedNew = ref(false)
const isShowRemovePopup = ref(false)

const selected = ref<Schedule>({
    forRoom: 5,
    forYear: 6,
    day: 1,
    period: 5,
    subject: {
        name: "Gaythai",
        teachers: [
            { name: "Tee" }
        ]
    },
})

const filter = reactive({
    text: "Filter"
})

const { data, error, refresh } = $client.schedule.list.useQuery()

const keyMeta = new Map<keyof typeof selected.value, KeyMeta>([
    ["day", {
        mutable: true,
        displayText: "Day",
        formatForDisplay(index: number) {
            return days[index]
        },
        async autocompleteResolver(query) {
            return daysId
        },
        autocompleteFormat(index: number) {
            return days[index]
        },
    }],
    ["forYear", {
        displayText: "Year",
        mutable: true
    }],
    ["forRoom", {
        displayText: "Class",
        mutable: true
    }],
    ["period", {
        displayText: "Period",
        mutable: true
    }],
    ["room", {
        displayText: "Room",
        mutable: true
    }],
    ["subject", {
        displayText: "Subject",
        mutable: true,
        formatForDisplay(data: Subject) {
            return data.name
        },
        async autocompleteResolver(query: string) {
            return await $client.subject.listForAutocomplete.query(query)
        },
        autocompleteFormat(data: Subject) {
            return data.name
        },
        getDescriptionForDisplay(data: Subject) {
            return data.teachers.map(it => it.name).join(", ")
        }
    }]
])

function onEdit(target: Schedule) {
    selected.value = structuredClone(toRaw(target))
    console.log(selected.value)
    isSidePaneShow.value = true
}

function onBeforeDelete(target: Schedule) {
    selected.value = structuredClone(toRaw(target))
    isShowRemovePopup.value = true
}

function onAdd() {
    selected.value = {
        forRoom: 5,
        forYear: 6,
        day: 1,
        period: 5,
        subject: {
            name: "Test",
            teachers: [
                { name: "Tuan" }
            ]
        },
    }
    doCreatedNew.value = true
    isSidePaneShow.value = true
}

function hideDeletePopup() {
    isShowRemovePopup.value = false
    selected.value = {
        forRoom: 5,
        forYear: 6,
        day: 1,
        period: 5,
        subject: {
            name: "Test",
            teachers: [
                { name: "Tuan" }
            ]
        },
    }
}

async function deleteSubject() {
    await $client.schedule.delete.mutate({
        day: selected.value.day,
        period: selected.value.period,
        forRoom: selected.value.forRoom,
        forYear: selected.value.forYear,
    })
    await refresh()
    hideDeletePopup()
}

function hideSidepane() {
    doCreatedNew.value = false
    isSidePaneShow.value = false
}

async function onUpdatedOrAdded(data: Subject) {
    if (doCreatedNew.value) {
        await $client.subject.new.mutate({
            name: data.name,
            code: data.code ?? undefined,
            link: data.link ?? undefined,
            tags: data.tags ?? undefined,
            teacherIds: data.teachers.map(it => it.id!) ?? undefined,
        })
    } else {
        await $client.subject.update.mutate({
            id: data.id!,
            code: data.code ?? undefined,
            link: data.link ?? undefined,
            name: data.name ?? undefined,
            tags: data.tags ?? undefined,
            teacherIds: data.teachers.map(it => it.id!) ?? undefined,
        })
    }

    await refresh()
    hideSidepane()
}

definePageMeta({
    layout: 'settings',
    consoleBg: true,
})

</script>

<template>
    <Popup :is-show="isShowRemovePopup" :hide="hideDeletePopup" title="Delete schedule">
        <p> Are you really going to delete {{ selected.subject.name }} </p>
        <p class="mb-16"> All schedule with this subject associated will get removed </p>
        <div class="horizontal h-end">
            <button class="cancel" @click="hideDeletePopup"> No </button>
            <LoadingAsyncButton title="Yes" :action="deleteSubject" />
        </div>
    </Popup>
    <EditPane :hide="hideSidepane" :is-show="isSidePaneShow" :data="selected" :key-meta="keyMeta"
        :is-create-new="doCreatedNew" :on-update="onUpdatedOrAdded"
        :title="!doCreatedNew ? `Edit schedule ${selected.subject.name}` : `Add new teacher`" />
    <div class="horizontal h-space mb-16 h-align-end">
        <div>
            <h2 class="mb-16"> Schedule </h2>
            <p class=""> Configure schedule data. </p>
        </div>
        <div class="horizontal">
            <button class="action" @click="onAdd">
                <Icon id="filter_list" /> {{ filter.text }}
            </button>
            <div>
                <button class="action" @click="onAdd"> Add subject </button>
            </div>
        </div>
    </div>

    <Table :data="data" :key-meta="keyMeta" :edit-builder="(it) => () => onEdit(it)"
        :remove-builder="(it) => () => onBeforeDelete(it)" />
</template>


<style scoped></style>