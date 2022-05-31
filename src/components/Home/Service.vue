<template>
  <div class="service container">
    <div class="row my-3">
      <div class="col-12 col-lg-4">
        <div class="text-center">
          <div class="d-inline-block box">
            <div
               class="bg-secondary d-inline-block p-3 border-redius rounded-circle"
            >
              <img src="@/assets/images/asking.png" width="65" />
            </div>
            <h3 class="pt-3">لو عندك سؤال</h3>
            <p>هنجوبك على سوالك</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="text-center">
          <div class="d-inline-block box">
            <div
               class="bg-secondary d-inline-block p-3 border-redius rounded-circle"
            >
              <img src="@/assets/images/vehicle.png" width="65" />
            </div>
            <h3 class="pt-3">أهتمامك بالسيارات</h3>
            <p class="">ديما هتلاقى كل الى هتحتاجه عندنا.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="text-center">
          <div class="d-inline-block box">
            <div
              class="bg-secondary d-inline-block p-3 border-redius rounded-circle"
            >
              <img src="@/assets/images/mechanic.png" width="65" />
            </div>
            <h3>مراكز صيانه</h3>
            <p>كل مراكز الصيانه بتتجمع عندنا.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.box{
    cursor: pointer;
    transition: 1.5s;
}
.box:hover {
  background-color: rgb(161, 161, 161);
  border-radius: 50px;
  padding: 30px 50px;
  color: white;
}
</style>
