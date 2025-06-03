<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="flex justify-between items-center p-4 bg-white shadow relative">
      <h1 class="font-bold text-xl">Widgets App</h1>

      <div class="hidden md:flex space-x-4">
        <button @click="goTo('Crypto')" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
          Crypto Graphics
        </button>
        <button
          @click="goTo('NodeNetwork')"
          class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          Node Network
        </button>
      </div>

      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden flex items-center px-3 py-2 border rounded text-gray-600 border-gray-600 hover:text-gray-900 hover:border-gray-900 transition"
        aria-label="Toggle menu"
      >
        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <div v-if="menuOpen" class="absolute right-4 top-full mt-2 w-40 bg-white border rounded shadow-md md:hidden z-10">
        <button
          @click="
            goTo('Crypto');
            menuOpen = false;
          "
          class="block w-full text-left px-4 py-2 hover:bg-blue-100"
        >
          Crypto Graphics
        </button>
        <button
          @click="
            goTo('NodeNetwork');
            menuOpen = false;
          "
          class="block w-full text-left px-4 py-2 hover:bg-green-100"
        >
          Node Network
        </button>
      </div>
    </nav>

    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const menuOpen = ref(false);

function goTo(routeName: string) {
  router.push({ name: routeName });
}
</script>
