<script setup lang="ts">
import MainLogo from '@/components/icons/MainLogo.vue'
</script>
<template>
  <div>
    <!-- Fixed Header -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo and Brand -->
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <MainLogo
              class="w-8 h-8 text-primary-600 transition-transform duration-300 group-hover:scale-110"
            />
            <span
              class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent"
            >
              EsportPlanner
            </span>
          </RouterLink>

          <!-- Mobile menu button -->
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex md:items-center md:space-x-8">
            <RouterLink
              to="/"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/tournaments"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Tournaments
            </RouterLink>
            <RouterLink
              to="/teams"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Teams
            </RouterLink>
            <RouterLink
              to="/schedule"
              class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Schedule
            </RouterLink>
          </div>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <div class="hidden md:hidden" id="navbar-default">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/tournaments"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Tournaments
          </RouterLink>
          <RouterLink
            to="/teams"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Teams
          </RouterLink>
          <RouterLink
            to="/schedule"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Schedule
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Spacer to prevent content from being hidden behind fixed header -->
    <div class="h-16"></div>
  </div>
</template>
