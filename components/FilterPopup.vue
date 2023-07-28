<template>
    <Transition name="popup">
        <div class="card-popup" v-if="isShow" ref="popup">
            <div class="popup-header">
                <h3> Filter </h3>
                <!-- <button>
                    Clear
                </button> -->
                <!-- <Icon id="clear" /> -->
            </div>
            <div>
                <div class="inline-labeled" :class="{ active: filter.forYear }">
                    <label for="year"> Year </label>
                    <input type="number" name="year" class="small" placeholder="6" v-model.number="filter.forYear">
                </div>
                <div class="inline-labeled" :class="{ active: filter.forRoom }">
                    <label for="class"> Class </label>
                    <input type="number" name="class" class="small" placeholder="5" v-model.number="filter.forRoom">
                </div>

                <div class="inline-labeled" :class="{ active: filter.period }">
                    <label for="period"> Period </label>
                    <input type="number" name="period" class="small" placeholder="2" v-model.number="filter.period">
                </div>
                <div class="inline-labeled" :class="{ active: filter.room }">
                    <label for="room"> Room </label>
                    <input type="text" name="room" class="small" placeholder="2305" v-model="filter.room">
                </div>
                <div class="inline-labeled" :class="{ active: filter.subjectName }">
                    <label for="subject"> Subject </label>
                    <input type="text" name="subject" class="small" placeholder="Physics" v-model="filter.subjectName">
                </div>
                <div class="inline-labeled" :class="{ active: filter.day || filter.day === 0  }">
                    <label for="day"> Day </label>
                    <input type="text" name="day" class="small" placeholder="Monday" v-model.number="filter.day">
                </div>
                <div class="inline-labeled" :class="{ active: filter.teacherName }">
                    <label for="teacher"> Teacher </label>
                    <input type="text" name="teacher" class="small" placeholder="Damrongsak" v-model="filter.teacherName">
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onClickOutside, onKeyDown } from '@vueuse/core'
import { ScheduleFilter } from '~/types/schedule';

type PropsType = {
    isShow: boolean
    hide: () => any,
    update: () => any
}
const { hide, isShow, update } = defineProps<PropsType>()
const filter = defineModel<ScheduleFilter>({ required: true })

const popup = ref()

function validate() {
    // @ts-ignore
    if (filter.value.day === "") {
        filter.value.day = undefined
    }
    // @ts-ignore
    else if (filter.value.day === "Sunday") {
        filter.value.day = 0
    }
    // @ts-ignore
    else if (filter.value.day === "Monday") {
        filter.value.day = 1
    }
    // @ts-ignore
    else if (filter.value.day === "Tuesday") {
        filter.value.day = 2
    }
    // @ts-ignore
    else if (filter.value.day === "Wednesday") {
        filter.value.day = 3
    }
    // @ts-ignore
    else if (filter.value.day === "Thursday") {
        filter.value.day = 4
    }
    // @ts-ignore
    else if (filter.value.day === "Friday") {
        filter.value.day = 5
    }
    // @ts-ignore
    else if (filter.value.day === "Saturday") {
        filter.value.day = 6
    } else if (filter.value.day === undefined ) {
        filter.value.day = undefined
    } else if (filter.value.day < 0 || filter.value.day > 6) {
        filter.value.day = undefined
    }
    // @ts-ignore
    if (filter.value.forRoom === "") {
        filter.value.forRoom = undefined
    }
    // @ts-ignore
    if (filter.value.forYear === "") {
        filter.value.forYear = undefined
    }
    // @ts-ignore
    if (filter.value.period === "") {
        filter.value.period = undefined
    }
    if (filter.value.room === "") {
        filter.value.room = undefined
    }
    if (filter.value.subjectName === "") {
        filter.value.subjectName = undefined
    }
    if (filter.value.teacherName === "") {
        filter.value.teacherName = undefined
    }
}

onClickOutside(popup, event => {
    event.stopPropagation()
    validate()
    update()
    hide()
})

onKeyDown('Escape', () => {
    validate()
    update()
    hide()
})


</script>

<style scoped>
.popup-header {
    margin: 2px 2px 6px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.inline-labeled {
    flex: 1;
    display: flex;
    padding: 4px 6px;
    gap: 6px;
    justify-content: space-between;
    margin-bottom: 2px;
}

.inline-labeled.active {
    background-color: var(--color-blue-trans);
    color: var(--color-blue);
    border-radius: 4px;
}

.inline-labeled label {
    font-size: .9rem;
    /* margin-top: 3px; */
    /* margin-bottom: 2px; */
    /* display: block; */
    font-weight: 600;
}

.inline-labeled input {
    display: inline;
    width: 100%;
    flex: 1;
    appearance: text;
    border: none;
    padding: 0;
    margin: 0;
    border-radius: 0;
    text-align: end;
    color: var(--color-blue);
    /* outline: none; */
}

.inline-labeled input.small {
    width: 50px;
}

.inline-labeled input:hover,
.inline-labeled input:focus {
    outline: none;
    border-bottom: none;
}

.inline-labeled input::placeholder {
    opacity: .6;
}

.card-popup {
    position: absolute;
    margin-top: 4px;
    z-index: 999;

    padding: 4px;
    width: 180px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-bg);
    box-shadow: var(--shadow1);
}

.popup-enter-active,
.popup-leave-active {
    transition: all 0.3s var(--ease-ios);
}

.popup-enter-from,
.popup-leave-to {
    scale: .95;
    transform-origin: top;
    opacity: 0;
}
</style>