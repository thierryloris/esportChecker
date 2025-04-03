<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { usePastMatchesStore } from '@/stores/pastMatches'
import { getTeamColor } from '@/utils/matches'
import MatchCard from '@/components/Match/MatchCard.vue'
import MatchDateTime from '@/components/Match/MatchDateTime.vue'
import TeamDisplay from '@/components/Match/TeamDisplay.vue'
import MatchScore from '@/components/Match/MatchScore.vue'
import MatchFormat from '@/components/Match/MatchFormat.vue'
import BackButton from '@/components/Common/BackButton.vue'

const route = useRoute()
const pastMatchesStore = usePastMatchesStore()

watch(
  () => route.params.league_id,
  async () => {
    await pastMatchesStore.dispatchGetPastMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    })
  },
)

watch(
  () => route.params.videogame,
  async () => {
    await pastMatchesStore.dispatchGetPastMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    })
  },
)

onMounted(async () => {
  await pastMatchesStore.dispatchGetPastMatches({
    league_id: Number(route.params.league_id),
    videogame: Number(route.params.videogame),
  })
})
</script>

<template>
  <main class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <BackButton />
      <h1 class="text-4xl font-bold mb-8 text-white">Past Matches</h1>

      <!-- Loading State -->
      <div v-if="pastMatchesStore.isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="pastMatchesStore.error"
        class="text-red-400 text-center bg-red-900/20 p-4 rounded-lg"
      >
        {{ pastMatchesStore.error }}
      </div>

      <!-- No Results State -->
      <div
        v-else-if="pastMatchesStore.matches.length === 0"
        class="text-center text-gray-400 py-8 bg-gray-800/50 rounded-lg"
      >
        No past matches found
      </div>

      <!-- Matches Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MatchCard v-for="match in pastMatchesStore.matches" :key="match.id" :match="match">
          <MatchDateTime :date-string="match.begin_at" />

          <div class="flex-1 flex items-center justify-between">
            <TeamDisplay
              :image-url="match.opponents[0]?.opponent.image_url"
              :name="match.opponents[0]?.opponent.acronym || match.opponents[0]?.opponent.name"
              :text-color-class="getTeamColor(match, match.opponents[0]?.opponent.id)"
            />

            <MatchScore
              :match="match"
              :team1-id="match.opponents[0]?.opponent.id"
              :team2-id="match.opponents[1]?.opponent.id"
            />

            <TeamDisplay
              :image-url="match.opponents[1]?.opponent.image_url"
              :name="match.opponents[1]?.opponent.acronym || match.opponents[1]?.opponent.name"
              :text-color-class="getTeamColor(match, match.opponents[1]?.opponent.id)"
            />
          </div>

          <MatchFormat :match="match" />
        </MatchCard>
      </div>
    </div>
  </main>
</template>
