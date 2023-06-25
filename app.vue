<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">

const route = useRoute()

watchEffect(() => {
  if (route.meta.consoleBg) {
    if (process.client) {
      console.log("Changing color")
      document.body.style.backgroundColor = "var(--color-bg)"
      document.body.parentElement!.style.backgroundColor = "var(--color-bg)"
      document.body.parentElement!.style.scrollbarGutter = "auto"
    }
  } else {
    document.body.style.backgroundColor = "var(--color-bg-immersive)"
    document.body.parentElement!.style.backgroundColor = "var(--color-bg-immersive)"
    document.body.parentElement!.style.scrollbarGutter = "stable"

  }
})

</script>