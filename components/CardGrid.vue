<template>
    <div class="card-grid">
        <slot />
    </div>
</template>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    height: fit-content;
}

@media screen and (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>