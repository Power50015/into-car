<template>
  <div class="container-fluid bg-light pt-5 mt-5">
    <h1 class="pb-5 text-center">الأسئله</h1>
    <div class="row">
      <div
        class="col-12 col-lg-2 p-0"
        v-for="item in questionData"
        :key="item.createdAt"
      >
        <router-link
          class="card w-100"
          :to="{ name: 'Question', params: { id: item.createdAt } }"
        >
          <img
            :src="item.img"
            class="card-img-top"
            :alt="item.title"
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">{{ item.title }}</h5>
            </div>
          </div>
        </router-link>
      </div>
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
const questionData = reactive([]);

getQuestionData();

async function getQuestionData() {
  questionData.length = 0;
  const q = query(collection(db, "question"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    questionData.push(doc.data());
  });
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  /* border: 0; */
  /* border-radius: 0; */
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
