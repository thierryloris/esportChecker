import type { Match as PastMatch } from '@/services/PastMatches/types'
import type { Match as UpcomingMatch } from '@/services/UpcomingMatches/types'

export function formatMatchDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
  })
}

export function formatMatchTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/48'
}

export function isWinner(match: PastMatch, opponentId: number) {
  return match.winner?.id === opponentId
}

export function getTeamColor(match: PastMatch, opponentId: number) {
  if (!match.winner) return 'text-white'
  if (isWinner(match, opponentId)) {
    return 'text-green-400'
  }
  return 'text-red-400'
}

export function getTeamScore(match: PastMatch, teamId: number) {
  return match.results?.find((result) => result.team_id === teamId)?.score || 0
}

export function getMatchFormat(match: PastMatch | UpcomingMatch) {
  if ('results' in match && match.results) {
    const maxScore = Math.max(...match.results.map((result) => result.score))
    if (maxScore <= 1) return 'BO1'
    if (maxScore <= 2) return 'BO3'
    return 'BO5'
  }
  return 'BO1'
}
