import http from '../api'
import type { APIResponse } from '../types'

export interface League {
  id: number
  name: string
  image_url: string
}

interface GetLeaguesParams {
  videogame_id?: number
  search?: string
  page?: number
  per_page?: number
}

async function getLeagues(params: GetLeaguesParams = {}) {
  console.log(params)
  const queryParams = new URLSearchParams()
  if (params.videogame_id)
    queryParams.append('filter[videogame_id]', params.videogame_id.toString())
  if (params.search) queryParams.append('search[name]', params.search)
  queryParams.append('sort', 'name')
  queryParams.append('page', (params.page || 1).toString())
  queryParams.append('per_page', (params.per_page || 50).toString())

  return await http.get<APIResponse<League[]>>(`leagues?${queryParams.toString()}`)
}

export default {
  getLeagues,
}
