<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 my-2">
          <img :src="store.userImg" :alt="store.userName" class="w-100" />
          <h2>{{ store.userName }}</h2>
          <h5 v-if="store.userType == 'maintenance'">{{ store.userPhone }}</h5>
          <h6 v-if="store.userType == 'maintenance'">
            {{ store.userAddress }}
          </h6>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 bg my-2">
          <h4>عدد المقالات</h4>
          <h4>{{ post }}</h4>
        </div>

        <div
          class="text-center p-3 bg my-2"
          v-if="store.userType == 'maintenance'"
        >
          <h4>عدد الحجوزات</h4>
          <h4>{{ post }}</h4>
        </div>
      </div>
      <div class="col-12 col-lg-4" v-if="store.userType == 'users'">
        <div class="text-center p-3 bg my-2">
          <h4>عدد الأسئله</h4>
          <h4>{{ post }}</h4>
        </div>
      </div>
      <div class="col-12 my-4" v-if="store.userType == 'maintenance'">
        <service-section />
      </div>
    </div>
  </div>
  <div class="container pb-5" v-if="store.userType == 'maintenance'">
    <h1 class="my-5">الحجزات</h1>
    <div class="row">
      <div
        class="col-12 col-lg-4 bg text-center py-4"
        v-for="item in bookings"
        :key="item.createdAt"
      >
        <h3>{{ item.userName }}</h3>
        <h3>{{ item.userPhone }}</h3>
        <div>
          الخدمه المطلوبه
          <span class="badge bg-primary m-2" v-if="item.userService == 'winch'"
            >ونش</span
          >
          <span
            class="badge bg-secondary m-2"
            v-if="item.userService == 'electricity'"
            >كهرباء</span
          >
          <span
            class="badge bg-success m-2"
            v-if="item.userService == 'painting'"
            >دهان و سمكره</span
          >
          <span
            class="badge bg-danger m-2"
            v-if="item.userService == 'mechanics'"
            >ميكانيكا</span
          >
          <span
            class="badge bg-warning text-dark m-2"
            v-if="item.userService == 'singular'"
            >عقشه</span
          >
        </div>
        <button
          type="button"
          class="btn btn-dark mt-4"
          @click="editBooking(item.id)"
        >
          إتمام الحجز
        </button>
      </div>
    </div>
  </div>
  <div class="container pb-5">
    <h1 class="my-5">مقالات</h1>
    <div class="row">
      <div class="col-12 col-lg-4" v-for="item in posts" :key="item.createdAt">
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
  </div>
  <div class="container pb-5" v-if="store.userType == 'users'">
    <h1 class="my-5">الأسئله</h1>
    <div class="row">
      <div
        class="col-12 col-lg-4"
        v-for="item in questions"
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
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import app from "@/firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import ServiceSection from "@/components/ServiceSection.vue";

const store = useAuthStore();
const db = getFirestore();
const post = ref();
const question = ref();
const booking = ref();
const posts = reactive([]);
const questions = reactive([]);
const bookings = reactive([]);

getPsotCount();
async function getPsotCount() {
  const q = query(collection(db, "post"), where("user", "==", store.userEmail));
  const querySnapshot = await getDocs(q);
  post.value = querySnapshot.size;
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });

  if (store.userType == "users") {
    const q2 = query(
      collection(db, "question"),
      where("user", "==", store.userEmail)
    );
    const querySnapshot2 = await getDocs(q2);
    question.value = querySnapshot.size;
    querySnapshot2.forEach((doc) => {
      questions.push(doc.data());
    });
  }
  if (store.userType == "maintenance") {
    const q3 = query(
      collection(db, "booking"),
      where("maintenance", "==", store.userEmail),
      where("state", "==", 0)
    );
    const querySnapshot3 = await getDocs(q3);
    booking.value = querySnapshot3.size;
    querySnapshot3.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  }
}
async function editBooking(id) {
  await updateDoc(doc(db, "booking", id), {
    state: 1,
  }).then(async () => {
    createToast("تم أنهاء الحجز", {
      type: "success",
    });
    bookings.length = 0;
    const q3 = query(
      collection(db, "booking"),
      where("maintenance", "==", store.userEmail),
      where("state", "==", "0")
    );
    const querySnapshot3 = await getDocs(q3);
    booking.value = querySnapshot3.size;
    querySnapshot3.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  });
}
</script>

<style scoped>
.bg {
  background-image: linear-gradient(to right, #4a6b81 30%, #92d3ff 100%);
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
}
.btn{
  cursor: pointer !important;
}
</style>
