import http from '../api'
import type { APIResponse } from '../types'
import type { Match } from './types'

interface GetUpcomingMatchesParams {
  league_id?: number
  videogame?: number
}

async function getUpcomingMatches(params: GetUpcomingMatchesParams = {}) {
  const queryParams = new URLSearchParams()
  if (params.league_id) queryParams.append('filter[league_id]', params.league_id.toString())
  if (params.videogame) queryParams.append('filter[videogame]', params.videogame.toString())
  queryParams.append('sort', 'begin_at')
  queryParams.append('page', '1')
  queryParams.append('per_page', '50')

  return await http.get<APIResponse<Match[]>>(`matches/upcoming?${queryParams.toString()}`)
}

export default {
  getUpcomingMatches,
}
