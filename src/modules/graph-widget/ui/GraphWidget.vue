<template>
  <div class="bg-white rounded p-4 shadow w-full">
    <h2 class="text-lg font-semibold mb-4">{{ config.title }}</h2>
    <svg ref="svgRef" class="w-full h-[600px] border rounded"></svg>
  </div>
</template>

<script setup lang="ts">
import { useGraphWidget } from '../application/useGraphWidget';
import type { GraphConfig } from '../domain/GraphConfig';

const props = defineProps<{ config: GraphConfig }>();
const { svgRef } = useGraphWidget(props.config);
</script>
