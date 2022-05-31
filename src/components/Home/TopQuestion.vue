<template>
  <div class="container-fluid  bg-light py-5 mt-5">
    <h1 class="pb-5 text-center">أحدث الأسئله</h1>
    <div class="row">
      <div class="col-12 col-lg-2 p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/400×400/?car"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-2  p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/500×501/?car"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-2  p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/501×500/?car"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-2  p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/380×380/?cars"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-2 p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/300×301/?car"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-2  p-0">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/301×300/?car"
            class="card-img-top"
            alt="..."
            width="304"
            height="304"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  /* border: 0; */
  /* border-radius: 0; */
}
.card-body {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
  background: #2125292a;
  text-align: center;
}
.card-content {
  height: 0%;
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  transition: 1s;
  color: white !important;
}
.card:hover .card-content {
  height: 30%;
}
</style>
