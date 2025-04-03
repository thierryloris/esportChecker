<script setup lang="ts">
import { formatMatchDate, formatMatchTime } from '@/utils/matches'

defineProps<{
  dateString: string
}>()
</script>

<template>
  <div class="text-center w-24">
    <div class="text-2xl font-bold text-gray-900">{{ formatMatchDate(dateString) }}</div>
    <div class="text-xl text-gray-600">{{ formatMatchTime(dateString) }}</div>
  </div>
</template>
