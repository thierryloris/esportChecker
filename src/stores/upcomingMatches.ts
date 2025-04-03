import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Match } from '../services/UpcomingMatches/types'
import type { APIResponse } from '../services/types'
import { API } from '../services'
import { AxiosError } from 'axios'

interface GetUpcomingMatchesParams {
  league_id?: number
  videogame?: number
}

interface MatchesCache {
  [key: string]: {
    matches: Match[]
    lastFetched: number
  }
}

export const useUpcomingMatchesStore = defineStore('upcomingMatchesStore', () => {
  const matchesCache = ref<MatchesCache>({})
  const currentLeagueId = ref<number | null>(null)
  const currentVideoGameId = ref<number | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Cache expiration time in milliseconds (5 minutes)
  const CACHE_EXPIRATION = 5 * 60 * 1000

  const matches = computed(() => {
    const cacheKey = getCacheKey(currentLeagueId.value, currentVideoGameId.value)
    return matchesCache.value[cacheKey]?.matches || []
  })

  function getCacheKey(leagueId?: number | null, videoGameId?: number | null): string {
    return `${leagueId || 'all'}-${videoGameId || 'all'}`
  }

  function isCacheValid(cacheKey: string): boolean {
    const cache = matchesCache.value[cacheKey]
    if (!cache) return false

    const now = Date.now()
    return now - cache.lastFetched < CACHE_EXPIRATION
  }

  function initMatches(data: Match[], leagueId?: number | null, videoGameId?: number | null) {
    const cacheKey = getCacheKey(leagueId, videoGameId)
    matchesCache.value[cacheKey] = {
      matches: data,
      lastFetched: Date.now(),
    }
    currentLeagueId.value = leagueId || null
    currentVideoGameId.value = videoGameId || null
  }

  async function dispatchGetUpcomingMatches(
    params: GetUpcomingMatchesParams = {},
  ): Promise<APIResponse<null>> {
    const cacheKey = getCacheKey(params.league_id, params.videogame)

    // Return cached data if valid
    if (isCacheValid(cacheKey)) {
      currentLeagueId.value = params.league_id || null
      currentVideoGameId.value = params.videogame || null
      return {
        success: true,
        content: null,
      }
    }

    isLoading.value = true
    error.value = null

    try {
      const { status, data } = await API.upcomingMatches.getUpcomingMatches(params)
      if (status === 200) {
        initMatches(data, params.league_id, params.videogame)
        isLoading.value = false
        return {
          success: true,
          content: null,
        }
      }
    } catch (err) {
      const _error = err as AxiosError<string>
      error.value = _error.message
      isLoading.value = false
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      }
    }

    isLoading.value = false
    return {
      success: false,
      content: null,
      status: 400,
    }
  }

  function clearCache() {
    matchesCache.value = {}
    currentLeagueId.value = null
    currentVideoGameId.value = null
  }

  return {
    matches,
    isLoading,
    error,
    dispatchGetUpcomingMatches,
    clearCache,
  }
})
