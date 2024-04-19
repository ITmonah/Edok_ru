<template>
  <div>
    <header class="header flex items-center">
      <nav class="container mx-auto p-4 flex items-center justify-between">
        <NuxtLink to="/" class="logo">Edok<span>.ru</span></NuxtLink>
        <ul class="flex gap-10 links">
          <li><NuxtLink to="/">главная</NuxtLink></li>
          <li><NuxtLink to="/recipes" class="btn">рецепты</NuxtLink></li>
          <li><NuxtLink to="/about">добавить рецепт</NuxtLink></li>
        </ul>
        <NuxtLink to="/user" class="links flex gap-1"
          ><img src="assets/img/Chef-hat.svg" />вход</NuxtLink
        >
      </nav>
    </header>
    <div class="flex justify-center">
      <div class="main bg-white">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>