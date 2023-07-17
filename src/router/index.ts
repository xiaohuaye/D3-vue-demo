import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/homePage",
    name: "",
    meta: {
      descript: "",
      pass: true,
    },
  },
  {
    path: "/homePage",
    component: () => import("@/views/homePage.vue"),
    name: "homePage",
    meta: {
      descript: "主页",
      pass: true,
    },
  },
  {
    path: "/gettingStarted",
    component: () => import("@/views/gettingStarted.vue"),
    name: "gettingStarted",
    meta: {
      descript: "快速开始demo",
      pass: true,
    },
  },
  {
    path: "/force",
    component: () => import("@/views/force.vue"),
    name: "force",
    meta: {
      descript: "力学图demo",
      pass: true,
    },
  },
  {
    path: "/quadtree",
    component: () => import("@/views/quadtree.vue"),
    name: "quadtree",
    meta: {
      descript: "四叉树demo",
      pass: true,
    },
  },
];

const asyncRoutes: Array<RouteRecordRaw> = [];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export { router, asyncRoutes };
