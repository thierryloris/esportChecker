<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import { usePastMatchesStore } from '@/stores/pastMatches'
import { useUpcomingMatchesStore } from '@/stores/upcomingMatches'
import { getTeamColor } from '@/utils/matches'
import MatchCard from '@/components/Match/MatchCard.vue'
import MatchDateTime from '@/components/Match/MatchDateTime.vue'
import TeamDisplay from '@/components/Match/TeamDisplay.vue'
import MatchScore from '@/components/Match/MatchScore.vue'
import MatchFormat from '@/components/Match/MatchFormat.vue'
import BackButton from '@/components/Common/BackButton.vue'

const route = useRoute()
const pastMatchesStore = usePastMatchesStore()
const upcomingMatchesStore = useUpcomingMatchesStore()

const lastFiveMatches = computed(() => {
  return pastMatchesStore.matches.slice(0, 4)
})

const nextFiveMatches = computed(() => {
  return upcomingMatchesStore.matches.slice(0, 4)
})

onMounted(async () => {
  await Promise.all([
    pastMatchesStore.dispatchGetPastMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    }),
    upcomingMatchesStore.dispatchGetUpcomingMatches({
      league_id: Number(route.params.league_id),
      videogame: Number(route.params.videogame),
    }),
  ])
})
</script>

<template>
  <main class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <BackButton />
      <!-- Past Matches Section -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-white">Last Matches</h2>
          <RouterLink
            :to="`/videogame/${route.params.videogame}/league/${route.params.league_id}/previous-matches`"
            class="text-primary-400 hover:text-primary-300 font-medium"
          >
            View All Past Matches →
          </RouterLink>
        </div>

        <!-- Loading State -->
        <div v-if="pastMatchesStore.isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="pastMatchesStore.error"
          class="text-red-400 text-center bg-red-900/20 p-4 rounded-lg"
        >
          {{ pastMatchesStore.error }}
        </div>

        <!-- Past Matches Grid -->
        <div v-else-if="lastFiveMatches.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatchCard v-for="match in lastFiveMatches" :key="match.id" :match="match">
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
      </section>

      <!-- Upcoming Matches Section -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-white">Upcoming Matches</h2>
          <RouterLink
            :to="`/videogame/${route.params.videogame}/league/${route.params.league_id}/upcoming-matches`"
            class="text-primary-400 hover:text-primary-300 font-medium"
          >
            View All Upcoming Matches →
          </RouterLink>
        </div>

        <!-- Loading State -->
        <div v-if="upcomingMatchesStore.isLoading" class="flex justify-center items-center h-32">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>

        <!-- Error State -->
        <div
          v-else-if="upcomingMatchesStore.error"
          class="text-red-400 text-center bg-red-900/20 p-4 rounded-lg"
        >
          {{ upcomingMatchesStore.error }}
        </div>

        <!-- Upcoming Matches Grid -->
        <div v-else-if="nextFiveMatches.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MatchCard v-for="match in nextFiveMatches" :key="match.id" :match="match">
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
      </section>
    </div>
  </main>
</template>
