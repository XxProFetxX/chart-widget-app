<template>
  <select v-model="model" class="border rounded px-2 py-1 text-sm">
    <option v-for="(label, type) in chartTypes" :key="type" :value="type">
      {{ label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { chartTypes, type ChartType } from '../domain/ChartType';

const props = defineProps<{ modelValue: ChartType }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: ChartType): void;
}>();

const model = defineModel<ChartType>();
</script>
