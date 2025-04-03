<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useUpcomingMatchesStore } from '@/stores/upcomingMatches'
import MatchCard from '@/components/Match/MatchCard.vue'
import MatchDateTime from '@/components/Match/MatchDateTime.vue'
import TeamDisplay from '@/components/Match/TeamDisplay.vue'
import MatchFormat from '@/components/Match/MatchFormat.vue'
import BackButton from '@/components/Common/BackButton.vue'

const route = useRoute()
const upcomingMatchesStore = useUpcomingMatchesStore()

watch(
  () => route.params.league_id,
  async () => {
    await upcomingMatchesStore.dispatchGetUpcomingMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    })
  },
)

watch(
  () => route.params.videogame,
  async () => {
    await upcomingMatchesStore.dispatchGetUpcomingMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    })
  },
)

onMounted(async () => {
  await upcomingMatchesStore.dispatchGetUpcomingMatches({
    league_id: Number(route.params.league_id),
    videogame: Number(route.params.videogame),
  })
})
</script>

<template>
  <main class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <BackButton />
      <h1 class="text-4xl font-bold mb-8 text-white">Upcoming Matches</h1>

      <!-- Loading State -->
      <div v-if="upcomingMatchesStore.isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="upcomingMatchesStore.error"
        class="text-red-400 text-center bg-red-900/20 p-4 rounded-lg"
      >
        {{ upcomingMatchesStore.error }}
      </div>

      <!-- No Results State -->
      <div
        v-else-if="upcomingMatchesStore.matches.length === 0"
        class="text-center text-gray-400 py-8 bg-gray-800/50 rounded-lg"
      >
        No upcoming matches found
      </div>

      <!-- Matches Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MatchCard v-for="match in upcomingMatchesStore.matches" :key="match.id" :match="match">
          <MatchDateTime :date-string="match.begin_at" />

          <div class="flex-1 flex items-center justify-between">
            <TeamDisplay
              :image-url="match.opponents[0]?.opponent.image_url"
              :name="match.opponents[0]?.opponent.acronym || match.opponents[0]?.opponent.name"
            />

            <div class="flex items-center gap-3 mx-4">
              <span class="text-3xl font-bold text-primary-600">VS</span>
            </div>

            <TeamDisplay
              :image-url="match.opponents[1]?.opponent.image_url"
              :name="match.opponents[1]?.opponent.acronym || match.opponents[1]?.opponent.name"
            />
          </div>

          <MatchFormat :match="match" />
        </MatchCard>
      </div>
    </div>
  </main>
</template>
