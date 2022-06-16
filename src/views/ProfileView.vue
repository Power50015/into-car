<template>
  <div class="register-body">
    <form @submit.prevent="editUser" class="p-5">
      <h1 class="mb-5 text-white">الصفحه الشخصيه</h1>
      <div class="text-center">
        <img :src="store.userImg" :alt="store.userName" width="250" />
      </div>
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
      <!-- Start image-->
      <div class="mb-3">
        <label for="formFile" class="form-label text-white">صوره المقال</label>
        <template v-if="imgPreview">
          <img :src="imgPreview" class="img-fluid" />
          <p class="mb-0 text-white">file name: {{ imgData.value.name }}</p>
          <p class="mb-0 text-white">
            size: {{ Math.round(imgData.value.size / 1024) }}KB
          </p>
        </template>
        <div class="flex">
          <h6 class="mb-3 text-white">
            حاله الرفع :
            <span>{{ imgUpload }}</span>
          </h6>
        </div>
        <input
          class="form-control"
          type="file"
          id="formFile"
          accept="image/jpeg"
          @change="DetectFiles($event?.target)"
        />
      </div>
      <!-- End image-->
      <div class="mb-3" v-if="store.userType == 'maintenance'">
        <label for="inputPhone" class="form-label text-white">رقم الهاتف</label>
        <input
          type="text"
          class="form-control"
          id="inputPhone"
          v-model="form.phone"
        />
      </div>
      <div class="mb-3" v-if="store.userType == 'maintenance'">
        <label for="inputAddress" class="form-label text-white">العنوان</label>
        <input
          type="text"
          class="form-control"
          id="inputAddress"
          v-model="form.address"
        />
      </div>
      <button
        type="submit"
        class="btn btn-info text-white w-100"
        :disabled="!btn"
      >
        تعديل البيانات
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
// Vue
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
// stores
import { useAuthStore } from "@/stores/auth";
// Toaster
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
// Firebase
import app from "@/firebase";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

// Router
import { useRouter } from "vue-router";

const store = useAuthStore();
const db = getFirestore();
const storage = getStorage();
const router = useRouter();

const form = reactive({
  name: store.userName,
  address: store.userAddress,
  phone: store.userPhone,
});

const imgURL = ref<string>("");
const imgData = reactive([] as any["value"]);
const imgPreview = ref<any>("");
const btn = ref(true);
const imgUpload = ref(0);

async function editUser() {
  //   store.isLoding = false;

  if (imgPreview.value != "") {
    const storageRef = refire(storage, `${imgData.value.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgData.value);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        imgUpload.value = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (URL) => {
          imgURL.value = URL;
          btn.value = true;
          if (store.userType == "users") {
            await setDoc(doc(db, "users", store.userId), {
              name: store.userName,
              email: store.userEmail,
              img: imgURL.value,
              type: store.userType,
            }).then(() => {
              store.userName = form.name;
              store.userImg = imgURL.value;
              createToast("تم تعديل البيانات الشخصيه", {
                type: "success",
              });
            });
          } else {
            //maintenance
            await setDoc(doc(db, "users", store.userId), {
              name: store.userName,
              email: store.userEmail,
              img: imgURL.value,
              type: store.userType,
              address: store.userAddress,
              phone: store.userPhone,
            }).then(() => {
              store.userName = form.name;
              store.userImg = imgURL.value;
              store.userAddress = form.address;
              store.userPhone = form.phone;
              imgData.length = 0;
              imgPreview.value = "";
              imgUpload.value = 0;
              createToast("تم تعديل البيانات الشخصيه", {
                type: "success",
              });
            });
          }
        });
      }
    );
  } else {
    if (store.userType == "users") {
      await setDoc(doc(db, "users", store.userId), {
        name: store.userName,
        email: store.userEmail,
        img: store.userImg,
        type: store.userType,
      }).then(() => {
        store.userName = form.name;
        createToast("تم تعديل البيانات الشخصيه", {
          type: "success",
        });
      });
    } else {
      //maintenance
      await setDoc(doc(db, "users", store.userId), {
        name: form.name,
        email: store.userEmail,
        img: store.userImg,
        type: store.userType,
        address: form.address,
        phone: form.phone,
      }).then(() => {
        store.userName = form.name;
        store.userAddress = form.address;
        store.userPhone = form.phone;
        createToast("تم تعديل البيانات الشخصيه", {
          type: "success",
        });
      });
    }
  }

  store.isLoding = true;
}

function DetectFiles(input: any) {
  imgData.value = input.files[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target!.result;
    };
    reader.readAsDataURL(input[0]);
  }
}
</script>

<style scoped>
.register-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 90vh; */
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
  background: #eeeeee5e;
  margin: 15px 0;
  border-radius: 50px;
}
</style>
