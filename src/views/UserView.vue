<template>
  <div class="container pb-5">
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 bg my-2">
          <h4>عدد المقالات</h4>
          <h4></h4>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 bg my-2">
          <h4>عدد الأسئله</h4>
          <h4></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addDoc, getFirestore, orderBy } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const db = getFirestore();
const auth = useAuthStore();
const route = useRoute();

const userName = ref("");
const userPhoto = ref("");
const userType = ref("");

const comment = ref("");

const comments = reactive([]);

getPostData();

async function getPostData() {
  const q = query(
    collection(db, "users"),
    where("email", "==", route.params.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {

  });
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
