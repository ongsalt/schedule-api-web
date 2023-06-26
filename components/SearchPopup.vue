<template>
    <Teleport to="body">
        <LoadingDimmed :hide="hide" :is-show="isShow" color="var(--color-bg-trans)" />
        <Transition name="box">
            <div v-show="isShow" class="fixed" @click.self="hide">
                <div class="container">
                    <input type="text" class="fill" placeholder="Search" ref="searchBox">
                    <Icon id="search" size="1.5rem" class="mr-16"/> 
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
type PropsType = {
    isShow: boolean,
    hide?: () => void,
}
const props = defineProps<PropsType>()
const searchBox = ref() 

</script>

<style scoped>
.container {
    border-radius: 12px;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow1);
    pointer-events: all;
    width: 480px;
    height: 48px;
    display: flex;
    align-items: center;
}

.fill {
    height: 48px;
    margin: 0;
    padding: 2px 16px;
    font-size: 1.5rem;
    border: none;
    flex: 1;
    outline: none;
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    background-color: transparent;
}

.box-enter-active,
.box-leave-active {
    transition: all .5s var(--ease-ios);
    /* transition: all .7s; */
}

.box-enter-from,
.box-leave-to {
    scale: 1.2;
    opacity: 0;
    filter: blur(1rem);
}
</style>