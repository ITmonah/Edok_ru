<template>
  <div>
    <h1>Вот все рецепты</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="p in recipes" :key="p.id">
        <RecipeCard :recipe="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: recipes } = await useFetch("https://fakestoreapi.com/products");
</script>

<style lang="scss" scoped>
</style>