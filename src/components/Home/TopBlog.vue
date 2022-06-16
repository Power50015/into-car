<template>
  <div class="container">
    <h1 class="my-5">أحدث مقالات</h1>
    <div class="row">
      <div
        class="col-12 col-lg-4"
        v-for="item in postData"
        :key="item.createdAt"
      >
        <router-link
          class="card w-100"
          :to="{ name: 'Post', params: { id: item.createdAt } }"
        >
          <img
            :src="item.img"
            class="card-img-top"
            :alt="item.title"
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">{{ item.title }}</h5>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="text-center pt-5">
      <router-link to="/posts" class="btn btn-info text-white"
        >المزيد من المقالات</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { reactive, ref } from "@vue/reactivity";
import "mosha-vue-toastify/dist/style.css";
const db = getFirestore();
const postData = reactive([] as any[]);

getPostData();

async function getPostData() {
  postData.length = 0;
  const q = query(
    collection(db, "post"),
    orderBy("createdAt", "desc"),
    limit(6)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    postData.push(doc.data());
  });
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.card-body {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  background: #2125292a;
  text-align: center;
}
.card-content {
  height: 0%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  transition: 1s;
  color: white !important;
}
.card:hover .card-content {
  height: 30%;
}
</style>
