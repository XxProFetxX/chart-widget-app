import { createRouter, createWebHistory } from 'vue-router';
import CriptoChartWithRange from '../modules/crypto-dashboard/ui/CriptoChartWithRange.vue';
import NodeNetwork from '../modules/node-network/ui/NodeNetwork.vue';

const routes = [
  { path: '/', redirect: '/crypto' }, // ruta por defecto
  { path: '/crypto', component: CriptoChartWithRange, name: 'Crypto' },
  { path: '/node-network', component: NodeNetwork, name: 'NodeNetwork' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
