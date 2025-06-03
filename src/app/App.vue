<template>
  <main class="p-4 bg-gray-100 min-h-screen space-y-8">
    <GraphWidget :config="sampleGraphConfig" />
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { GraphConfig } from '../modules/graph-widget/domain/GraphConfig';

import GraphWidget from '../modules/graph-widget/ui/GraphWidget.vue';

const sampleGraphConfig = reactive<GraphConfig>({
  title: 'Red de Nodos Demo',
  nodes: [
    { id: 'Breydi', group: 1 },
    { id: 'Angela', group: 1 },
    { id: 'Jorge', group: 2 },
    { id: 'Vue', group: 3 },
    { id: 'D3.js', group: 3 },
  ],
  links: [
    { source: 'Breydi', target: 'Angela' },
    { source: 'Angela', target: 'Jorge' },
    { source: 'Breydi', target: 'Vue' },
    { source: 'Jorge', target: 'D3.js' },
  ],
});
</script>
