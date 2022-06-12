<template>
  <footer class="bg-dark">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="logo">
            <img src="@/assets/images/logo.png" alt="" width="50" />
          </div>
        </div>
        <div class="col links">
          <ul>
            <li>
              <a href="#"
                ><img
                  src="@/assets/images/facebook.png"
                  alt="facebook"
                  width="25"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  src="@/assets/images/instagram.png"
                  alt="facebook"
                  width="25"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  src="@/assets/images/whatsapp.png"
                  alt="facebook"
                  width="25"
              /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-dark {
  height: 100px;
  display: flex;
  align-items: center;
  color: white;
}
.links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
</style>
