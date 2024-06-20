<template>
  <div class="recipes_div">
    <div class="recipes_div_head">
      <div class="recipes_title">
        <h1>Рецепты</h1>
        <img src="assets/img/Noodles.svg" alt="Иконка" />
        {{ $route.query.text }}
      </div>
      <div class="text-field__icon">
        <input
          type="search"
          placeholder="Название рецепта"
          v-model="name"
          @change="get_recipes()"
        />
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
          v-model="sorting"
          value="raiting"
          name="recipe_radio"
          @change="get_recipes()"
          id="rad1_recipes"
          checked
        /><label for="rad1_recipes">по рейтингу</label>

        <input
          type="radio"
          v-model="sorting"
          value="created_at"
          name="recipe_radio"
          @change="get_recipes()"
          id="rad2_recipes"
        /><label for="rad2_recipes">по дате добавления</label>

        <input
          type="radio"
          v-model="sorting"
          value="cooking_time"
          name="recipe_radio"
          @change="get_recipes()"
          id="rad3_recipes"
        /><label for="rad3_recipes">по времени</label>
      </div>
      <div>
        <select
          v-model="category_recipe"
          @change="
            () => {
              page_number = 1;
              get_recipes();
            }
          "
        >
          <option value="all">Все категории</option>
          <option v-for="item in mealtime" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
          <option v-for="item in categorys" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="recipes_cards_div" v-auto-animate>
      <div v-for="p in recipes.items" :key="p.id">
        <RecipeCard :recipe="p" />
      </div>
      <div v-if="recipes.items == 0">
        <h1>Ничего не найдено...</h1>
      </div>
    </div>

    <div class="pagination">
      <div v-for="item in recipes.pages" :key="item">
        <div v-if="item == 1">
          <input
            type="radio"
            :id="`radio_` + item"
            name="pagin"
            @change="aboba(item)"
            :checked="page_number == 1"
          />
          <label :for="`radio_` + item">{{ item }}</label>
        </div>
        <div v-else>
          <input
            type="radio"
            :id="`radio_` + item"
            name="pagin"
            @change="aboba(item)"
          />
          <label :for="`radio_` + item">{{ item }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: categorys } = await useFetch("http://127.0.0.1:8000/category/");
const { data: mealtime } = await useFetch("http://127.0.0.1:8000/mealtime/");
</script>

<script>
export default {
  data() {
    return {
      color_btn: "rgba(0, 0, 0)",
      page_number: 1,
      recipes: {},
      error: false,
      category_recipe: "all",
      sorting: "raiting",
      name: "",
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
    get_recipes() {
      if (this.name != null && this.name != "") {
        fetch(
          `http://127.0.0.1:8000/recipe/page/true/search/?name=${this.name}&page=${this.page_number}&size=50`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((json) => {
            if (!json.detail) {
              this.recipes = json;
            } else {
              this.error = true;
            }
          });
      } else {
        if (this.category_recipe == "all") {
          fetch(
            `http://127.0.0.1:8000/recipe/page/true?sort=${this.sorting}&page=${this.page_number}&size=3`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((json) => {
              if (!json.detail) {
                this.recipes = json;
              } else {
                this.error = true;
              }
            });
        } else {
          fetch(
            `http://127.0.0.1:8000/recipe/page/true/category/?name=${this.category_recipe}&sort=${this.sorting}&page=${this.page_number}&size=3`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((json) => {
              if (!json.detail) {
                this.recipes = json;
              } else {
                this.error = true;
              }
            });
        }
      }
    },
    aboba(page) {
      this.page_number = page;
      this.get_recipes();
    },
  },
  mounted() {
    this.get_recipes();
  },
};
</script>

<style scoped>
input[type="search"] {
  outline-offset: 0px;
}
.pagination {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 21px;
  gap: 19px;
}
.pagination label {
  cursor: pointer;
  user-select: none;
  color: rgba(0, 0, 0, 0.4);
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0%;
  text-align: center;
  transition: 0.1s;
}
.pagination input[type="radio"]:checked + label {
  color: rgb(0, 0, 0);
}
.pagination label:hover {
  color: rgb(0, 0, 0);
  cursor: pointer;
  transform: scale(1.1);
}
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
.pagination input {
  display: none !important;
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
  user-select: none;
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
  min-height: 900px;
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