<template>
  <select v-model="model" class="border rounded px-2 py-1 text-sm">
    <option v-for="currency in currencies" :key="currency" :value="currency">
      {{ currency.toUpperCase() }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { currencyList } from '../domain/Currencies';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const currencies = currencyList;
const model = defineModel<string>();
</script>
