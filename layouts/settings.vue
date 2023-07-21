<template>
    <div class="page">
        <SettingsAppBar />
        <main>
            <div class="sidebar">
                <NuxtLink v-for="{ link, isActive, icon, name } in menuItems" :href="link" class="menu-link"
                    :class="{ active: isActive }">
                    <Icon size="1.5rem" :id="icon" />
                    <p> {{ name }} </p>
                </NuxtLink>
            </div>
            <div class="p-36 content">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
type MenuItem = {
    name: string,
    icon: string,
    link: string,
    isActive: boolean
}

const menuItems = ref([
    {
        name: "Time",
        icon: "schedule",
        isActive: false,
        link: "/settings/time"
    },
    {
        name: "Schedule",
        icon: "calendar_view_month",
        isActive: false,
        link: "/settings/schedule"
    },
    {
        name: "Subject",
        icon: "school",
        isActive: false,
        link: "/settings/subject"
    },
    {
        name: "Teachers",
        icon: "face_4",
        isActive: false,
        link: "/settings/teacher"
    },
    {
        name: "User",
        icon: "person",
        isActive: false,
        link: "/settings/user"
    },
    {
        name: "Developer",
        icon: "construction",
        isActive: false,
        link: "/settings/developer"
    },
])

const route = useRoute()

watchEffect(() => {
    for (let menuItem of menuItems.value) {
        menuItem.isActive = menuItem.link === route.path
    }
})

</script>

<style scoped>
.content {
    margin-left: 240px;
    /* position: fixed; */
    /* width: calc(100vw - 302px); */
    background-color: var(--color-bg);
    /* margin: 0 auto; */
}

.sidebar {
    border-right: 1px solid var(--color-border);
    background-color: var(--color-bg);
    height: 100%;
    position: fixed;
    width: 240px;
    z-index: 9;

}

.menu-link {
    margin: 0;
    color: var(--color-text-secondary);
    padding: 8px 12px;
    padding-left: 18px;
    display: flex;
    align-items: center;
    gap: 18px;
}

.menu-link:hover {
    color: var(--color-text);
    /* background-color: var(--color-active); */
}

.active,
.active:hover {
    background-color: var(--color-accent-trans);
    border-right: 4px solid var(--color-accent);
    color: var(--color-accent700);
}

.page {
    background-color: var(--color-bg);
    padding-top: 64px;
}

main {
    padding-top: 64px;
    padding: 0;
    height: calc(100vh - 64px);
    box-sizing: border-box;
}
</style>