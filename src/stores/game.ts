import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '../services/Games/types.ts'
import type { APIResponse } from '../services/types.ts'
import { API } from '../services'
import { AxiosError } from 'axios'

export const useGameStore = defineStore('gameStore', () => {
  const games = ref<Game[]>([])

  function initGames(data: Game[]) {
    console.log(data)
    games.value = data
    console.log(games.value)
  }

  async function dispatchGetGames(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.games.getGames()
      if (status === 200) {
        initGames(data.content)
        return {
          success: true,
          content: null,
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
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

  async function dispatchGetGame(id: string): Promise<APIResponse<unknown>> {
    try {
      const { status, data } = await API.games.getGame(id)
      if (status === 200) {
        return {
          success: true,
          content: data,
          status: 200,
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
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
    games,
    initGames,
    dispatchGetGames,
    dispatchGetGame,
  }
})
