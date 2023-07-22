<script setup lang="ts">
import { Subject } from '~/types/subject';
import { Teacher } from '~/types/teacher';
import { KeyMeta } from '~/types/ui/keyMeta';

const { $client } = useNuxtApp()

const isSidePaneShow = ref(false)
const doCreatedNew = ref(false)
const isShowRemovePopup = ref(false)

const selected = ref<Subject>({
    id: 0,
    name: 'test',
    code: '440520',
    teachers: [],
})

const { data, error, refresh } = $client.subject.list.useQuery()

const keyMeta = new Map<keyof typeof selected.value, KeyMeta>([
    ["id", {
        displayText: "ID",
        mutable: false
    }],
    ["name", {
        displayText: "Name",
        mutable: true
    }],
    ["code", {
        displayText: "Code",
        notRequire: true,
        mutable: true
    }],
    ["link", {
        displayText: "Link",
        mutable: true,
        notRequire: true,
        validate(data: string) {
            try {
                new URL(data)
                return true
            } catch {
                return false
            }
        }
    }],
    ["teachers", {
        displayText: "Teacher",
        mutable: true,
        notRequire: true,
        formatForDisplay(data: Teacher[]) {
            return data?.map(it => it.name)?.join(", ") ?? " "
        },
        async autocompleteResolver(query: string) {
            return await $client.teacher.listForAutocomplete.query(query)
        },
        autocompleteFormat(data: Teacher) {
            return data.name
        },
    }],
    ["tags", {
        displayText: "Tags",
        mutable: true,
        notRequire: true,
        description: "Seperate each using comma",
        validate(data: string) {
            return /er/.test(data)
        }
    }],
])

function onEdit(id: number) {
    selected.value = structuredClone(toRaw(data.value.find(it => it.id === id)!))
    isSidePaneShow.value = true
}

function onBeforeDelete(id: number) {
    selected.value = structuredClone(toRaw(data.value.find(it => it.id === id)!))
    isShowRemovePopup.value = true
}

function onAdd() {
    selected.value = {
        id: 0,
        name: 'New subject',
        teachers: [],
    }
    doCreatedNew.value = true
    isSidePaneShow.value = true
}

function hideDeletePopup() {
    isShowRemovePopup.value = false
    selected.value = {
        id: 0,
        name: 'New subject',
        teachers: [],
    }
}

async function deleteSubject() {
    await $client.subject.delete.mutate({
        id: selected.value.id!
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
        // await $client.subject.new.mutate({

        // })
    } else {
        // await $client.teacher.rename.mutate()
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
    <Popup :is-show="isShowRemovePopup" :hide="hideDeletePopup" title="Delete subject">
        <p> Are you really going to delete {{ selected.name }} </p>
        <p class="mb-16"> All schedule with this subject associated will get removed </p>
        <div class="horizontal h-end">
            <button class="cancel" @click="hideDeletePopup"> No </button>
            <LoadingAsyncButton title="Yes" :action="deleteSubject" />
        </div>
    </Popup>
    <EditPane :hide="hideSidepane" :is-show="isSidePaneShow" :data="selected" :key-meta="keyMeta"
        :is-create-new="doCreatedNew" :on-update="onUpdatedOrAdded"
        :title="!doCreatedNew ? `Edit subject ${selected.name}` : `Add new teacher`" />
    <div class="horizontal h-space mb-16 h-align-end">
        <div>
            <h2 class="mb-16"> Subject </h2>
            <p class=""> Configure subject data. </p>
        </div>
        <button class="action" @click="onAdd"> Add subject </button>
    </div>

    <Table :data="data" :key-meta="keyMeta" :edit-builder="(id: number) => () => onEdit(id)"
        :remove-builder="(id: number) => () => onBeforeDelete(id)" />
</template>


<style scoped></style>