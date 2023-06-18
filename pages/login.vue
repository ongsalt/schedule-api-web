<script setup lang="ts">
definePageMeta({
    layout: 'auth',
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})
const { login } = useAuth()

const isLoading = ref(false)

const username = ref("")
const password = ref("")

const errorMessage = ref("")

const onLogin = async () => {
    await login(username.value, password.value)
}
</script>
        
<template>
    <div>
        <h2> Log in </h2>
        <p class="secondary">
            New to this?
            <NuxtLink to="/register" class="link">Sign up for an account</NuxtLink>.
        </p>
        <form @submit.prevent>
            <div class="labeled">
                <label for="username"> Username </label>
                <input type="text" name="username" v-model="username">
            </div>
            <div class="labeled">
                <label for="password"> Password </label>
                <input type="password" name="password" v-model="password">
            </div>
            <p class="error"> {{ errorMessage }} </p>
            <p class="info"> If you forgot your password please contact admin </p>
            <LoadingAsyncButton :action="onLogin" title="Login" class="login-button" />
        </form>
    </div>
</template>


<style scoped>
form {
    margin-top: 24px;
}

.login-button {
    display: flex;
    width: 100%;
}
</style>
  