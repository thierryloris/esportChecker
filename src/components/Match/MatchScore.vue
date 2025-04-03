<script setup lang="ts">
import type { Match } from '@/services/PastMatches/types'
import { getTeamColor, getTeamScore } from '@/utils/matches'

defineProps<{
  match: Match
  team1Id: number
  team2Id: number
}>()
</script>

<template>
  <div class="flex items-center gap-3 mx-4">
    <span :class="['text-3xl font-bold', getTeamColor(match, team1Id)]">
      {{ getTeamScore(match, team1Id) }}
    </span>
    <span class="text-3xl font-bold text-gray-600">-</span>
    <span :class="['text-3xl font-bold', getTeamColor(match, team2Id)]">
      {{ getTeamScore(match, team2Id) }}
    </span>
  </div>
</template>
