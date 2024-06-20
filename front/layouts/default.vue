<template>
  <div>
    <header
      class="header flex items-center content-center"
      style="justify-content: center"
    >
      <nav class="navig">
        <NuxtLink to="/" class="logo">Edok<span>.ru</span></NuxtLink>
        <ul
          class="flex gap-10 links"
          style="max-width: 952px; width: 100%; margin-left: 73px"
        >
          <li><NuxtLink to="/">главная</NuxtLink></li>
          <li>
            <NuxtLink to="/recipes" class="btn">рецепты</NuxtLink>
          </li>
          <li v-if="!authShow">
            <button class="links flex gap-1" @click="showModal">
              добавить рецепт
            </button>
          </li>
          <li v-if="authShow">
            <NuxtLink :to="add_link">добавить рецепт</NuxtLink>
          </li>
        </ul>

        <NuxtLink to="/user" class="links flex gap-1" v-if="authShow"
          ><img src="assets/img/me_avatar.svg" />{{ user.username }}</NuxtLink
        >

        <button v-if="!authShow" class="links flex gap-1" @click="showModal">
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
        <div class="hamburger-menu">
          <input id="menu__toggle" type="checkbox" v-model="togl" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul class="menu__box">
            <li @click="closeMenu()">
              <NuxtLink to="/user" class="flex gap-1" v-if="authShow"
                ><img src="assets/img/me_avatar.svg" />{{
                  user.username
                }}</NuxtLink
              >
            </li>
            <li @click="closeMenu()">
              <button v-if="!authShow" class="flex gap-1" @click="showModal">
                <img src="assets/img/Chef-hat.svg" />вход
              </button>
            </li>
            <li @click="closeMenu()"><NuxtLink to="/">главная</NuxtLink></li>
            <li @click="closeMenu()">
              <NuxtLink to="/recipes" class="btn">рецепты</NuxtLink>
            </li>
            <li v-if="!authShow" @click="closeMenu()">
              <button class="flex gap-1" @click="showModal">
                добавить рецепт
              </button>
            </li>
            <li v-if="authShow" @click="closeMenu()">
              <NuxtLink :to="add_link">добавить рецепт</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <transition name="fade">
      <div class="flex justify-center">
        <div class="main bg-white card">
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

<script setup>
useSeoMeta({
  title: "Edok.ru",
  ogTitle: "Edok.ru",
  description:
    "Погрузитесь в мир вкусных и ярких блюд на нашем кулинарном сайте! Будь то завтрак, обед, ужин, десерт или даже напиток - у нас есть рецепт на любой случай и вкус. Подробные пошаговые инструкции помогут даже начинающим кулинарам овладеть новыми навыками. Присоединяйтесь к нашему дружному сообществу поваров-любителей, делитесь своими рецептами и вдохновляйтесь кулинарными шедеврами!",
  ogDescription:
    "Погрузитесь в мир вкусных и ярких блюд на нашем кулинарном сайте! Будь то завтрак, обед, ужин, десерт или даже напиток - у нас есть рецепт на любой случай и вкус. Подробные пошаговые инструкции помогут даже начинающим кулинарам овладеть новыми навыками. Присоединяйтесь к нашему дружному сообществу поваров-любителей, делитесь своими рецептами и вдохновляйтесь кулинарными шедеврами!",
});
</script>

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
      authShow: false,
      user: {},
      add_link: "/add_recipe",
      togl: false,
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
    closeMenu() {
      this.togl = false;
    },
    get_auth(token) {
      fetch("http://127.0.0.1:8000/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.user = json;
            this.authShow = true;
          } else {
            this.error = true;
          }
        });
    },
  },
  beforeMount() {
    let token = localStorage.getItem("access_token");
    this.get_auth(token);
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
.navig {
  max-width: 1376px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  justify-content: start;
  margin-left: 4%;
  margin-right: 4%;
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
.hamburger-menu {
  display: none;
}
#menu__toggle {
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
}
.menu__btn {
  position: fixed;
  top: 35px;
  right: 40px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 100;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #e7e7e7;
  transition-duration: 0.25s;
}
.menu__btn > span::before {
  content: "";
  top: -8px;
}
.menu__btn > span::after {
  content: "";
  top: 8px;
}
.menu__box {
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 80px 0;
  list-style: none;
  background-color: #222222;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  transition-duration: 0.25s;
  z-index: 100;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.9);
}
.menu__box li {
  padding-left: 5%;
  font-size: 30px;
}
.menu__item {
  display: block;
  padding: 12px 24px;
  color: #333;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
.menu__item:hover {
  background-color: #cfd8dc;
}

@media screen and (max-width: 950px) {
  .links {
    display: none;
  }
  .hamburger-menu {
    display: block;
  }
}
</style>