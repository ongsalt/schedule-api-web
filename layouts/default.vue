<script lang="ts" setup></script>

<template>
  <AppBar />
  <div class="parent">
    <slot />
  </div>
</template>

<style scoped>
.parent>:first-child {
  position: sticky;
  top: 50vh;
  translate: 0 -50%;
  height: fit-content;
}

.parent {
  margin-top: 96px;
  padding: 12px 42px;
  display: grid;
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
</style>
