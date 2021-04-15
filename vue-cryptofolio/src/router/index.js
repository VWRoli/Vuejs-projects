import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Portfolio from "../views/Portfolio.vue";
import AddAsset from "../views/AddAsset.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/addasset",
    name: "AddAsset",
    component: AddAsset,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
