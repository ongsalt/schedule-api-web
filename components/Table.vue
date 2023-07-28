<template>
    <div class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th v-for="{ displayText } in keyMeta.values()"> {{ displayText }} </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody ref="parent">
                <tr v-for="it, index in data">
                    <td v-for="k in keyMeta.keys()"> {{ keyMeta.get(k)?.formatForDisplay !== undefined ?
                        keyMeta.get(k)!.formatForDisplay!(it[k]) : it[k] }} </td>
                    <td class="horizontal">
                        <IconButton id="edit" :action="editBuilder(it)" />
                        <IconButton id="delete" :action="removeBuilder(it)" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="loadmore-row" v-if="data && data.length && fetchMore">
            <AsyncButton :action="fetchMore" title="Load more" />
        </div>
        <div class="loadmore-row" v-if="!data || data.length === 0">
            Not found. Try change filter.
        </div>
    </div>
</template>

<script setup lang="ts">
import AsyncButton from '~/components/Loading/AsyncButton.vue';
import { KeyMeta } from '~/types/ui/keyMeta';

type PropsType<T> = {
    data: T[],
    keyMeta: Map<keyof T, KeyMeta>
    editBuilder: (arg0: T) => () => void,
    removeBuilder: (arg0: T) => () => void,
    fetchMore?: () => Promise<void>,
}

const { data, keyMeta, editBuilder, removeBuilder } = defineProps<PropsType<any>>()

// const parent = ref<HTMLElement>()
// useInfiniteScroll(parent, async () => {
//     console.log("Load")
//     await fetchMore()
// }, { distance: 5, interval: 20 })

</script>

<style scoped>
thead {
    /* box-shadow: var(--shadow2); */
    position: sticky;
    top: 75px;
    border-radius: 12px;
    background-color: var(--color-elevated);
    /* color: var(--color-accent); */
}

thead tr th:first-child {
    border-radius: 12px 0 0 12px;
}

thead tr th:last-child {
    border-radius: 0 12px 12px 0;
}

th,
td {
    padding: 12px;
}

tbody tr:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
}

th,
td,
table {
    /* border: 1px solid var(--color-border); */
    text-align: center;
    /* padding: 4px 8px; */
}

table {
    border-collapse: collapse;
    border-radius: 8px;
    /* border: 1px solid var(--color-border); */
    width: 100%;
}
.loadmore-row {
    width: 100%;
    padding-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>