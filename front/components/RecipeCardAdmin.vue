<template>
  <div>
    <div
      class="container flex-col p-6 shadow"
      style="
        display: flex;
        gap: 7px;
        width: 450px;
        height: 710px;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: #aeaeae #fff;
      "
    >
      <h1 style="font-size: 24px">
        <b>{{ recipe.name }}</b>
      </h1>
      <img
        :src="url + '/' + recipe.face_img"
        alt="face_img"
        style="width: 100%"
      />
      <p>
        <span style="color: rgba(235, 81, 96)">Дата: </span
        >{{ recipe.created_at }}
      </p>
      <p>
        <span style="color: rgba(235, 81, 96)">Время готовки:</span>
        {{ recipe.cooking_time }} мин.
      </p>
      <p>
        <span style="color: rgba(235, 81, 96)">Автор:</span>
        {{ recipe.user.name }}
      </p>
      <p>
        <span style="color: rgba(235, 81, 96)">Категории: </span
        >{{ recipe.category.name }};
        <span v-for="item in recipe.mealtime" :key="item.id">
          {{ item.name }}<span>; </span>
        </span>
      </p>
      <h1><b>Ингредиенты</b></h1>
      <div class="ingr_detail">
        <div v-for="item in recipe.counts" :key="item.id">
          <div class="ingr_line">
            <p>{{ item.ingredient.name }}</p>
            <div class="spacer"></div>
            <p>{{ item.count }} {{ item.system_of_calc.name }}</p>
          </div>
        </div>
      </div>
      <h1><b>Шаги рецепта</b></h1>
      <div class="detail_steps">
        <div v-for="item in recipe.steps" :key="item.id">
          <div style="display: flex; flex-direction: column; gap: 10px">
            <h2>{{ item.number }} шаг</h2>
            <p style="max-width: 740px">{{ item.info }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="card_footer">
      <button style="color: green" @click="pubRecipe(token)">
        Опубликовать
      </button>
      <button style="color: red" @click="conf()">Удалить</button>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  props: {
    recipe: Object,
  },
  data() {
    return {
      token: "",
      url: useRuntimeConfig().public.apiBaseURL,
    };
  },
  methods: {
    pubRecipe(token) {
      let credetentials = {
        id_recipe: this.recipe.id,
      };
      fetch(`${this.url}/recipe/published/${this.recipe.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credetentials),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            location.reload();
          } else {
            this.error = true;
          }
        });
    },
    conf() {
      const al = confirm("Вы действительно хотите удалить рецепт?");
      if (al == true) {
        this.delRecipe(this.token);
      }
    },
    delRecipe(token) {
      let credetentials_del = {
        id_recipe: this.recipe.id,
      };
      fetch(`${this.url}/recipe/${this.recipe.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credetentials_del),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            location.reload();
          } else {
            this.error = true;
          }
        });
    },
  },
  beforeMount() {
    this.token = localStorage.getItem("access_token");
  },
});
</script>

<style scoped>
.card_footer {
  width: 450px;
  height: 40px;
  padding: 10px;
  background: rgb(243, 243, 243);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.detail_steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.detail_steps h2 {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
}
.ingr_detail {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.ingr_line {
  width: 395px;
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 8px;
}
.spacer {
  background: rgba(235, 81, 96, 0.97);
  max-width: 100%;
  width: 100%;
  height: 1px;
  margin-bottom: 5px;
}
.ingr_line p {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  height: 22px;
  white-space: nowrap;
}
</style>