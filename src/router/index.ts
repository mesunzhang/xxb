import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }, {
    path: "/",
    name: "home",
    component: () => import("@/views/Index.vue")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
