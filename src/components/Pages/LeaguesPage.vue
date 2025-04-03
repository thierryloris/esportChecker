<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch, computed } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import { debounce } from 'lodash-es'

const route = useRoute()
const router = useRouter()
const leaguesStore = useLeaguesStore()

const currentGame = computed(() => {
  const gameId = Number(route.params.videogame)
  return gameId === 1 ? 'League of Legends' : 'CS:GO'
})

const debouncedSearch = debounce(async () => {
  leaguesStore.setCurrentPage(1)
  await leaguesStore.dispatchGetLeagues(Number(route.params.videogame))
}, 300)

watch(
  () => leaguesStore.searchQuery,
  () => {
    debouncedSearch()
  },
)

watch(
  () => leaguesStore.currentPage,
  async () => {
    await leaguesStore.dispatchGetLeagues(Number(route.params.videogame))
  },
)

watch(
  () => route.params.videogame,
  async () => {
    leaguesStore.setSearchQuery('')
    leaguesStore.setCurrentPage(1)
    await leaguesStore.dispatchGetLeagues(Number(route.params.videogame))
  },
)

onMounted(async () => {
  await leaguesStore.dispatchGetLeagues(Number(route.params.videogame))
})

function handleLeagueClick(leagueId: number) {
  router.push(`/videogame/${route.params.videogame}/league/${leagueId}`)
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/48'
}

function handleSearch(event: Event) {
  const input = event.target as HTMLInputElement
  leaguesStore.setSearchQuery(input.value)
}

function handlePageChange(page: number) {
  leaguesStore.setCurrentPage(page)
}
</script>

<template>
  <main class="min-h-screen bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-white">
        Select League for <span class="text-primary-400">{{ currentGame }}</span>
      </h1>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative">
          <input
            type="text"
            :value="leaguesStore.searchQuery"
            @input="handleSearch"
            :placeholder="`Search ${currentGame} leagues...`"
            class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 shadow-sm"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="leaguesStore.isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="leaguesStore.error"
        class="text-red-400 text-center bg-red-900/20 p-4 rounded-lg"
      >
        {{ leaguesStore.error }}
      </div>

      <!-- No Results State -->
      <div
        v-else-if="leaguesStore.leagues.length === 0"
        class="text-center text-gray-400 py-8 bg-gray-800/50 rounded-lg"
      >
        No leagues found for {{ currentGame }}
      </div>

      <!-- Leagues Grid -->
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="league in leaguesStore.leagues"
            :key="league.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 cursor-pointer hover:border-primary-500 group"
            @click="handleLeagueClick(league.id)"
          >
            <div class="flex flex-col items-center gap-3">
              <img
                :src="league.image_url"
                :alt="league.name"
                class="w-24 h-24 object-contain group-hover:scale-105 transition-transform duration-200"
                @error="handleImageError"
              />
              <span
                class="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors duration-200"
                >{{ league.name }}</span
              >
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="leaguesStore.totalPages > 1" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="handlePageChange(leaguesStore.currentPage - 1)"
              :disabled="leaguesStore.currentPage === 1"
              class="px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-primary-500 transition-colors duration-200 shadow-sm"
            >
              Previous
            </button>
            <span
              class="px-4 py-2 text-gray-900 bg-white rounded-md border border-gray-200 shadow-sm"
            >
              Page {{ leaguesStore.currentPage }} of {{ leaguesStore.totalPages }}
            </span>
            <button
              @click="handlePageChange(leaguesStore.currentPage + 1)"
              :disabled="leaguesStore.currentPage === leaguesStore.totalPages"
              class="px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-primary-500 transition-colors duration-200 shadow-sm"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>
