<script setup lang="ts">
import type { Match as PastMatch } from '@/services/PastMatches/types'
import type { Match as UpcomingMatch } from '@/services/UpcomingMatches/types'

defineProps<{
  match: PastMatch | UpcomingMatch
}>()
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg">
    <!-- League Info -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-500 p-2 text-white">
      <span class="font-bold uppercase tracking-wider">
        {{ match.league.name }} - {{ match.name }}
      </span>
    </div>

    <!-- Match Content -->
    <div class="p-6 flex items-center gap-4 bg-white">
      <slot></slot>
    </div>
  </div>
</template>
