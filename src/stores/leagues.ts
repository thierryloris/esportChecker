import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { League } from '../services/Leagues'
import type { APIResponse } from '../services/types'
import { API } from '../services'
import { AxiosError } from 'axios'

export const useLeaguesStore = defineStore('leaguesStore', () => {
  const leagues = ref<League[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const searchQuery = ref('')
  const perPage = ref(50)

  function initLeagues(data: League[]) {
    leagues.value = data
  }

  function setTotalPages(total: number) {
    totalPages.value = total
  }

  function setCurrentPage(page: number) {
    currentPage.value = page
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  async function dispatchGetLeagues(videogame_id?: number): Promise<APIResponse<null>> {
    isLoading.value = true
    error.value = null
    try {
      const { status, data } = await API.leagues.getLeagues({
        videogame_id,
        search: searchQuery.value,
        page: currentPage.value,
        per_page: perPage.value,
      })
      if (status === 200) {
        initLeagues(data)
        setTotalPages(Math.ceil((data.total ?? 0) / perPage.value))
        isLoading.value = false
        return {
          success: true,
          content: null,
        }
      }
    } catch (err) {
      const _error = err as AxiosError<string>
      error.value = _error.message
      return {
        success: false,
        status: _error.response?.status,
        content: null,
      }
    }
    return {
      success: false,
      content: null,
      status: 400,
    }
  }

  return {
    leagues,
    isLoading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    perPage,
    initLeagues,
    setTotalPages,
    setCurrentPage,
    setSearchQuery,
    dispatchGetLeagues,
  }
})
