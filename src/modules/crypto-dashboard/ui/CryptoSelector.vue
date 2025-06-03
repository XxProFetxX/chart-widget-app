<template>
  <div class="w-full relative">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Buscar criptomoneda..."
      class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- Solo mostrar lista si hay término de búsqueda y resultados -->
    <ul
      v-if="searchTerm.length > 0 && filteredCoins.length"
      class="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded shadow text-sm w-full"
    >
      <li
        v-for="coin in filteredCoins"
        :key="coin.id"
        @click="selectCoin(coin.id)"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        :class="{ 'bg-gray-200 font-semibold': modelValue === coin.id }"
      >
        {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { CryptoOption } from '../domain/CryptoOption';
import { fetchCryptoList } from '../infrastructure/fetchCryptoList';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const coins = ref<CryptoOption[]>([]);
const searchTerm = ref('');

const filteredCoins = ref<CryptoOption[]>([]);

const loadCoins = async () => {
  try {
    const data = await fetchCryptoList();
    coins.value = data;
    filteredCoins.value = data.slice(0, 50); // mostrar los primeros 50 por defecto
  } catch (err) {
    console.error('Error al cargar criptomonedas:', err);
  }
};

const filterCoins = () => {
  const term = searchTerm.value.toLowerCase();
  filteredCoins.value = coins.value.filter(
    c => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term)
  );
};

const selectCoin = (id: string) => {
  emit('update:modelValue', id);
  searchTerm.value = ''; // opcional: limpiar input al seleccionar
  filteredCoins.value = []; // cerrar lista
};

watch(searchTerm, filterCoins);

onMounted(loadCoins);
</script>
