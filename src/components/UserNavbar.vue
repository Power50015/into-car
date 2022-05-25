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
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";

const route = useRoute();

const scrollPosition = ref();
window.addEventListener("scroll", updateScroll);

function updateScroll() {
  scrollPosition.value = window.scrollY;
}
</script>

<style>
nav {
  transition: all 1.5s;
}
</style>
