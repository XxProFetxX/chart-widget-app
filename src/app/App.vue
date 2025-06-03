<template>
  <main class="p-4 bg-gray-100 min-h-screen space-y-8">
    <div class="flex flex-col lg:flex-row gap-4">
      <GraphWidget :config="sampleGraphConfig" class="flex-1" />

      <div class="bg-white rounded p-4 shadow max-w-md w-full">
        <h2 class="text-lg font-semibold mb-2">Instrucciones</h2>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>🖱️ Haz <strong>click en el fondo</strong> para agregar un nodo en esa posición.</li>
          <li>🟠 <strong>Click en un nodo:</strong>
            <ul class="list-disc list-inside ml-5">
              <li>Si no hay nodo seleccionado, lo selecciona (borde negro).</li>
              <li>Si es el mismo nodo, se deselecciona.</li>
              <li>Si otro nodo ya está seleccionado, se enlazan y se deseleccionan.</li>
            </ul>
          </li>
          <li>🔗 <strong>Click en un enlace</strong> lo elimina.</li>
          <li>🧲 <strong>Arrastra nodos</strong> para moverlos libremente.</li>
        </ul>
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import type { GraphConfig } from '../modules/graph-widget/domain/GraphConfig';

import GraphWidget from '../modules/graph-widget/ui/GraphWidget.vue';

let sampleGraphConfig = reactive<GraphConfig>({
  title: 'Red de Nodos',
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
