<template>
  <div>
    <RecipeDetail :recipe="recipe" />
  </div>
</template>

<script setup>
import RecipeDetail from "~/components/RecipeDetail.vue";

const { id } = useRoute().params;
const url = useRuntimeConfig().public.apiBaseURL;
const uri = `${url}/recipe/` + id + "?lang_code=ru";

const { data: recipe } = await useFetch(uri);
</script>

<style scoped>
</style>