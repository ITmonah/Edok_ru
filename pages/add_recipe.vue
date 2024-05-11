<template>
  <div class="add_recipe_page">
    <div class="add_recipe_header">
      <h1>Добавить рецепт</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M3.75 26.25H26.25"
          stroke="#333333"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M3.75 22.5H26.25"
          stroke="#333333"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M5.625 15.625C5.625 10.4473 9.82231 6.25 15 6.25C20.1777 6.25 24.375 10.4473 24.375 15.625V22.5H5.625V15.625Z"
          stroke="#333333"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.625 15.625V18.125"
          stroke="#333333"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M17.5 6.25V5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5V6.25"
          stroke="#333333"
          stroke-width="2.5"
        />
      </svg>
    </div>
    <div class="spacer"></div>
    <div class="recipe_inputs">
      <div class="recipe_input">
        <label for="input_add_name">Название рецепта</label>
        <input type="text" placeholder="..." id="input_add_name" />
      </div>
      <div class="recipe_input">
        <label for="input_add_ingr">Ингредиенты</label>
        <div class="ingr_pols">
          <select id="input_add_ingr"></select>
          <div class="ingr_right">
            <label for="ingr_input">Количество</label>
            <input
              type="number"
              placeholder="..."
              style="width: 100px"
              id="ingr_input"
            />
          </div>
          <div class="ingr_right">
            <label>Система ед.</label>
            <select style="width: 100px"></select>
          </div>
        </div>
      </div>
      <div class="recipe_input">
        <label for="input_add_step">Шаги рецепта</label>
        <input type="text" placeholder="..." id="input_add_step" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
</script>
  
<style scoped>
.ingr_right {
  display: flex;
  flex-direction: column;
}
.ingr_pols {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 8px;
  position: relative;
}
.recipe_inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.recipe_input select {
  height: 41px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 3px;
}
.recipe_input {
  max-width: 556px;
  border-left: 3px solid;
  border-color: #eb5160;
  padding-left: 12px;
  padding-top: 7px;
  padding-bottom: 7px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.recipe_input input {
  width: 100%;
  height: 41px;
  font-size: 20px;
  box-sizing: border-box;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 3px;
  padding: 10px;
}
.recipe_input label {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  cursor: pointer;
}
.add_recipe_page {
  margin-top: 23px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  gap: 23px;
}
.add_recipe_header h1 {
  color: rgb(0, 0, 0);
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
}
.add_recipe_header {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
.spacer {
  width: 100%;
  height: 2px;
  background: rgb(0, 0, 0);
}
.ingr_right label {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  top: -23px;
}
</style>