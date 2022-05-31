<template>
  <Slider />
  <Service/>
  <div class="container-fluid bg-light">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-9">
          <h1 class="pt-4 mb-4">كن شريك لنا.</h1>
          <p>
            إذا كنت مركز صيانه يمكنك عمل حساب و الإعلان عن خدماتك على موقعنا.
          </p>
          <router-link to="/login" class="btn btn-info text-white mt-5 mb-3"
            >تسجيل الدخول</router-link
          >
        </div>
        <div class="col-12 col-lg-3">
          <img src="@/assets/images/banner300.gif" alt="mm" class="w-100 mec-img" />
        </div>
      </div>
    </div>
  </div>
  <TopBlog/>
  <TopQuestion/>
</template>
<script lang="ts" setup>
import Slider from "@/components/Home/Slider.vue";
import Service from "@/components/Home/Service.vue";
import TopBlog from "@/components/Home/TopBlog.vue";
import TopQuestion from "@/components/Home/TopQuestion.vue";
</script>
<style scoped>
.mec-img {
  height: 100%;
  /* height: 800px; */
}
</style>
