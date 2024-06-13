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
      <div class="recipe_input steps_recipe" v-auto-animate>
        <label for="input_add_ingr">Ингредиенты</label>
        <div v-for="n in ingr_count" :key="n">
          <div class="ingr_pols">
            <select id="input_add_ingr">
              <option
                v-for="item in ingredients"
                :key="item.id"
                :value="item.name"
              >
                {{ item.name }}
              </option>
            </select>
            <div class="ingr_right">
              <label v-if="n == 1" for="ingr_input">Количество</label>
              <input
                type="number"
                placeholder="..."
                style="width: 100px"
                id="ingr_input"
              />
            </div>
            <div class="ingr_right">
              <label v-if="n == 1">Система ед.</label>
              <select style="width: 100px">
                <option
                  v-for="item in system_of_calculation"
                  :key="item.id"
                  :value="item.name"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <div style="display: flex">
            <button
              v-if="n < 15 && ingr_count == n"
              @click="countIngr"
              style="margin-top: 7px; margin-right: 7px"
            >
              +
            </button>
            <button
              v-if="ingr_count == n && ingr_count != 1"
              @click="deleteIngr"
              style="margin-top: 7px"
            >
              -
            </button>
            <button
              id="clearBtn"
              v-if="ingr_count == n && ingr_count != 1"
              @click="clearIngr"
              style="margin-top: 7px"
            >
              очистить всё
            </button>
          </div>
        </div>
      </div>
      <div class="recipe_input steps_recipe" v-auto-animate>
        <label for="input_add_step">Шаги рецепта</label>
        <div v-for="n in steps_count" :key="n">
          <div
            v-if="steps_count.length >= n"
            style="display: flex; flex-direction: column; gap: 6px"
          >
            <div class="recipe_delete_step">
              <h2>{{ n }} шаг</h2>
              <button
                v-if="steps_count.length == n && steps_count.length != 1"
                @click="deleteStep(n)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                >
                  <path
                    d="M1 1L10 10"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 1L1 10"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <input type="text" placeholder="..." id="input_add_step" required />
            <button
              v-if="n < 10 && steps_count.length == n"
              @click="countStep(n)"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div class="recipe_input">
        <label for="input_add_time">Время готовки</label>
        <input
          type="time"
          placeholder="..."
          id="input_add_time"
          style="width: 144px; font-size: 27px"
        />
      </div>
      <h1 class="add_h">Категория блюда</h1>
      <div class="recipe_add_category">
        <div class="recipe_input">
          <div class="recipe_input_items">
            <input
              type="checkbox"
              name="time_category"
              id="time_category_breakfast"
            />
            <label for="time_category_breakfast">завтрак</label>
          </div>
          <div class="recipe_input_items">
            <input
              type="checkbox"
              name="time_category"
              id="time_category_lunch"
            />
            <label for="time_category_lunch">обед</label>
          </div>
          <div class="recipe_input_items">
            <input
              type="checkbox"
              name="time_category"
              id="time_category_diner"
            />
            <label for="time_category_diner">ужин</label>
          </div>
        </div>
        <div class="recipe_input">
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_1" />
            <label for="time_category_1">десерт</label>
          </div>
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_2" />
            <label for="time_category_2">мясо</label>
          </div>
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_3" />
            <label for="time_category_3">суп</label>
          </div>
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_4" />
            <label for="time_category_4">рыба</label>
          </div>
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_5" />
            <label for="time_category_5">напиток</label>
          </div>
          <div class="recipe_input_items">
            <input type="radio" name="time_category" id="time_category_6" />
            <label for="time_category_6">основное</label>
          </div>
        </div>
      </div>
      <div class="recipe_input">
        <label>Лицевая картинка рецепта</label>
        <button>выбрать файл</button>
      </div>
      <div class="recipe_input">
        <label>Дополнительные картинки блюда</label>
        <button>выбрать файл</button>
      </div>
      <button class="add_recipe_btn">Добавить рецепт</button>
    </div>
  </div>
</template>
  
<script setup>
const { data: ingredients } = await useFetch(
  "http://127.0.0.1:8000/ingredient/"
);
const { data: system_of_calculation } = await useFetch(
  "http://127.0.0.1:8000/system_of_calculation/"
);
</script>

<script>
export default {
  data() {
    return {
      steps_count: [1],
      ingr_count: 1,
    };
  },
  methods: {
    countStep: function (n) {
      this.steps_count.push(n + 1);
    },
    deleteStep: function (n) {
      if (this.steps_count.length > 1) {
        this.steps_count.pop();
      }
    },
    countIngr: function () {
      this.ingr_count = this.ingr_count + 1;
    },
    deleteIngr: function () {
      if (this.ingr_count > 1) {
        this.ingr_count = this.ingr_count - 1;
      }
    },
    clearIngr: function () {
      if (this.ingr_count > 1) {
        this.ingr_count = 1;
      }
    },
  },
};
</script>
  
<style scoped>
.add_recipe_btn {
  border-radius: 3px;
  background: rgb(235, 81, 96);
  width: 310px;
  height: 47px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin-top: 10px;
}
.recipe_input button {
  width: 223px;
  height: 35px;
  margin-top: 2px;
  box-sizing: border-box;
  border: 1px solid rgb(235, 81, 96);
  background: rgb(255, 255, 255);
  color: rgb(235, 81, 96);
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  transition: 0.1s;
}
.recipe_input button:hover {
  background: rgb(247, 247, 247);
}
.recipe_input button:active {
  background: #eb5160;
  color: #fff;
}
.recipe_input_items {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}
.recipe_add_category {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 28px;
}
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
  margin-bottom: 30px;
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
.recipe_input label,
.add_h {
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
.recipe_add_category .recipe_input {
  gap: 13px;
}
.recipe_input_items input[type="checkbox"],
input[type="radio"] {
  width: 20px;
  height: 20px;
  border: 0;
  background: rgb(235, 235, 235);
  appearance: none;
  cursor: pointer;
}
.recipe_input_items input[type="radio"] {
  border-radius: 45px;
}
.recipe_input_items input[type="checkbox"]:checked,
input[type="radio"]:checked {
  background-color: #eb5160;
  position: relative;
}
.recipe_input_items input[type="checkbox"]::before,
input[type="radio"]::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 7px;
  width: 7px;
  height: 12px;
  border: 3px solid transparent;
  border-left: none;
  border-top: none;
  transform: rotate(45deg) scale(1);
}
.recipe_input_items input[type="checkbox"]:checked::before,
input[type="radio"]:checked::before {
  border-color: #fff;
  animation: checkAnim 0.2s ease;
}
.recipe_input_items label {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  user-select: none;
}
.steps_recipe button {
  width: 52px;
  height: 19px;
  color: #fff;
  font-weight: 400;
  line-height: 20px;
  font-size: 24px;
  border-radius: 5px;
  background: rgb(235, 81, 96);
}
.steps_recipe button:hover {
  background: rgb(235, 81, 96);
  opacity: 0.8;
  transform: scale(1.05);
}
.recipe_delete_step {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.recipe_delete_step button {
  background: #fff;
  border: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s;
}
.recipe_delete_step button:hover {
  background: #ebebeb;
  transform: scale(1);
}
.ingr_col {
  gap: 26px;
}
#clearBtn {
  background: #fff;
  border: 0;
  color: #eb5160;
  font-size: 16px;
  width: 120px;
  margin-top: 0;
}
#clearBtn:hover {
  transform: scale(1);
}
@keyframes checkAnim {
  from {
    transform: rotate(45deg) scale(0);
  }
}
</style>