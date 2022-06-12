import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/posts",
      name: "AllPosts",
      component: () => import("../views/AllPostsView.vue"),
    },
    {
      path: "/questions",
      name: "AllQuestionView",
      component: () => import("../views/AllQuestionView.vue"),
    },
    {
      path: "/add-post",
      name: "AddPost",
      component: () => import("../views/AddPostView.vue"),
    },
    {
      path: "/add-question",
      name: "AddQuestion",
      component: () => import("../views/AddQuestionView.vue"),
    },
    {
      path: "/question/:id",
      name: "Question",
      component: () => import("../views/QuestionView.vue"),
    },
    {
      path: "/post/:id",
      name: "Post",
      component: () => import("../views/PostView.vue"),
    },
    {
      path: "/dashborad",
      name: "Dashborad",
      component: () => import("../views/DashboradView.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
    },
  ],
});

export default router;
