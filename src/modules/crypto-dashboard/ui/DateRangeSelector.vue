<template>
  <div class="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm">
    <button
      v-for="(option, key) in ranges"
      :key="key"
      :class="[
        'px-3 py-1 rounded-full text-sm font-medium transition',
        modelValue === key ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100',
      ]"
      @click="$emit('update:modelValue', key)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { DateRangeKey } from '../domain/DateRange';
import { dateRangeOptions } from '../domain/DateRange';

defineProps<{
  modelValue: DateRangeKey;
}>();

defineEmits<{
  (e: 'update:modelValue', value: DateRangeKey): void;
}>();

const ranges = dateRangeOptions;
</script>
