<template>
  <div class="flex items-center space-x-2  bg-gray-200 p-2 rounded-md shadow-sm relative">
    <button
      v-for="(option, key) in ranges"
      :key="key"
      :class="[
        'px-3 py-1 rounded-full text-sm font-medium transition relative',
        modelValue === key ? 'bg-white text-gray-900' : 'text-gray-500 hover:bg-gray-100',
      ]"
      @click="$emit('update:modelValue', key)"
      @mouseenter="showTooltip(key, $event)"
      @mouseleave="hideTooltip"
    >
      {{ option.label }}

      <!-- Tooltip pequeño -->
      <div
        v-if="tooltipVisible && tooltipKey === key && option.description"
        class="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-700 text-white text-xs rounded px-2 py-1 pointer-events-none select-none z-50"
        style="user-select: none;"
      >
        {{ option.description }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DateRangeKey } from '../domain/DateRange';
import { dateRangeOptions } from '../domain/DateRange';

defineProps<{
  modelValue: DateRangeKey;
}>();

defineEmits<{
  (e: 'update:modelValue', value: DateRangeKey): void;
}>();

const ranges = dateRangeOptions;

const tooltipVisible = ref(false);
const tooltipKey = ref<DateRangeKey | null>(null);

function showTooltip(key: DateRangeKey, event: MouseEvent) {
  tooltipKey.value = key;
  tooltipVisible.value = true;
}

function hideTooltip() {
  tooltipVisible.value = false;
  tooltipKey.value = null;
}
</script>
