<template>
  <div class="login-body">
    <form class="">
      <h1 class="mb-5">تسجيل مستخدم جديد</h1>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >أسم المستخدم</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label"
          >البريد الإلكترونى</label
        >
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label"
          >كلمه المرور</label
        >
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-info text-white w-100">تسجيل الدخول</button>
      <router-link to="/login">لدى حساب بالفعل</router-link>
    </form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 89vh;
  /* background: #eee; */
}
form{
  min-width: 40%;
}
</style>
