<script setup lang="ts">
import { Teacher } from '@prisma/client';
import { Err, Ok, Result } from '~/types/result';
import { KeyMeta } from '~/types/ui/keyMeta';

const { $client } = useNuxtApp()

const isSidePaneShow = ref(false)
const doCreatedNew = ref(false)
const isShowRemovePopup = ref(false)

const selected = ref<Teacher>({
    id: 0,
    name: 'test'
})

const { data, error, refresh } = $client.teacher.list.useQuery()

const keyMeta = new Map<keyof typeof selected.value, KeyMeta>([
    ["id", {
        displayText: "ID",
        mutable: false
    }],
    ["name", {
        displayText: "Name",
        mutable: true
    }]
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
        name: 'New teacher'
    }
    doCreatedNew.value = true
    isSidePaneShow.value = true
}

function hideDeletePopup() {
    isShowRemovePopup.value = false
    selected.value = {
        id: 0,
        name: 'New teacher'
    }
}

async function deleteTeacher() {
    await $client.teacher.delete.mutate({
        id: selected.value.id
    })
    await refresh()
    hideDeletePopup()
}

function hideSidepane() {
    doCreatedNew.value = false
    isSidePaneShow.value = false
}

async function onUpdatedOrAdded(data: Teacher): Promise<Result<void>> {
    try {

        if (doCreatedNew.value) {
            await $client.teacher.new.mutate({
                name: data.name
            })
        } else {
            await $client.teacher.rename.mutate(data)
        }
        
        await refresh()
        hideSidepane()
        return Ok(undefined)
    } catch (e) {
        return Err("Something happen")
    }
}

definePageMeta({
    layout: 'settings',
    consoleBg: true,
})

</script>

<template>

    <Popup :is-show="isShowRemovePopup" :hide="hideDeletePopup" title="Delete teacher">
        <p> Are you really going to delete {{ selected.name }} </p>
        <p class="mb-16"> All subject with this teacher associated will not get removed </p>
        <div class="horizontal h-end">
            <button class="cancel" @click="hideDeletePopup"> No </button>
            <LoadingAsyncButton title="Yes" :action="deleteTeacher" />
        </div>
    </Popup>
    <EditPane :hide="hideSidepane" :is-show="isSidePaneShow" :data="selected" :key-meta="keyMeta" :is-create-new="doCreatedNew"
        :on-update="onUpdatedOrAdded" :title="!doCreatedNew ? `Edit teacher ${selected.name}` : `Add new teacher`" />
    <div class="horizontal h-space mb-16 h-align-end">
        <div>
            <h2 class="mb-16"> Teacher </h2>
            <p class=""> Configure teacher data. </p>
        </div>
        <button class="action" @click="onAdd"> Add teacher </button>
    </div>

    <Table :data="data" :key-meta="keyMeta" :edit-builder="(it) => () => onEdit(it.id)"
        :remove-builder="(it) => () => onBeforeDelete(it.id)" />
</template>


<style scoped></style>