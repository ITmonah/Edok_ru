<template>
  <div class="main_div">
    <div class="enter">
      <h1>Edok<span>.ru</span></h1>
      <p>
        Погрузитесь в мир вкусных и ярких блюд на нашем кулинарном сайте! Будь
        то завтрак, обед, ужин, десерт или даже напиток - у нас есть рецепт на
        любой случай и вкус. Подробные пошаговые инструкции помогут даже
        начинающим кулинарам овладеть новыми навыками. Присоединяйтесь к нашему
        дружному сообществу поваров-любителей, делитесь своими рецептами и
        вдохновляйтесь кулинарными шедеврами.
      </p>
    </div>
    <div class="best_rec main_div">
      <h1>Лучшие блюда</h1>
      <RecipeCard :recipe="recipe[0]" />
      <RecipeCard :recipe="recipe[1]" />
      <RecipeCard :recipe="recipe[2]" />
    </div>
    <div class="best_chefs main_div">
      <h1>Лучшие повара</h1>
      <div class="best_chefs_div">
        <BestChefCard color_chef="rgb(244, 220, 0)" :user="user[0]" />
        <BestChefCard color_chef="rgb(172, 172, 171)" :user="user[1]" />
        <BestChefCard color_chef="rgb(206, 148, 0)" :user="user[2]" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: recipe } = await useFetch("http://127.0.0.1:8000/recipe/top/");
const { data: user } = await useFetch("http://127.0.0.1:8000/user/top");
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
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url(assets/img/best_chef.png);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.enter {
  width: 100%;
  height: 508px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
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
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  margin: 0;
}
@media screen and (max-width: 880px) {
  .best_chefs h1 {
    margin-left: 5%;
  }
  .best_rec {
    margin-left: 5%;
  }
  .enter {
    padding-left: 5%;
    padding-right: 5%;
    height: 471px;
  }
  .best_chefs_div {
    flex-direction: column;
  }
  .best_chefs_div {
    height: 1050px;
    background-size: cover;
    background-position: center center;
  }
}
@media screen and (max-width: 560px) {
  .enter h1 {
    font-size: 48px;
    font-weight: 700;
    line-height: 59px;
  }
  .enter p {
    font-size: 18px;
  }
  .enter {
    padding-top: 16px;
    gap: 16px;
  }
}
</style>