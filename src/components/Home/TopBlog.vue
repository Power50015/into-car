<template>
  <div class="container">
    <h1 class="my-5">أحدث مقالات</h1>
    <div class="row">
      <div class="col-12 col-lg-4">
        <router-link class="card w-100" to="/">
          <img
            src="https://source.unsplash.com/random/354×354/?car"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">توفير بنزين للسياره</h5>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card w-100">
          <img
           src="https://source.unsplash.com/random/353×354/?car"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أزاى ترجع العربيه الكهنه جديده</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/?cars"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <router-link class="card w-100" to="/">
          <img
            src="https://source.unsplash.com/random/300×300/?car"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">توفير بنزين للسياره</h5>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/300×300/?cars"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أزاى ترجع العربيه الكهنه جديده</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card w-100">
          <img
            src="https://source.unsplash.com/random/?car"
            class="card-img-top"
            alt="..."
            width="354"
            height="354"
          />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">أضحك الصوره تطلع حلوه</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center pt-5 ">
      <router-link to="/" class="btn btn-info text-white">المزيد من المقالات</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
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
