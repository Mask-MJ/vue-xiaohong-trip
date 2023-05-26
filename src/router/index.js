import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),

  //映射关系:path=>component
  routes: [

    {
      path: "/",
      redirect: "/home" //重定向
    },
    {
      path: "/home",
      component: () => import("@/views/home/home.vue")
    },
    {
      path: "/message",
      component: () => import("@/views/message/message.vue")
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue")
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/favor.vue")
    },
    {
      path: "/city",
      component: () => import("@/views/city/city.vue"),
      //配置city路由显示或隐藏tabbar 第一种方式:  hideTabBar: true -> 不显示tabbar, false -> 显示tabbar
      meta: {
        hideTabBar: true
      }
    }

  ]
})

export default router;