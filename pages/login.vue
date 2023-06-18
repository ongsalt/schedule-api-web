<template>
 <div class="grid gap-6">
        <form>
            <div class="grid gap-2">
                <div class="grid gap-1">
                    <label class="sr-only" htmlFor="email">
                        Email
                    </label>
                    <Input id="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email"
                        autoCorrect="off" disabled={isLoading} />
                </div>
                <Button disabled={isLoading}>
                    {isLoading && (
                    <LoadingIndicator class="mr-2 h-4 w-4" />
                    )}
                    Sign In with Email
                </Button>
            </div>
        </form>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
            <LoadingIndicator class="mr-2 h-4 w-4" />
            ) : (
            <Icon id="github" class="mr-2 h-4 w-4" />
            )}{" "}
            Github
        </Button>
    </div>โ</template>

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
  