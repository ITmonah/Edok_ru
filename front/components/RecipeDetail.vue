<template>
  <div class="recipe_detail_head">
    <h1>{{ recipe.title }}</h1>
    <div>
      <p>{{ recipe.price }}</p>
    </div>
  </div>
  <div class="p-7">
    <img :src="recipe.image" alt="recipe" />
    <h3 class="font-bold border-b-2 mb-4 pb-2">Информация</h3>
    <p class="mb-7">{{ recipe.description }}</p>
  </div>
</template>

<script setup>
const { recipe } = defineProps(["recipe"]);
</script>

<style scoped>
img {
  max-width: 400px;
}
</style>