<template>
  <UserNavbar v-if="store.isLoding" />
  <RouterView v-if="store.isLoding" />
  <div class="loading" v-if="!store.isLoding">
    <img src="@/assets/loading.gif" width="500" />
  </div>
</template>
<script setup lang="ts">
// stores
import { useAuthStore } from "@/stores/auth";
import UserNavbar from "@/components/UserNavbar.vue";

const store = useAuthStore();
</script>
<style>
@import "@/assets/base.css";
.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
