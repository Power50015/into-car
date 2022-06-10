<template>
  <div class="container pb-5">
    <div class="row">
      <div class="col-12 col-lg-3 order-last order-lg-first">
        <div class="text-box mt-5">
          <h4 class="pt-5">الكاتب</h4>
          <img :src="userPhoto" :alt="title" width="50" height="50" />
          <h5>{{ userName }}</h5>
          <h5 class="badge bg-primary">{{ userType }}</h5>
          <router-link class="nav-link active" aria-current="page" to="/"
            >الصفحه الشخصيه</router-link
          >
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <h1 class="pt-5">{{ title }}</h1>
        <img :src="image" :alt="title" class="w-100" />
        <p class="text-box text-start p-5 m-5">{{ des }}</p>
      </div>
      <div class="co-12" v-if="auth.isLogin">
        <form @submit.prevent="saveComment">
          <h6 class="text-start">تعليق</h6>
          <textarea class="w-100" v-model="comment"></textarea>
          <button type="submit" class="w-100 btn btn-primary">أضف تعليق</button>
        </form>
      </div>
      <div
        class="col-12 text-start my-3 text-box p-3"
        v-for="item in comments"
        :key="item.index"
      >
        <div class="row text-start">
          <router-link to="/" class="col-2">
            <img
              :src="item.commentUserPhoto"
              :alt="item.commentUserName"
              width="50"
            />
            <h6>{{ item.commentUserName }}</h6>
            <h5 class="badge bg-primary">{{ item.commentUserType }}</h5>
          </router-link>
          <div class="col-10">
            {{ item.comment }}
          </div>
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

const title = ref("");
const des = ref("");
const image = ref("");

const userName = ref("");
const userEmail = ref("");
const userPhoto = ref("");
const userType = ref("");

const comment = ref("");

const comments = reactive([]);

getPostData();

async function getPostData() {
  const q = query(
    collection(db, "post"),
    where("createdAt", "==", Number(route.params.id))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    title.value = doc.data().title;
    des.value = doc.data().des;
    image.value = doc.data().img;
    userEmail.value = doc.data().user;
    const q2 = query(
      collection(db, "users"),
      where("email", "==", userEmail.value)
    );
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      userName.value = doc.data().name;
      userPhoto.value = doc.data().img;
      if (doc.data().type == "maintenance") {
        userType.value = "مركز صيانه";
      } else {
        userType.value = "مستخدم عادى";
      }
    });

    const q3 = query(
      collection(db, "postComments"),
      where("post", "==", Number(route.params.id)),
      orderBy("createdAt", "desc")
    );

    const querySnapshot3 = await getDocs(q3);

    querySnapshot3.forEach(async (doc) => {
      const commentUserName = ref("");
      const commentUserEmail = doc.data().user;
      const commentUserPhoto = ref("");
      const commentUserType = ref("");
      const q4 = query(
        collection(db, "users"),
        where("email", "==", commentUserEmail)
      );
      const querySnapshot4 = await getDocs(q4);

      querySnapshot4.forEach((doc) => {
        commentUserName.value = doc.data().name;
        commentUserPhoto.value = doc.data().img;
        if (doc.data().type == "maintenance") {
          commentUserType.value = "مركز صيانه";
        } else {
          commentUserType.value = "مستخدم عادى";
        }
      });
      console.log(doc.data());

      comments.push({
        comment: doc.data().comment,
        commentUserName: commentUserName,
        commentUserEmail: commentUserEmail,
        commentUserPhoto: commentUserPhoto,
        commentUserType: commentUserType,
      });
    });
  });
}

async function saveComment() {
  const date = new Date();
  addDoc(collection(db, "postComments"), {
    comment: comment.value,
    user: auth.userEmail,
    post: Number(route.params.id),
    createdAt: date.getTime(),
  })
    .then(() => {
      comment.value = "";
      createToast("تم إضافه التعليق", {
        type: "success",
      });
    })
    .then(async () => {
      comments.length = 0;
      const q3 = query(
        collection(db, "postComments"),
        where("post", "==", Number(route.params.id)),
        orderBy("createdAt", "desc")
      );

      const querySnapshot3 = await getDocs(q3);

      querySnapshot3.forEach(async (doc) => {
        const commentUserName = ref("");
        const commentUserEmail = doc.data().user;
        const commentUserPhoto = ref("");
        const commentUserType = ref("");
        const q4 = query(
          collection(db, "users"),
          where("email", "==", commentUserEmail)
        );
        const querySnapshot4 = await getDocs(q4);

        querySnapshot4.forEach((doc) => {
          commentUserName.value = doc.data().name;
          commentUserPhoto.value = doc.data().img;
          if (doc.data().type == "maintenance") {
            commentUserType.value = "مركز صيانه";
          } else {
            commentUserType.value = "مستخدم عادى";
          }
        });
        console.log(doc.data());

        comments.push({
          comment: doc.data().comment,
          commentUserName: commentUserName,
          commentUserEmail: commentUserEmail,
          commentUserPhoto: commentUserPhoto,
          commentUserType: commentUserType,
        });
      });
    });
}
</script>

<style scoped>
.row {
  text-align: center;
}
.student-box {
  display: flex;
  align-items: center;
}
.text-box {
  background: rgba(238, 238, 238, 0.651);
}
.students {
  max-height: 542px;
  overflow-x: hidden;
  overflow-y: scroll;
}
li {
  list-style-type: none;
}
</style>
