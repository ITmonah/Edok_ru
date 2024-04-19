<template>
  <div>
    <p>Рецепт номер {{ id }}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia alias facere
      libero vel atque molestiae quae, fugiat placeat quisquam deserunt! Aliquid
      numquam sapiente dolor ducimus recusandae iusto iure repellendus dolorem!
    </p>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

definePageMeta({
  layout: "recipes",
});
</script>

<style scoped>
</style>