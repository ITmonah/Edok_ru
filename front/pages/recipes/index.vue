<template>
  <div class="recipes_div">
    <div class="recipes_div_head">
      <div class="recipes_title">
        <h1>Рецепты</h1>
        <img src="assets/img/Noodles.svg" alt="Иконка" />
      </div>
      <div class="text-field__icon">
        <input type="text" placeholder="Название рецепта" />
        <span class="text-field__aicon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M8.74999 15.8333C12.662 15.8333 15.8333 12.662 15.8333 8.74999C15.8333 4.83799 12.662 1.66666 8.74999 1.66666C4.83799 1.66666 1.66666 4.83799 1.66666 8.74999C1.66666 12.662 4.83799 15.8333 8.74999 15.8333Z"
              stroke="#333333"
              stroke-width="2.5"
              stroke-linejoin="round"
            />
            <path
              d="M13.8423 13.8424L17.3779 17.3779"
              stroke="#333333"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div class="spacer_rec"></div>
    <div class="recipes_div_foot">
      <div class="recipes_sort">
        <p>Сортировать:</p>
        <input
          type="radio"
          value=""
          name="recipe_radio"
          id="rad1_recipes"
          checked
        /><label for="rad1_recipes">по популярности</label>

        <input
          type="radio"
          value=""
          name="recipe_radio"
          id="rad2_recipes"
        /><label for="rad2_recipes">по дате добавления</label>

        <input
          type="radio"
          value=""
          name="recipe_radio"
          id="rad3_recipes"
        /><label for="rad3_recipes">по рейтингу</label>
      </div>
      <div>
        <select>
          <option>Все категории</option>
        </select>
      </div>
    </div>
    <div class="recipes_cards_div">
      <div v-for="p in recipes" :key="p.id">
        <RecipeCard :recipe="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: recipes } = await useFetch("http://127.0.0.1:8000/recipe");
</script>

<script>
export default {
  data() {
    return {
      color_btn: "rgba(0, 0, 0)",
    };
  },
  methods: {
    changeColorBtn: function () {
      if (this.color_btn == "#eb5160") {
        this.color = "white";
      } else {
        this.color = "#eb5160";
      }
    },
  },
};
</script>

<style scoped>
.recipes_div_foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.recipes_div_head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 23px;
}
.recipes_sort input {
  display: none !important;
}
.recipes_sort input[type="radio"]:checked + label {
  color: #eb5160;
  box-shadow: 44px;
}
.recipes_sort label {
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  transition: 0.1s;
}
.recipes_sort label:hover {
  color: rgb(0, 0, 0);
  cursor: pointer;
  transform: scale(1.1);
}
.recipes_sort label:active {
  color: #f86776;
}
.recipes_sort p {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.recipes_sort {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}
.spacer_rec {
  width: 100%;
  height: 2px;
  background: rgb(0, 0, 0);
}
.text-field__aicon {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0.875rem;
  width: 1rem;
  cursor: pointer;
  transition: color 0.15s ease-in-out;
}
.text-field__icon {
  position: relative;
  width: 331px;
  height: 33px;
}
.recipes_div input {
  display: block;
  box-sizing: border-box;
  border: 2px solid rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  width: 331px;
  height: 33px;
  padding-right: 2.5rem;
  padding-left: 0.4rem;
}
.recipes_div {
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  gap: 23px;
}
.recipes_cards_div {
  display: flex;
  flex-direction: column;
  gap: 35px;
}
.recipes_title {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.recipes_title h1 {
  color: rgb(0, 0, 0);
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
}
</style>