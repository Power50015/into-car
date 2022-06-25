<template>
  <div class="container my-5">
    <div class="row">
      <h1 class="text-center">أضف سؤال</h1>
      <form @submit.prevent="savePost">
        <!-- Start image-->
        <div class="mb-3">
          <label for="formFile" class="form-label">صوره السؤال</label>
          <template v-if="imgPreview">
            <img :src="imgPreview" class="img-fluid" />
            <p class="mb-0">file name: {{ imgData.value.name }}</p>
            <p class="mb-0">
              size: {{ Math.round(imgData.value.size / 1024) }}KB
            </p>
          </template>
          <div class="flex">
            <h6 class="mb-3">
              حاله الرفع :
              <span v-if="imgUpload == 100">100%</span>
            </h6>
          </div>
          <input
            class="form-control"
            type="file"
            id="formFile"
            accept="image/jpeg"
            @change="DetectFiles($event.target)"
          />
        </div>
        <!-- End image-->
        <div class="mb-3">
          <label for="inputTitle" class="form-label">السوال</label>
          <input
            type="text"
            class="form-control"
            id="inputTitle"
            v-model="title"
          />
        </div>
        <div class="mb-3">
          <textarea class="w-100" v-model="des"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!btn">
          حفظ السوال
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import app from "@/firebase";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const db = getFirestore();
const storage = getStorage();
const router = useRouter();
const auth = useAuthStore();

const title = ref<string>("");
const des = ref<string>("");
const imgURL = ref<string>("");
const imgData = reactive([] as any["value"]);
const imgPreview = ref<any>("");
const btn = ref(true);
const imgUpload = ref(0);

function savePost() {
  btn.value = false;
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
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        btn.value = true;
        imgURL.value = URL;
        const date = new Date();

        addDoc(collection(db, "question"), {
          title: title.value,
          des: des.value,
          img: imgURL.value,
          user: auth.userEmail,
          createdAt: date.getTime(),
        }).then(() => {
          title.value = "";
          des.value = "";
          imgURL.value = "";
          imgUpload.value = 0;
          imgPreview.value = "";
          imgData.length = 0;
          createToast("تم إضافه المقال", {
            type: "success",
          });
        });
      });
    }
  );
}

function DetectFiles(input: any) {
  imgData.value = input.files[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = (e) => {
      imgPreview.value = e.target!.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
</script>
<style scoped>
textarea {
  min-height: 550px;
}
.img-fluid {
  max-width: 350;
}
</style>
