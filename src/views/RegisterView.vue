<template>
  <div class="register-body">
    <form @submit.prevent="addUser">
      <h1 class="mb-5 text-white">تسجيل مستخدم جديد</h1>
      <div class="mb-3">
        <label for="inputName" class="form-label text-white"
          >أسم المستخدم</label
        >
        <input
          type="text"
          class="form-control"
          id="inputName"
          v-model="form.name"
        />
      </div>
      <div class="mb-3">
        <label for="inputEmail" class="form-label text-white"
          >البريد الإلكترونى</label
        >
        <input
          type="email"
          class="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
          v-model="form.email"
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
          v-model="form.password"
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label text-white"
          >تأكيد كلمه المرور</label
        >
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="form.confirmPassword"
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label text-white"
          >نوع المستخدم</label
        >
        <select class="form-control" v-model="form.type">
          <option value="users">مستخدم</option>
          <option value="maintenance">مركز صيانه</option>
        </select>
      </div>
      <div class="mb-3" v-if="form.type == 'maintenance'">
        <label for="inputPhone" class="form-label text-white">رقم الهاتف</label>
        <input
          type="text"
          class="form-control"
          id="inputPhone"
          v-model="form.phone"
        />
      </div>
      <div class="mb-3" v-if="form.type == 'maintenance'">
        <label for="inputAddress" class="form-label text-white">العنوان</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          v-model="form.address"
        />
      </div>
      <button type="submit" class="btn btn-info text-white w-100">
        عمل حساب جديد
      </button>
      <router-link to="/login">لدى حساب بالفعل</router-link>
    </form>
  </div>
</template>

<script setup lang="ts">
// Vue
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
// stores
import { useAuthStore } from "@/stores/auth";
// vuelidate
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
// Toaster
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
// Firebase
import app from "@/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Router
import { useRouter } from "vue-router";

const store = useAuthStore();
const db = getFirestore();
const auth = getAuth();
const router = useRouter();

const form = reactive({
  name: "Ahmed",
  email: "learnvue@ewe.com",
  password: "AhmedPassword",
  confirmPassword: "AhmedPassword",
  type: "users",
  address: "0111",
  phone: "0222",
});

function validate() {
  const rules = computed(() => {
    if (form.type == "users")
      return {
        name: {
          required: helpers.withMessage("يجب إدخال الإسم", required),
          minLength: helpers.withMessage(
            "يجب أن لا يقل الإسم عن 3 حروف",
            minLength(3)
          ),
        },
        email: {
          required: helpers.withMessage(
            "يجب إدخال البريد الإلكترونى",
            required
          ),
          email: helpers.withMessage("يجب أن يكون البريد صحيح", required),
          minLength: helpers.withMessage(
            "يجب أن لا يقل البريد الإلكترونى عن 3 حروف",
            minLength(3)
          ),
        },
        password: {
          required: helpers.withMessage("يجب إدخال كلمه المرور ", required),
        },
        confirmPassword: {
          required: helpers.withMessage(
            "يجب إعاده إدخال كلمه المرور",
            required
          ),
          sameAs: helpers.withMessage(
            "يجب أن تكون كلمه المرور متطابقه",
            sameAs(form.password)
          ),
        },
      };
    else
      return {
        name: {
          required: helpers.withMessage("يجب إدخال الإسم", required),
          minLength: helpers.withMessage(
            "يجب أن لا يقل الإسم عن 3 حروف",
            minLength(3)
          ),
        },
        email: {
          required: helpers.withMessage(
            "يجب إدخال البريد الإلكترونى",
            required
          ),
          email: helpers.withMessage("يجب أن يكون البريد صحيح", required),
          minLength: helpers.withMessage(
            "يجب أن لا يقل البريد الإلكترونى عن 3 حروف",
            minLength(3)
          ),
        },
        password: {
          required: helpers.withMessage("يجب إدخال كلمه المرور ", required),
        },
        confirmPassword: {
          required: helpers.withMessage(
            "يجب إعاده إدخال كلمه المرور",
            required
          ),
          sameAs: helpers.withMessage(
            "يجب أن تكون كلمه المرور متطابقه",
            sameAs(form.password)
          ),
        },
        phone: {
          required: helpers.withMessage("يجب إدخال رقم التلفون ", required),
        },
        address: {
          required: helpers.withMessage("يجب إدخال رقم العنوان ", required),
        },
      };
  });

  const v$ = useVuelidate(rules, form);
  v$.value.$validate();
  if (v$.value.$error) {
    v$.value.$errors.forEach((element) => {
      createToast(element.$message, {
        transition: "bounce",
        type: "danger",
      });
    });
  }

  return v$.value.$error;
}

function addUser() {
  if (!validate()) {
    store.isLoding = false;
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (form.type == "users") {
          addDoc(collection(db, "users"), {
            name: form.name,
            email: form.email,
            img: "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg",
            type: form.type,
          }).then(() => {
            store.userName = form.name;
            store.userEmail = form.email;
            store.userImg =
              "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg";
            store.userType = form.type;
            store.isLogin = true;
            store.isLoding = true;
            createToast("تم تسجيل المستخدم الجديد", {
              transition: "bounce",
              type: "success",
            });
          });
        } else {
          addDoc(collection(db, "users"), {
            name: form.name,
            email: form.email,
            img: "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg",
            type: form.type,
            phone: form.phone,
            address: form.address,
          })
            .then(() => {
              store.userName = form.name;
              store.userEmail = form.email;
              store.userImg =
                "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg";
              store.userType = form.type;
              store.isLogin = true;
              store.isLoding = true;
              createToast("تم تسجيل مركز صيانه جديد الجديد", {
                transition: "bounce",
                type: "success",
              });
            })
            .then(() => {
              form.name = "";
              form.email = "";
              form.password = "";
              form.confirmPassword = "";
              form.type = "users";
              form.phone = "";
              form.address = "";
              router.push("/");
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          createToast("البريد الإلكترونى مستعمل بالفعل .", {
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
}
</script>

<style scoped>
.register-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  position: relative;
  background: url("@/assets/images/slider1.jpg");
  background-size: cover;
  /* filter: blur(8px);
  -webkit-filter: blur(8px); */
  /* background: #eee; */
}
.register-body::before {
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
