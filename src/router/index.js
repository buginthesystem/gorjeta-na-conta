import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ListingView from '../views/ListingView.vue';
import SubmitView from '../views/SubmitView.vue';
import SuccessView from '../views/SuccessView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/listing', component: ListingView },
  { path: '/submit', component: SubmitView },
  { path: '/success', component: SuccessView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;