<template>
    <Card class="sc-card" :class="mode">
        <div class="horizontal h-space sc-top">
            <Pill varient="outline" :light="mode === 'next'">
                {{ meta ?? "Current" }}
            </Pill>
            <div>
                <p class="subtext"> {{ classroom }} </p>
                <p class="subtext" v-if="classTarget"> {{ classTarget }} </p>
            </div>
        </div>
        <div class="fill"></div>
        <div class="anchor-bottom">
            <p class="top subtext"> {{ id }} <span v-if="teacher"> • {{ teacher }} </span> </p>
            <h2 class="mb-16"> {{ subject }} </h2>
        </div>
        <!-- <img class="bg" src="" alt=""> -->
    </Card>
</template>

<script setup lang="ts">

type colorMode = "current" | "next" | "free" | "random"

const { subject, classroom, teacher, mode = "current", id, meta, classTarget } = defineProps<{
    subject: string,
    classroom: string,
    classTarget?: string,
    teacher?: string,
    id: string,
    mode?: colorMode,
    meta?: string
}>()

let modeString: string

if (mode === "free") {
    modeString = "Free"
} else if (mode === "next") {
    modeString = "Next"
} else if (mode === "random") {
    modeString = "Dafuq"
} else {
    modeString = "Current"
}

</script>

<style scoped>
.sc-top {
    margin-bottom: 32px;
}

.top {
    margin-bottom: 6px;
}

.sc-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.current {
    background-color: var(--color-accent);
    box-shadow: 0px 2px 8px var(--color-accent-trans);
    transition: all .3s;
}

.current:hover {
    box-shadow: 0px 6px 16px var(--color-accent-trans);
}

.free {
    background-color: var(--color-blue500);
}

.random {
    background-color: var(--color-surface);
}

.next {
    background-color: rgb(18, 69, 64, 1);
    background-image: radial-gradient(circle, rgba(45, 112, 92, 1) 20%, rgba(18, 69, 64, 1) 90%);
    color: var(--color-bg);
}

.next .subtext {
    opacity: .75;
}

.sc-top .subtext {
    text-align: end;
}
</style>