<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav
        class="container mx-auto p-4"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <p>Edok.ru</p>
        <button @click="acc_exit">Выйти из аккаунта</button>
      </nav>
    </header>

    <div class="container mx-auto p-4">
      <slot />
    </div>

    <footer
      class="container mx-auto p-4 flex justify-between border-t-2 bg-white w-full"
    >
      <ul class="flex gap-4">
        <p>Edok.ru</p>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async acc_exit() {
      localStorage.setItem("access_token", "");
      await navigateTo({ path: "/" });
      location.reload();
    },
  },
};
</script>


  <style scoped>
.router-link-exact-active {
  color: rgb(255, 34, 101);
}
</style>