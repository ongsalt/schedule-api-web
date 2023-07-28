<script setup lang="ts">
import { Result } from '~/types/result';
import { KeyMeta } from '~/types/ui/keyMeta';

type PropsType<T> = {
    data: T,
    keyMeta: Map<keyof T, KeyMeta>
    onUpdate: (arg0: T) => Promise<Result<void>>

    isShow: boolean,
    hide: () => any,
    title?: string
    isCreateNew?: boolean,
}

const form = ref()
const internalData = ref<any>()
const props = defineProps<PropsType<any>>()

const update = ref(async () => { })

const { y } = useScroll(form)
const scrolled = computed(() => y.value > 0)

const errorText = ref("") 

watchEffect(() => {
    internalData.value = structuredClone(toRaw(props.data))
    errorText.value = ""
    update.value = async () => {
        const result = await props.onUpdate(internalData.value)
        if (result.ok) {
            errorText.value = ""
        } else {
            console.log(result.reason)
            errorText.value = result.reason
        }
    }
    console.log(internalData.value)
})

const keys = Array.from(props.keyMeta.keys())

const mutableKeys = keys.filter(it => props.keyMeta.get(it)?.mutable)


</script>

<template>
    <Teleport to="body">
        <Transition name="bg">
            <div v-if="isShow" class="fullscreen background"> </div>
        </Transition>

        <Transition name="box">
            <div v-if="isShow" class="fullscreen parent" @click.self="hide">
                <div class="pane">
                    <div class="top" :class="{ scrolled }">
                        <h2 class="">{{ title ?? "Edit" }}</h2>
                    </div>
                    <div class="form" ref="form">
                        <div class="labeled mb-16" v-for="key in keyMeta.keys()">
                            <label for="a"> {{ keyMeta.get(key)?.displayText }} {{ !keyMeta.get(key)?.mutable ?
                                "(Unchangable)" : "" }} {{ !keyMeta.get(key)?.notRequire && key !== 'id' ? "*" : "" }}
                            </label>
                            <div v-if="keyMeta.get(key)?.autocompleteResolver" class="relative">
                                <!-- autocomplete -->
                                <p class="mb-4" v-if="keyMeta.get(key)?.multiple"> {{ internalData[key].length > 0 ?
                                    keyMeta.get(key)?.formatForDisplay!(internalData[key]) : "None" }}</p>
                                <AutocompleteMultiple v-if="keyMeta.get(key)?.multiple" v-model="internalData[key]"
                                    :resolve="keyMeta.get(key)?.autocompleteResolver!"
                                    :format-for-display="keyMeta.get(key)?.autocompleteFormat!"
                                    :key="`${key.toString()}${title}-multiple`" />
                                <Autocomplete v-else-if="key !== 'day'" v-model="internalData[key]"
                                    :resolve="keyMeta.get(key)?.autocompleteResolver!"
                                    :format-for-display="keyMeta.get(key)?.autocompleteFormat!"
                                    :key="`${key.toString()}${title}-single`" :get-description="keyMeta.get(key)?.getDescriptionForDisplay"/>
                                <AutocompletePrimitive v-else v-model="internalData[key]"
                                    :resolve="keyMeta.get(key)?.autocompleteResolver!"
                                    :format-for-display="keyMeta.get(key)?.autocompleteFormat!"
                                    :key="`${key.toString()}${title}-primitive`"/>

                            </div>
                            <input v-else-if="isCreateNew && key === 'id'" type="text" disabled value="Autogenerate">
                            <input type="text" :disabled="!!!keyMeta.get(key)?.mutable" v-model="internalData[key]" v-else>
                        </div>
                    </div>
                    <div class="horizontal bottom">
                        <p> {{ errorText ?? "" }} </p>
                        <div class="horizontal">
                            <LoadingAsyncButton title="Save" :action="update" />
                            <button class="cancel" @click="hide"> Cancel </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.bottom {
    justify-content: space-between;
    border-top: 1px solid var(--color-border);
    padding: 12px 24px;
}

.top {
    justify-content: space-between;
    border-bottom: 1px solid transparent;
    padding: 48px 24px 12px 24px;
    transition: all .3s;
    box-shadow: 0px 0px 0px var(--color-border);
}

.top.scrolled {
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow2);
}

.form {
    padding: 12px 24px;
    flex: 1;
    overflow-y: auto;
}

.background {
    background-color: var(--color-bg-trans);
    /* background-color: var(--color-border); */
}

.fullscreen {
    z-index: 9999;
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
}

.parent {
    display: flex;
    justify-content: flex-end;
}

.pane {
    box-shadow: var(--shadow0);
    background-color: var(--color-bg);
    border-left: 1px solid var(--color-border);
    width: 540px;
    max-width: calc(100vw - 24px);
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    /* justify-content: space-between; */
    flex-direction: column;
}

.bg-enter-active,
.bg-leave-active {
    transition: opacity 0.3s ease;
}

.bg-enter-from,
.bg-leave-to {
    opacity: 0;
}


.box-enter-active,
.box-leave-active {
    transition: all 0.3s var(--ease-ios);
}

.box-enter-from,
.box-leave-to {
    translate: 24px 0;
    /* scale: .9; */
    opacity: 0;
}</style>