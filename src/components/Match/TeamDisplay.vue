<script setup lang="ts">
import { handleImageError } from '@/utils/matches'

defineProps<{
  imageUrl?: string
  name: string
  textColorClass?: string
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex flex-col items-center gap-2">
      <img :src="imageUrl" :alt="name" class="w-14 h-14 object-contain" @error="handleImageError" />
      <span :class="['font-bold text-lg uppercase', textColorClass || 'text-white']">
        {{ name }}
      </span>
    </div>
  </div>
</template>
