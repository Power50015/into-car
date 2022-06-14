<template>
  <div class="container">
    <h1 class="my-5">مراكز الصيانه</h1>
    <div class="row">
      <div
        class="col-12 col-lg-3 text-center my-4"
        v-for="item in maintenanceData"
        :key="item.email"
      >
        <router-link
          class="card w-100"
          :to="{ name: 'User', params: { email: item.email } }"
        >
          <img :src="item.img" class="card-img-top" :alt="item.name" />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">{{ item.name }}</h5>
              <span class="badge bg-primary m-2" v-if="item.winch">ونش</span>
              <span class="badge bg-secondary m-2" v-if="item.electricity">كهرباء</span>
              <span class="badge bg-success m-2" v-if="item.painting">دهان و سمكره</span>
              <span class="badge bg-danger m-2" v-if="item.mechanics">ميكانيكا</span>
              <span class="badge bg-warning text-dark m-2" v-if="item.singular">عقشه</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, where, query } from "firebase/firestore";
import { reactive, ref } from "@vue/reactivity";
import "mosha-vue-toastify/dist/style.css";
const db = getFirestore();
const maintenanceData = reactive([]);

getMaintenanceData();

async function getMaintenanceData() {
  maintenanceData.length = 0;
  const q = query(collection(db, "users"), where("type", "==", "maintenance"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    maintenanceData.push(doc.data());
  });
}
</script>

<style scoped>
.card-img-top {
  height: 250px;
}
</style>
