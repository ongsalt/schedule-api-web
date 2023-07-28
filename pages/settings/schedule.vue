<script setup lang="ts">
import { Subject } from '~/types/subject';
import { Schedule, ScheduleFilter } from '~/types/schedule';
import { KeyMeta } from '~/types/ui/keyMeta';
import { Ok, Result } from '~/types/result';
import { Err } from '~/types/result';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const daysId = [1, 2, 3, 4, 5, 6]

const { $client } = useNuxtApp()

const isSidePaneShow = ref(false)
const doCreatedNew = ref(false)
const isShowRemovePopup = ref(false)
const isShowFilterPopup = ref(false)

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

const filter = reactive<ScheduleFilter>({
    start: 0,
    take: 20,
    day: undefined,
    forRoom: undefined,
    forYear: undefined,
    period: undefined,
    room: undefined,
    subjectName: undefined,
    teacherName: undefined
})

const data = ref(
    await $client.schedule.search.query(filter)
)

const isFiltered = computed(() => {
    console.log(filter)
    return filter.forRoom !== undefined || filter.forYear !== undefined || filter.period !== undefined
        || filter.room !== undefined || filter.subjectName !== undefined || filter.teacherName !== undefined
        || filter.day !== undefined
})

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

function showPopup() {
    isShowFilterPopup.value = !isShowFilterPopup.value
}

async function fetchMoreData() {
    filter.start += 20
    const newData = await $client.schedule.search.query(filter)
    data.value = [...data.value, ...newData]
}

async function refresh() {
    filter.start = 0
    data.value = await $client.schedule.search.query(filter)
}

function onEdit(target: Schedule) {
    selected.value = structuredClone(toRaw(target))
    // console.log(selected.value)
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

async function deleteSchdule() {
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

async function onUpdatedOrAdded(data: Schedule): Promise<Result<void>> {
    data.day = parseInt(data.day as any)
    data.period = parseInt(data.period as any)
    data.forRoom = parseInt(data.forRoom as any)
    data.forYear = parseInt(data.forYear as any)

    // console.log(data)
    try {
        if (doCreatedNew.value) {
            await $client.schedule.new.mutate({
                day: data.day,
                period: data.period,
                forRoom: data.forRoom,
                forYear: data.forYear,
                room: data.room ?? undefined,
                subjectId: data.subject.id!,
            })
        } else {
            console.log("Update")
            await $client.schedule.update.mutate({
                target: {
                    day: selected.value.day,
                    period: selected.value.period,
                    forRoom: selected.value.forRoom,
                    forYear: selected.value.forYear,
                },
                day: data.day,
                period: data.period,
                forRoom: data.forRoom,
                forYear: data.forYear,
                room: data.room ?? undefined,
                subjectId: data.subject.id ?? undefined
            })
        }
        await refresh()
        hideSidepane()
        return Ok(undefined)
    } catch (e) {
        console.log(e)
        return Err(`${data.forYear}/${data.forRoom} have another class selected time.`)
    }

}

definePageMeta({
    layout: 'settings',
    consoleBg: true,
})

</script>

<template>
    <Popup :is-show="isShowRemovePopup" :hide="hideDeletePopup" title="Delete schedule">
        <p> Are you really going to delete {{ selected.subject.name }} </p>
        <!-- <p class="mb-16"> All schedule with this subject associated will get removed </p> -->
        <div class="horizontal h-end">
            <button class="cancel" @click="hideDeletePopup"> No </button>
            <LoadingAsyncButton title="Yes" :action="deleteSchdule" />
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
            <div class="realtive">
                <button @click="showPopup" :class="{ action: !isFiltered ,active: filter }">
                    <Icon id="filter_list" /> Filter
                </button>
                <FilterPopup :update="refresh" :isShow="isShowFilterPopup" :hide="() => isShowFilterPopup = false"
                    :model-value="filter" />
            </div>
            <div>
                <button class="action" @click="onAdd"> Add subject </button>
            </div>
        </div>
    </div>

    <Table :data="data" :key-meta="keyMeta" :edit-builder="(it) => () => onEdit(it)"
        :remove-builder="(it) => () => onBeforeDelete(it)" :fetch-more="fetchMoreData" />
</template>


<style scoped></style>