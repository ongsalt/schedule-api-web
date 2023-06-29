<template>
    <Card class="sc-card" :class="[colorMode, { large }]">
        <div class="horizontal h-space sc-top">
            <Pill varient="outline" :light="colorMode === 'next'">
                {{ meta ?? "Current" }}
            </Pill>
            <div>
                <p class="subtext"> {{ classroom }} </p>
                <p class="subtext" v-if="classTarget"> {{ classTarget }} </p>
            </div>
        </div>
        <div class="fill"></div>
        <div class="anchor-bottom horizontal h-space ">
            <div>
                <p class="top subtext"> {{ id }} <span v-if="teacher"> • {{ teacher }} </span> </p>
                <h2> {{ subject }} </h2>
            </div>
            <div v-if="link" :class="{ link: true, alwayShow: colorMode === 'current' }">
                <Icon id="open_in_new" size="2rem" />
            </div>
        </div>
        <!-- <img class="bg" src="" alt=""> -->
    </Card>
</template>

<script setup lang="ts">

type ColorMode = "current" | "next" | "free" | "random" | "normal"


const { subject, classroom, teacher, id, meta, classTarget, mode } = defineProps<{
    subject: string,
    classroom: string,
    classTarget?: string,
    teacher?: string,
    id: string,
    large?: boolean,
    meta?: string | number,
    mode?: ColorMode,
    link?: string
}>()

let colorMode: ColorMode = "normal"

if (!mode) {
    if (meta === "free") {
        colorMode = "free"
    } else if (meta === "Next") {
        colorMode = "next"
    } else if (meta === "Random") {
        colorMode = "random"
    } else if (meta === "Current") {
        colorMode = "current"
    }
} else {
    colorMode = mode
}

</script>

<style scoped>
.sc-top {
    margin-bottom: 32px;
}

.top {
    margin-bottom: 6px;
}

.anchor-bottom {
    align-items: end;
}

.link {
    opacity: 0;
    transition: opacity .3s;
}

.sc-card:hover .link,
.alwayShow {
    opacity: .5;
}

.sc-card .link:hover {
    opacity: 1;
}

.sc-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.large {
    grid-column: span 2;
    height: 240px;
}

.current {
    background: var(--color-accent300);
    background: linear-gradient(325deg, var(--color-accent) 45%, var(--color-accent300) 100%);

    background-color: var(--color-accent);
    box-shadow: 0px 2px 8px var(--color-accent-trans);
    transition: all .3s;
}

.current * {
    color: black;
}


.current:hover {
    box-shadow: 0px 6px 16px var(--color-accent-trans);
}

.free {
    background-color: var(--color-blue500);
}

@media screen and (max-width: 640px) {
    .current {
        grid-column: auto;
    }
}

.random {
    background: #D3CCE3;
    background: linear-gradient(100deg, #E9E4F0, #D3CCE3);
    /* background-color: var(--color-surface); */
}

.normal {
    background-color: var(--color-surface);
    /* color: var(--color-accent700); */
}

.next {
    background-color: rgb(18, 69, 64, 1);
    background-image: radial-gradient(circle, rgba(45, 112, 92, 1) 20%, rgba(18, 69, 64, 1) 90%);
    color: white;
}

.next .subtext {
    opacity: .75;
}

.sc-top .subtext {
    text-align: end;
}

@media (prefers-color-scheme: dark) {
    .normal {
        /* background-color: var(--color-accent700); */
    }
}
</style>