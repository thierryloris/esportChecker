// the axios instance and types
import http from '../api'
import type { APIResponse } from '../types'
import type { Game } from './types.ts'

async function getGames() {
  return await http.get<APIResponse<Game[]>>('videogames?page=1&per_page=10')
}

async function getGame(id: string) {
  return await http.get<APIResponse<Game[]>>(`videogames/${id}`)
}

export default {
  getGames,
  getGame,
}
