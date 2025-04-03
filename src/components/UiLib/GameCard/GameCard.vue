<script setup lang="ts">
defineProps<{
  title: string
  id: number | string
}>()
</script>

<template>
  <div>
    <RouterLink :to="`/videogame/${id}/leagues`">
      <div
        class="p-8 bg-white border border-gray-100 rounded-xl text-gray-900 hover:border-primary-500 flex justify-center items-center flex-col gap-4 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-primary-500/10"
      >
        <div class="group-hover:scale-105 transition-transform duration-300">
          <slot></slot>
        </div>
        <p class="text-lg font-medium group-hover:text-primary-600 transition-colors duration-300">
          {{ title }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>
