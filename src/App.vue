<template>
  <UserNavbar />
  <RouterView />
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import UserNavbar from "@/components/UserNavbar.vue";
</script>
<style>
@import "@/assets/base.css";
</style>
