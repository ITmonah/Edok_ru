<template>
  <div>
    <header class="header flex items-center">
      <nav class="container mx-auto p-4 flex items-center justify-between">
        <NuxtLink to="/" class="logo">Edok<span>.ru</span></NuxtLink>
        <ul class="flex gap-10 links">
          <li><NuxtLink to="/">главная</NuxtLink></li>
          <li><NuxtLink to="/recipes" class="btn">рецепты</NuxtLink></li>
          <li><NuxtLink to="/add_recipe">добавить рецепт</NuxtLink></li>
        </ul>
        <!-- 
        <NuxtLink to="/user" class="links flex gap-1"
          ><img src="assets/img/Chef-hat.svg" />вход</NuxtLink
        >
        -->
        <button class="links flex gap-1" @click="showModal">
          <img src="assets/img/Chef-hat.svg" />вход
        </button>
        <modal
          v-show="isModalVisible"
          @close="closeModal"
          @click1="showModal1"
        />
        <modal1
          v-show="isModalVisible1"
          @close1="closeModal1"
          @close="closeModal"
        />
      </nav>
    </header>
    <transition name="fade">
      <div class="flex justify-center">
        <div class="main bg-white">
          <slot />
        </div>
      </div>
    </transition>
    <footer class="flex justify-center">
      <nav class="container flex justify-center gap-14">
        <NuxtLink to="/" class="logo_f">Edok<span>.ru</span></NuxtLink>
        <div class="footer_links">
          <NuxtLink to="">Главная</NuxtLink>
          <NuxtLink to="">Рецепты</NuxtLink>
          <NuxtLink to="">Добавить рецепт</NuxtLink>
        </div>
        <div class="footer_tel">
          <p>Контакты</p>
          <a href="tel:+7999999999">+7999999999</a>
        </div>
      </nav>
    </footer>
  </div>
</template>

<script>
import modal from "/components/LoginForm.vue";
import modal1 from "/components/RegForm.vue";

export default {
  name: "app",
  components: {
    modal,
    modal1,
  },
  data() {
    return {
      isModalVisible: false,
      isModalVisible1: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    showModal1() {
      this.isModalVisible1 = true;
    },
    closeModal1() {
      this.isModalVisible1 = false;
    },
  },
};
</script>

<style>
.footer_tel {
  display: flex;
  flex-direction: column;
  color: white;
  gap: 8px;
}
.footer_links {
  display: flex;
  flex-direction: column;
  color: white;
  gap: 8px;
}
footer {
  background: rgb(7, 16, 19);
  padding-bottom: 23px;
  padding-top: 23px;
}
.main {
  width: 906px;
}
.router-link-exact-active {
  color: rgb(255, 34, 101);
}
.header {
  background: rgb(7, 16, 19);
  height: 76px;
  color: white;
}
.links {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0%;
}
.logo {
  color: rgb(255, 255, 255);
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: 0%;
  text-align: center;
}
.logo span {
  color: rgb(235, 81, 96);
}
.logo_f {
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0%;
  text-align: center;
}
.logo_f span {
  color: rgb(235, 81, 96);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>