<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="recipe.image" alt="recipe" class="mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ recipe.title }}</h2>
        <p class="text-xl my-7">{{ recipe.price }}</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Информация</h3>
        <p class="mb-7">{{ recipe.description }}</p>
      </div>
    </div>
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