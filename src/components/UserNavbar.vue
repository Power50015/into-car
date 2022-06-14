<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark"
    :class="route.name == 'Home' ? 'fixed-top' : ''"
    :style="{
      top: scrollPosition > 100 || route.name != 'Home' ? 0 : -100 + 'px',
    }"
  >
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          src="@/assets/images/logo.svg"
          alt="Into Car Logo"
          width="75"
          height="75"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/posts"
              >المقالات</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/questions"
              >الأسئله</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/maintenances"
              >مراكز الصيانه</router-link
            >
          </li>
          <li class="nav-item" v-if="!store.isLogin">
            <router-link class="nav-link active" aria-current="page" to="/login"
              >تسجيل الدخول</router-link
            >
          </li>
          <li class="nav-item dropdown" v-if="store.isLogin">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="store.userImg"
                alt="user image"
                width="35"
                height="35"
              />
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/profile"
                  >الصفحه الشخصيه</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/dashborad"
                  >لوحه التحكم</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/add-post"
                  >أضف مقال</router-link
                >
              </li>
              <li>
                <router-link
                  class="dropdown-item"
                  to="/add-question"
                  v-if="store.userType == 'users'"
                  >أضف سؤال</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <div class="dropdown-item" @click="logout">تسجيل الخروج</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
// stores
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
// Firebase
import app from "@/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
// Router
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const db = getFirestore();
const auth = getAuth();

const scrollPosition = ref();
window.addEventListener("scroll", updateScroll);

function updateScroll() {
  scrollPosition.value = window.scrollY;
}
function logout() {
  signOut(auth).then(() => {
    store.userName = "";
    store.userEmail = "";
    store.userImg = "";
    store.userType = "";
    store.isLogin = false;
    store.isLoding = true;
    router.push("/");
  });
}
</script>

<style>
nav {
  transition: all 1.5s;
}
.dropdown-menu[data-bs-popper] {
  left: 0;
  right: auto;
}
.dropdown-item {
  cursor: pointer;
}
</style>
