<template>
  <div>
    <RecipeDetail :recipe="recipe" />
  </div>
</template>

<script setup>
import RecipeDetail from "~/components/RecipeDetail.vue";

const { id } = useRoute().params;
const uri = "https://fakestoreapi.com/products/" + id;

const { data: recipe } = await useFetch(uri);

definePageMeta({
  layout: "recipes",
});
</script>

<style scoped>
</style>