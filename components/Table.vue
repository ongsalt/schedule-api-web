<template>
    <table>
        <thead>
            <tr>
                <th v-for="{ displayText } in keyMeta.values()"> {{ displayText }} </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="it, index in data">
                <td v-for="k in keyMeta.keys()"> {{ keyMeta.get(k)?.formatForDisplay !== undefined ?
                    keyMeta.get(k)!.formatForDisplay!(it[k]) : it[k] }} </td>
                <td class="horizontal">
                    <IconButton id="edit" :action="editBuilder(it.id)" />
                    <IconButton id="delete" :action="removeBuilder(it.id)" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { KeyMeta } from '~/types/ui/keyMeta';

type PropsType<T> = {
    data: T[],
    keyMeta: Map<keyof T, KeyMeta>
    editBuilder: (arg0: number) => () => void,
    removeBuilder: (arg0: number) => () => void,
}

const { data, keyMeta, editBuilder, removeBuilder } = defineProps<PropsType<any>>()

</script>

<style scoped>
thead {
    /* box-shadow: var(--shadow2); */
    border-radius: 12px;
    background-color: var(--color-active);
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
</style>