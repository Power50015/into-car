<template>
  <div class="login-body">
    <form @submit.prevent="loginUser">
      <h1 class="mb-5 text-white">تسجيل الدخول</h1>
      <div class="mb-3">
        <label for="inputEmail" class="form-label text-white"
          >البريد الإلكترونى</label
        >
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label text-white"
          >كلمه المرور</label
        >
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-info text-white w-100">
        تسجيل الدخول
      </button>
      <router-link to="/register">عمل حساب جديد</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const store = useAuthStore();
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

const email = ref("learnvue@ewe.com");
const password = ref("AhmedPassword");

function loginUser() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", email.value)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        store.isLogin = true;
        store.userName = doc.data().name;
        store.userEmail = doc.data().email;
        store.userImg = doc.data().img;
        store.userType = doc.data().type;
        if (doc.data().type == "maintenance") {
          store.userPhone = doc.data().phone;
          store.userAddress = doc.data().address;
        }
      });
      store.isLoding = true;
      createToast("تم تسجيل الدخول .", {
        transition: "bounce",
        type: "success",
      });
      router.push("/");
    })
    .catch((error) => {
      store.isLoding = true;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
        createToast("المستخدم غير موجود.", {
          transition: "bounce",
          type: "danger",
        });
      } else if (errorCode == "auth/wrong-password") {
        createToast("كلمه المرور خطاْ.", {
          transition: "bounce",
          type: "danger",
        });
      } else {
        createToast(error.code, {
          transition: "bounce",
          type: "danger",
        });
        createToast(error.message, {
          transition: "bounce",
          type: "danger",
        });
      }
    });
}
</script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  background: url("@/assets/images/slider1.jpg");
  background-size: cover;
  position: relative;
  /* filter: blur(8px);
  -webkit-filter: blur(8px); */
  /* background: #eee; */
}
.login-body::before {
  background-color: rgba(0, 0, 0, 0.57);
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 2;
}
form {
  min-width: 40%;
  z-index: 3;
  position: relative;
}
</style>
