import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UpcomingMatchesPage from '@/components/Pages/UpcomingMatchesPage.vue'
import PreviousMatchesPage from '@/components/Pages/PreviousMatchesPage.vue'
import LeaguesPage from '@/components/Pages/LeaguesPage.vue'
import LeaguePage from '@/components/Pages/LeaguePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/videogame/:videogame/leagues',
      component: LeaguesPage,
    },
    {
      path: '/videogame/:videogame/league/:league_id/upcoming-matches',
      component: UpcomingMatchesPage,
    },
    {
      path: '/videogame/:videogame/league/:league_id/previous-matches',
      component: PreviousMatchesPage,
    },
    {
      path: '/videogame/:videogame/league/:league_id/',
      component: LeaguePage,
    },
  ],
})

export default router
