<template>
    <main>
        <div>
            <NuxtLink href="/settings/time" class="menu-link active">
                <Icon size="1.5rem" id="Schedule" />
                <p> Time </p>
            </NuxtLink>
            <NuxtLink href="/settings/class" class="menu-link">
                <Icon size="1.5rem" id="group" />
                <p> Class </p>
            </NuxtLink>
            <NuxtLink href="/settings/subject" class="menu-link">
                <Icon size="1.5rem" id="school" />
                <p> Subject </p>
            </NuxtLink>
            <NuxtLink href="/settings/schedule" class="menu-link">
                <Icon size="1.5rem" id="calendar_view_month" />
                <p> Schedule </p>
            </NuxtLink>
            <NuxtLink href="/settings/user" class="menu-link">
                <Icon size="1.5rem" id="person" />
                <p> User </p>
            </NuxtLink>
        </div>
        <slot />
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
.menu-link {
    margin: 12px 0;
    color: var(--color-text-secondary);
    padding: 12px;
    border-radius: 8px;
    transition: all .3s;
    display: flex;
    align-items: center;
    gap: 18px;
}

.menu-link:hover {
    color: var(--color-text);
}

.active {
    background-color: white;
    color: var(--color-text);
    box-shadow: var(--shadow0);
}

main {
    display: grid;
    grid-template-columns: 240px 1fr;
    align-items: center;
    top: 96px;
    padding: 12px 36px;
    height: calc(100vh - 96px);
    box-sizing: border-box;
    position: absolute;
}

div {
    /* background-color: red; */
}
</style>