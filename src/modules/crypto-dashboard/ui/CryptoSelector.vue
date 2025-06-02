<template>
  <aside class="w-40 bg-white shadow rounded-md p-4 overflow-y-auto">
    <div class="mb-2 font-bold text-sm text-gray-700">Criptomonedas</div>

    <ul>
      <li
        v-for="coin in filteredCoins"
        :key="coin.id"
        :class="[
          'cursor-pointer px-2 py-1 rounded hover:bg-gray-100 text-sm',
          modelValue === coin.id ? 'bg-gray-200 font-semibold' : '',
        ]"
        @click="$emit('update:modelValue', coin.id)"
      >
        {{ coin.name }}
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CryptoOption } from '../domain/CryptoOption';
import { fetchCryptoList } from '../infrastructure/fetchCryptoList';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const coins = ref<CryptoOption[]>([]);
const filteredCoins = ref<CryptoOption[]>([]);

const commonCoinIds = ['bitcoin', 'ethereum', 'solana', 'dogecoin', 'cardano', 'ripple', 'litecoin'];

const loadCoins = async () => {
  try {
    const allCoins = await fetchCryptoList();
    filteredCoins.value = allCoins.filter(c => commonCoinIds.includes(c.id));
    coins.value = allCoins;
  } catch (error) {
    console.error('Error al cargar criptomonedas:', error);
  }
};

onMounted(loadCoins);
</script>
