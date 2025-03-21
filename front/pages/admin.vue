<template>
  <div style="min-height: 820px">
    <div
      v-if="error != ''"
      class="container w-full h-full shadow-sm border-t-2 bg-white p-4 flex-col gap-5"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <h1 style="font-size: 50px">Упс.. {{ error }}</h1>
      <img src="assets/img/cat_err.jpg" alt="err" style="width: 40%" />
      <NuxtLink
        to="/"
        style="font-size: 30px; background: #eb5160; color: #fff; padding: 6px"
        >На главную</NuxtLink
      >
    </div>
    <div
      v-if="error == ''"
      class="container w-full shadow-sm border-t-2 bg-white p-4 flex-col"
      style="display: flex; flex-direction: column; gap: 10px"
    >
      <h1 style="font-size: 30px"><b>Меню модератора</b></h1>
      <div class="container w-full h-0.5 bg-slate-300"></div>
      <h1 style="font-size: 20px; color: #eb5160">Невыложенные рецепты:</h1>
      <div class="grid grid-cols-3 gap-3">
        <div v-for="p in recipes.items" :key="p.id">
          <RecipeCardAdmin :recipe="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "recipes",
});
</script>

<script>
export default {
  data() {
    return {
      token: "",
      recipes: {},
      error: "",
      url: useRuntimeConfig().public.apiBaseURL,
    };
  },
  methods: {
    get_recipes(token) {
      fetch(`${this.url}/recipe/page/false?page=1&size=50&lang_code=ru`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.recipes = json;
          } else {
            this.error = json.detail;
          }
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem("access_token");
    this.get_recipes(this.token);
  },
};
</script>


<style scoped>
</style>