<script setup lang="ts">
import type { Match as PastMatch } from '@/services/PastMatches/types'
import type { Match as UpcomingMatch } from '@/services/UpcomingMatches/types'
import { getMatchFormat } from '@/utils/matches'

defineProps<{
  match: PastMatch | UpcomingMatch
}>()
</script>

<template>
  <div class="w-16 text-center">
    <span class="text-xl font-bold text-gray-900">{{ getMatchFormat(match) }}</span>
  </div>
</template>
