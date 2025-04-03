export type Match = {
  id: number
  begin_at: string
  name: string
  league: {
    id: number
    name: string
    slug: string
  }
  opponents: {
    type: string
    opponent: {
      id: number
      name: string
      slug: string
      image_url: string
      location: string
      modified_at: string
      acronym: string
    }
  }[]
  videogame: {
    id: number
    name: string
    slug: string
  }
  winner: {
    id: number
    name: string
    location: string
    slug: string
    modified_at: string
    acronym: string
    image_url: string
  }
  results: {
    score: number
    team_id: number
  }[]
}
