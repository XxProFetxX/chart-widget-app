<template>
  <main class="p-4 bg-gray-100 min-h-screen w-full">
    <CriptoChartWithRange />
    <NodeNetwork />
  </main>
</template>

<script setup lang="ts">
import CriptoChartWithRange from '../modules/crypto-dashboard/ui/CriptoChartWithRange.vue';
import NodeNetwork from '../modules/node-network/ui/NodeNetwork.vue';
</script>
