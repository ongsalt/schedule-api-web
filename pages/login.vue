<template>
    <div>
        <p>Sign-In Options:</p>
        <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
        <button
            class="bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
            @click="onLogin">Username and Password</button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})
const { signIn } = useAuth()

const onLogin = () => signIn('credentials', { username: 'test', password: 'hunter2' })
</script>
  