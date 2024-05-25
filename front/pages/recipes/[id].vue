<template>
  <div>
    <RecipeDetail :recipe="recipe" />
  </div>
</template>

<script setup>
import RecipeDetail from "~/components/RecipeDetail.vue";

const { id } = useRoute().params;
const uri = "http://127.0.0.1:8000/recipe/" + id;

const { data: recipe } = await useFetch(uri);
</script>

<style scoped>
</style>