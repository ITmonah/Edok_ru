<template>
  <div
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
    };
  },
  methods: {
    get_recipes() {
      fetch(`http://127.0.0.1:8000/recipe/page/false?page=1&size=50`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.recipes = json;
          } else {
            this.error = true;
          }
        });
    },
  },
  mounted() {
    this.get_recipes();
  },
};
</script>


<style scoped>
</style>