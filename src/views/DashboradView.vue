<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 bg my-2">
          <h4>عدد المقالات</h4>
          <h4>{{ post }}</h4>
        </div>
      </div>
      <div class="col-12 col-lg-4" v-if="store.userType == 'users'">
        <div class="text-center p-3 bg my-2">
          <h4>عدد الأسئله</h4>
          <h4>{{ post }}</h4>
        </div>
      </div>
      <div class="col-12 my-4">
        <service-section/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import ServiceSection from "@/components/ServiceSection.vue";

const store = useAuthStore();
const db = getFirestore();
const post = ref();
getPsotCount();
async function getPsotCount() {
  const q = query(collection(db, "post"), where("user", "==", store.userEmail));
  const querySnapshot = await getDocs(q);
  post.value = querySnapshot.docs.length;
  console.log(querySnapshot.docs.length);
}
</script>

<style scoped>
.bg {
  background-image: linear-gradient(
    to right,
    #4a6b81 30%,
    #92D3FF 100%
  );
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
}
</style>
