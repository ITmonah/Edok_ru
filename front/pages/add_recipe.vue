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
    <form @submit.prevent="post_recipe(token)">
      <div class="recipe_inputs">
        <div class="recipe_input">
          <label for="input_add_name">Название рецепта</label>
          <input
            type="text"
            placeholder="..."
            id="input_add_name"
            v-model="name"
            required
            autocomplete="off"
          />
        </div>
        <div class="recipe_input steps_recipe" v-auto-animate>
          <label for="input_add_ingr1">Ингредиенты</label>
          <div v-for="n in ingr_count" :key="n">
            <div class="ingr_pols">
              <select
                :id="`input_add_ingr${n}`"
                v-model="id_ingr[n - 1]"
                required
              >
                <option
                  v-for="item in ingredients"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
              <div class="ingr_right">
                <label v-if="n == 1" for="ingr_input1">Количество</label>
                <input
                  type="number"
                  placeholder="..."
                  style="width: 100px"
                  :id="`ingr_input${n}`"
                  v-model="count[n - 1]"
                  min="1"
                  max="9999"
                  step="1"
                  required
                  autocomplete="off"
                />
              </div>
              <div class="ingr_right">
                <label v-if="n == 1" for="count_input1">Система ед.</label>
                <select
                  style="width: 100px"
                  v-model="id_syst_calc[n - 1]"
                  :id="`count_input${n}`"
                  required
                >
                  <option
                    v-for="item in system_of_calculation"
                    :key="item.id"
                    :value="item.id"
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
          <label for="input_add_step1">Шаги рецепта</label>
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
              <input
                type="text"
                placeholder="..."
                :id="`input_add_step${n}`"
                v-model="step_info[n - 1]"
                autocomplete="off"
                required
              />
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
            type="number"
            placeholder="мин."
            id="input_add_time"
            v-model="cooking_time"
            style="width: 144px; font-size: 18px"
            autocomplete="off"
            min="1"
            max="999"
            required
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
                v-model="meal_1"
                @change="mealTimeAdd(meal_1, 1)"
              />
              <label for="time_category_breakfast">завтрак</label>
            </div>
            <div class="recipe_input_items">
              <input
                type="checkbox"
                name="time_category"
                id="time_category_lunch"
                v-model="meal_2"
                @change="mealTimeAdd(meal_2, 2)"
              />
              <label for="time_category_lunch">обед</label>
            </div>
            <div class="recipe_input_items">
              <input
                type="checkbox"
                name="time_category"
                id="time_category_diner"
                v-model="meal_3"
                @change="mealTimeAdd(meal_3, 3)"
              />
              <label for="time_category_diner">ужин</label>
            </div>
          </div>
          <div class="recipe_input">
            <div v-for="i in categorys" :key="i.id">
              <div class="recipe_input_items">
                <input
                  type="radio"
                  name="time_category"
                  :id="`time_category_` + i.id"
                  @change="categoryChange(i.id)"
                  required
                />
                <label :for="`time_category_` + i.id">{{ i.name }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="recipe_input">
          <label>Лицевая картинка рецепта</label>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload($event)"
            required
          />
        </div>
        <!-- <div class="recipe_input">
          <label>Дополнительные картинки блюда</label>
          <button>выбрать файл</button>
        </div> -->
        <input type="submit" value="Добавить рецепт" class="add_recipe_btn" />
      </div>
    </form>
  </div>
</template>
  
<script setup>
const { data: ingredients } = await useFetch(
  "http://127.0.0.1:8000/ingredient/"
);
const { data: system_of_calculation } = await useFetch(
  "http://127.0.0.1:8000/system_of_calculation/"
);
const { data: categorys } = await useFetch("http://127.0.0.1:8000/category/");
</script>

<script>
export default {
  data() {
    return {
      steps_count: [1],
      step_info: [],
      token: "",
      ingr_count: 1,
      name: "",
      id_category: 0,
      cooking_time: null,
      id_mealtime: [],
      step_input: [],
      count_input: [],
      id_ingr: [],
      count: [],
      id_syst_calc: [],
      meal_1: false,
      meal_2: false,
      meal_3: false,
      form: null,
    };
  },
  methods: {
    stepAdd(value) {
      this.step_input.push(value);
    },
    mealTimeAdd(item, id) {
      if (item == true) {
        this.id_mealtime.push(id);
      } else {
        let index = this.id_mealtime.indexOf(id);
        if (index >= 0) {
          this.id_mealtime.splice(index, 1);
        }
      }
      this.id_mealtime.sort();
    },
    categoryChange(id) {
      this.id_category = id;
    },
    countStep: function (n) {
      this.steps_count.push(n + 1);
      this.step_info.push(null);
    },
    deleteStep: function (n) {
      if (this.steps_count.length > 1) {
        this.steps_count.pop();
      }
      this.step_info.pop();
    },
    countIngr: function () {
      this.ingr_count = this.ingr_count + 1;
      this.id_ingr.push(null);
      this.count.push(null);
      this.id_syst_calc.push(null);
    },
    deleteIngr: function () {
      if (this.ingr_count > 1) {
        this.ingr_count = this.ingr_count - 1;
        this.id_ingr.pop();
        this.count.pop();
        this.id_syst_calc.pop();
      }
    },
    clearIngr: function () {
      if (this.ingr_count > 1) {
        this.ingr_count = 1;
        this.id_ingr = [];
        this.count = [];
        this.id_syst_calc = [];
      }
    },
    post_recipe(token) {
      this.step_input = [];
      for (let i = 0; i < this.step_info.length; i++) {
        let item = { info: this.step_info[i] };
        this.step_input.push(item);
      }
      this.count_input = [];
      if (
        this.id_ingr.length == this.count.length &&
        this.id_ingr.length == this.id_syst_calc.length
      ) {
        for (let i = 0; i < this.id_ingr.length; i++) {
          let item_i = {
            id_ingredient: this.id_ingr[i],
            count: this.count[i],
            id_system_of_calc: this.id_syst_calc[i],
          };
          this.count_input.push(item_i);
        }
      }
      let credetentials_rec = {
        recipe_input: {
          name: this.name,
          id_category: this.id_category,
          cooking_time: this.cooking_time,
          id_mealtime: this.id_mealtime,
        },
        step_input: this.step_input,
        count_input: this.count_input,
      };
      fetch("http://127.0.0.1:8000/recipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credetentials_rec),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            const fileInput = this.$refs.fileInput;
            const formData = new FormData();
            formData.append("file", fileInput.files[0]);

            console.log(formData);
            fetch("http://127.0.0.1:8000/recipe/img", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            })
              .then((response) => response.json())
              .then((json) => {
                if (!json.detail) {
                  alert("Ваш рецепт был отправлен на проверку");
                  location.reload();
                } else {
                  console.log(json.detail);
                }
              });
          } else {
            this.error = true;
          }
        });
    },
    handleFileUpload(e) {
      this.form = e.target.files[0];
    },
  },
  beforeMount() {
    this.token = localStorage.getItem("access_token");
  },
};
</script>
  
<style scoped>
.add_recipe_btn {
  cursor: pointer;
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
.recipe_input input[type="file"] {
  cursor: pointer;
  width: 423px;
  height: 50px;
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
.recipe_input input[type="file"]:hover {
  background: rgb(247, 247, 247);
}
.recipe_input input[type="file"]:active {
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