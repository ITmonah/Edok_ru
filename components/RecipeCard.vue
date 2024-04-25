<template>
  <div class="card text-center">
    <img :src="recipe.image" alt="recipe" class="thumb" />
    <p class="font-bold text-gray-500 m-4 truncate">{{ recipe.title }}</p>
    <NuxtLink :to="`/recipes/${recipe.id}`"
      >{{ recipe.title }}
      <p class="btn my-4">Подробнее</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { recipe } = defineProps(["recipe"]);
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>