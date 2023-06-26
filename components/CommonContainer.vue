<template>
  <div class="parent">
    <slot />
  </div>
</template>

<style scoped>
.parent>:first-child {
  position: sticky;
  top: 20vh;
  /* bottom: 50vh; */
  height: fit-content;
}

.parent {
  margin-top: 96px;
  padding: 12px 42px;
  display: grid;
  min-height: calc(100vh - 120px);
  grid-template-columns: 440px 1fr;
  gap: 64px;
}

@media screen and (max-width: 1280px) {
  .parent {
    grid-template-columns: 320px 1fr;
  }
}

@media screen and (max-width: 960px) {
  .parent {
    display: block;
  }

  .parent>:first-child {
    position: static;
    top: 0;
    translate: 0;
  }
}

@media screen and (max-width: 640px) {

  .parent {
    padding: 4px 24px;
  }

}
</style>