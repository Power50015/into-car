<template>
  <h3 class="pb-4">الخدمات</h3>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="winchflexSwitchCheckDefault"
          v-model="winch"
          @change="editService"
        />
        <label class="form-check-label" for="winchflexSwitchCheckDefault"
          >ونش</label
        >
      </div>
    </div>
    <div class="col">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="singularflexSwitchCheckDefault"
          v-model="singular"
          @change="editService"
        />
        <label class="form-check-label" for="singularflexSwitchCheckDefault"
          >عفشه</label
        >
      </div>
    </div>
    <div class="col">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="mechanicsflexSwitchCheckDefault"
          v-model="mechanics"
          @change="editService"
        />
        <label class="form-check-label" for="mechanicsflexSwitchCheckDefault"
          >ميكانيكا</label
        >
      </div>
    </div>
    <div class="col">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="electricityflexSwitchCheckDefault"
          v-model="electricity"
          @change="editService"
        />
        <label class="form-check-label" for="electricityflexSwitchCheckDefault"
          >كهرباء</label
        >
      </div>
    </div>
    <div class="col">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="paintingflexSwitchCheckDefault"
          v-model="painting"
          @change="editService"
        />
        <label class="form-check-label" for="paintingflexSwitchCheckDefault"
          >سمكرة ودهان</label
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Vue
import { reactive, ref } from "@vue/reactivity";
// stores
import { useAuthStore } from "@/stores/auth";
// Toaster
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const auth = useAuthStore();
const db = getFirestore();

const winch = ref(false);
const singular = ref(false);
const mechanics = ref(false);
const electricity = ref(false);
const painting = ref(false);
getData();

async function getData() {
  const q = query(
    collection(db, "users"),
    where("email", "==", auth.userEmail)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    winch.value = doc.data().winch;
    singular.value = doc.data().singular;
    mechanics.value = doc.data().mechanics;
    electricity.value = doc.data().electricity;
    painting.value = doc.data().painting;
  });
}

async function editService() {
  await setDoc(doc(db, "users", auth.userId), {
    name: auth.userName,
    email: auth.userEmail,
    img: auth.userImg,
    type: auth.userType,
    address: auth.userAddress,
    phone: auth.userPhone,
    winch: winch.value,
    singular: singular.value,
    mechanics: mechanics.value,
    electricity: electricity.value,
    painting: painting.value,
  }).then(() => {
    createToast("تم تعديل الخدمات ", {
      type: "success",
    });
  });
}
</script>

<style></style>
