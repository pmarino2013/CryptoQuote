import { createRouter, createWebHistory } from "vue-router";

import HomeScreen from "../pages/HomeScreen.vue";
import AboutScreen from "../pages/AboutScreen.vue";
import ErrorScreen from "../pages/ErrorScreen.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "HomeScreen", component: HomeScreen },
    { path: "/about", name: "AboutScreen", component: AboutScreen },
    { path: "/:pathMatch(.*)*", name: "ErrorScreen", component: ErrorScreen },
  ],
});

export default router;
