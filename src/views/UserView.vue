<template>
  <div class="container mb-5">
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="text-center p-3 my-2">
          <img :src="userPhoto" :alt="userName" class="w-100" />
          <h2>{{ userName }}</h2>
          <h5 v-if="userType == 'maintenance'">{{ userPhone }}</h5>
          <h6 v-if="userType == 'maintenance'">{{ userAddress }}</h6>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="text-center p-3 bg my-2">
          <h4>عدد المقالات</h4>
          <h4>{{ post }}</h4>
        </div>
        <div class="text-center p-3 bg my-2" v-if="userType == 'users'">
          <h4>عدد الأسئله</h4>
          <h4>{{ question }}</h4>
        </div>
        <div v-if="userType == 'maintenance'">
          <div class="text-center p-3 bg my-2">
            <span class="badge bg-primary m-2" v-if="winch">ونش</span>
            <span class="badge bg-secondary m-2" v-if="electricity"
              >كهرباء</span
            >
            <span class="badge bg-success m-2" v-if="painting"
              >دهان و سمكره</span
            >
            <span class="badge bg-danger m-2" v-if="mechanics">ميكانيكا</span>
            <span class="badge bg-warning text-dark m-2" v-if="singular"
              >عقشه</span
            >
          </div>
        </div>
        <div class="text-center p-3 my-2" v-if="userType == 'maintenance'">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary w-100"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            طلب حجز
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <form @submit.prevent="saveBooking" class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">حجز خدمه</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="الأسم"
                      v-model="myName"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="رقم الهاتف"
                      v-model="myPhone"
                      required
                    />
                  </div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="myService"
                    required
                  >
                    <option value="winch" v-if="winch">ونش</option>
                    <option value="electricity" v-if="electricity">
                      كهرباء
                    </option>
                    <option value="painting" v-if="painting">
                      دهان و سمكره
                    </option>
                    <option value="mechanics" v-if="mechanics">ميكانيكا</option>
                    <option value="singular" v-if="singular">عقشه</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
  <div class="container pb-5" v-if="userType == 'users'">
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
const userPhone = ref("");
const userAddress = ref("");

const electricity = ref();
const mechanics = ref();
const painting = ref();
const singular = ref();
const winch = ref();

const myName = ref("");
const myPhone = ref("");
const myService = ref("");
const post = ref();
const question = ref();

const posts = reactive([] as any[]);
const questions = reactive([] as any[]);

getPostData();

async function getPostData() {
  const q = query(
    collection(db, "users"),
    where("email", "==", route.params.email)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    userName.value = doc.data().name;
    userPhoto.value = doc.data().img;
    userType.value = doc.data().type;
    if (userType.value == "maintenance") {
      userPhone.value = doc.data().phone;
      userAddress.value = doc.data().address;
      electricity.value = doc.data().electricity;
      mechanics.value = doc.data().mechanics;
      painting.value = doc.data().painting;
      singular.value = doc.data().singular;
      winch.value = doc.data().winch;
    }
    const q2 = query(
      collection(db, "post"),
      where("user", "==", route.params.email)
    );
    const querySnapshot2 = await getDocs(q2);
    post.value = querySnapshot2.size;
    querySnapshot2.forEach((doc) => {
      posts.push(doc.data());
    });

    if (userType.value == "users") {
      const q3 = query(
        collection(db, "question"),
        where("user", "==", route.params.email)
      );
      const querySnapshot3 = await getDocs(q3);
      question.value = querySnapshot3.size;
      querySnapshot3.forEach((doc) => {
        questions.push(doc.data());
      });
    }
  });
}

async function saveBooking() {
  const date = new Date();
  addDoc(collection(db, "booking"), {
    maintenance: route.params.email,
    state: 0,
    userName: myName.value,
    userPhone: myPhone.value,
    userService: myService.value,
    createdAt: date.getTime(),
  }).then(() => {
    myName.value = "";
    myPhone.value = "";
    myService.value = "";
    createToast("تم إضافه الحجز", {
      type: "success",
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
</style>
