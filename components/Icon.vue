<template>
  <span class="icon" :style="{ fontSize: sizeString, color }" :class="props?.class">
    {{ id }}
  </span>
</template>

<style scoped>
.icon {
  font-family: 'Material Symbols Rounded';
  font-weight: 500;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  user-select: none;
  height: fit-content;
}
</style>

<script setup lang="ts">
const props = defineProps<{ size?: number | string, color?: string, id: string, class?: string }>()
const { size, color, id } = props
let sizeString: any;
if (!size) {
  sizeString = `18px`
} else if (isNaN(size as any)) {
  sizeString = size;
} else {
  sizeString = `${size}`
}
console.log(sizeString)
</script>