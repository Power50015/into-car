<template>
  <UserNavbar v-if="store.isLoding" />
  <RouterView v-if="store.isLoding" />
  <FooterSection v-if="store.isLoding" />
  <div class="loading" v-if="!store.isLoding">
    <img src="@/assets/loading.gif" width="500" />
  </div>
</template>
<script setup lang="ts">
// stores
import { useAuthStore } from "@/stores/auth";
import UserNavbar from "@/components/UserNavbar.vue";
import FooterSection from "@/components/FooterSection.vue";
const store = useAuthStore();
</script>
<style>
@import "@/assets/base.css";
</style>
