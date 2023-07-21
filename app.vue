<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">

const route = useRoute()

watchEffect(() => {
  if (process.client) {
    // if (route.meta.consoleBg) {
    //   console.log("Changing color")
    //   document.body.style.backgroundColor = "var(--color-bg)"
    //   document.body.parentElement!.style.backgroundColor = "var(--color-bg)"
    //   // document.body.parentElement!.style.scrollbarGutter = "auto"
    // } else {
    //   document.body.style.backgroundColor = "var(--color-bg-immersive)"
    //   document.body.parentElement!.style.backgroundColor = "var(--color-bg-immersive)"
    //   // document.body.parentElement!.style.scrollbarGutter = "stable"

    // }
  }
})


</script>

<style>
/* .page-enter-active {
  transition: all .5s var(--ease-ios-last), opacity .5s;
}
.page-leave-active {
  transition: all .25s var(--ease-ios-first), opacity .25s;
} */

.page-enter-active,
.page-leave-active {
  transition: all 1s var(--ease-ios),
    opacity .7s;
}

.page-enter-from,
.page-leave-to {
  transform-origin: center 50vh;
  position: fixed;
  top: 96px;
  width: 100%;
  scale: 0.9;
  box-sizing: border-box;
  opacity: 0;
  filter: blur(2rem);
}

.page-enter-to,
.page-leave-from {
  transform-origin: center 50vh;
  /* scale: 0.95; */
  /* translate: 2vw 0; */
}
</style>