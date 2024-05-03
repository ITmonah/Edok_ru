<template>
  <div class="main_div">
    <div class="enter">
      <h1>Edok<span>.ru</span></h1>
      <p>
        Ищите рецепты, выбирая категорию блюда, его подкатегорию, кухню или
        меню. А в дополнительных фильтрах можно искать по нужному (или
        ненужному) ингредиенту: просто начните писать его название и сайт
        подберет соответствующий.
      </p>
    </div>
    <div class="best_rec main_div">
      <h1>Лучшие блюда</h1>
      <RecipeCard :recipe="recipe[13]" />
      <RecipeCard :recipe="recipe[2]" />
      <RecipeCard :recipe="recipe[3]" />
    </div>
    <div class="best_chefs main_div">
      <h1>Лучшие повара</h1>
      <div class="best_chefs_div"></div>
    </div>
  </div>
</template>

<script setup>
const { data: recipe } = await useFetch("https://fakestoreapi.com/products");
</script>

<style>
.best_chefs h1 {
  margin-left: 42px;
}
.best_rec {
  margin-left: 42px;
}
.main_div {
  display: flex;
  flex-direction: column;
  gap: 35px;
}
.main_div h1 {
  color: rgb(0, 0, 0);
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0%;
  text-align: left;
}
.best_chefs_div {
  width: 100%;
  height: 416px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(assets/img/best_chef.png);
}
.enter {
  width: 100%;
  height: 508px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(assets/img/ent.png);
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.enter h1 {
  color: rgb(255, 255, 255);
  font-size: 96px;
  font-weight: 700;
  line-height: 117px;
  letter-spacing: 0%;
  margin: 0;
}
.enter span {
  color: rgb(235, 81, 96);
}
.enter p {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0%;
  text-align: left;
  margin: 0;
}
</style>