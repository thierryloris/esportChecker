<script setup lang="ts">
import RocketLeague from '@/components/icons/RocketLeague.vue'
import LeagueOfLegends from '@/components/icons/LeagueOfLegends.vue'
import RainbowSixSiege from '@/components/icons/RainbowSixSiege.vue'
import CounterStrike from '@/components/icons/CounterStrike.vue'
import GameCard from '@/components/UiLib/GameCard/GameCard.vue'
</script>

<template>
  <main class="min-h-screen bg-gray-900">
    <div class="p-12">
      <h1
        class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl text-center"
      >
        Select Your <span class="text-primary-400">Game</span>
      </h1>
      <div class="flex flex-wrap justify-center gap-6">
        <GameCard title="Rocket League" id="rl">
          <RocketLeague class="w-24 h-24" />
        </GameCard>
        <GameCard title="Counter Strike" id="3">
          <CounterStrike class="w-24 h-24" />
        </GameCard>
        <GameCard title="League of Legends" id="1">
          <LeagueOfLegends class="w-24 h-24" />
        </GameCard>
        <GameCard title="RainbowSix Siege" id="r6-siege">
          <RainbowSixSiege class="w-24 h-24" />
        </GameCard>
      </div>
    </div>
    <!--
    <div class="p-12 border-t border-gray-800">
      <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl text-center">
        Bet on <span class="text-primary-400">Upcoming Matches</span>
        <span class="text-sm font-normal text-gray-400 block mt-2">(Coming Soon)</span>
      </h1>
      <div class="flex flex-wrap justify-center gap-6">
        <GameCard title="Rocket League" :id="5">
          <RocketLeague class="w-24 h-24" />
        </GameCard>
        <GameCard title="Counter Strike" :id="3">
          <CounterStrike class="w-24 h-24" />
        </GameCard>
        <GameCard title="League of Legends" :id="1">
          <LeagueOfLegends class="w-24 h-24" />
        </GameCard>
        <GameCard title="RainbowSix Siege" :id="6">
          <RainbowSixSiege class="w-24 h-24" />
        </GameCard>
      </div>
    </div>
    -->
  </main>
</template>
