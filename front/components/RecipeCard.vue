<template>
  <div class="card_recipe">
    <img
      :src="'http://127.0.0.1:8000/' + recipe.face_img"
      alt="recipe"
      class="thumb"
    />
    <div class="card_recipe_text">
      <div class="card_recipe_info">
        <p class="card_category">
          {{ recipe.category.name }}
          <span v-for="item in recipe.mealtime" :key="item.id">
            <img src="assets/img/rect_krug.svg" alt="rect" /> {{ item.name }}
          </span>
        </p>
        <NuxtLink :to="`/recipes/${recipe.id}`" class="recipe_name line-clamp-1"
          >{{ recipe.name }}
        </NuxtLink>
        <p>Автор: {{ recipe.user.name }}</p>
        <p class="recipe_date">Дата публикации: {{ created_at_date }}</p>
      </div>
      <div class="recipe_icons">
        <div class="recipe_icon_text">
          <button v-on:click="changeColor(token)">
            <svg
              class="like-btn"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              v-bind:style="{ fill: color }"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="30" height="30" fill="white" />
              <path
                d="M9.375 5C5.57804 5 2.5 8.07806 2.5 11.875C2.5 18.75 10.625 25 15 26.4539C19.375 25 27.5 18.75 27.5 11.875C27.5 8.07806 24.4219 5 20.625 5C18.2998 5 16.2442 6.15431 15 7.92113C13.7558 6.15431 11.7002 5 9.375 5Z"
                v-bind:style="{ stroke: stroke_col }"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {{ likes }}
        </div>
        <div class="recipe_icon_text">
          <button v-on:click="changeColorDis(token)">
            <svg
              class="dislike-btn"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              v-bind:style="{ fill: dis_color }"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="30" height="30" fill="white" />
              <path
                d="M22.4447 4.03506L25.8007 15.9101C26.0261 16.7078 25.4267 17.5 24.5977 17.5H17.4217C16.9821 17.5 16.6569 17.9089 16.7557 18.3372L17.0679 19.6899C17.3542 20.9308 17.4462 22.2086 17.3404 23.4776L17.2829 24.1671C17.2213 24.9067 16.8996 25.6004 16.3748 26.1252C15.8947 26.6053 15.2436 26.875 14.5647 26.875H14.4152C14.0046 26.875 13.6263 26.6524 13.4269 26.2935L11.7656 23.3032C11.0206 21.962 9.90994 20.86 8.56306 20.1253L4.40144 17.8553C3.99986 17.6363 3.75 17.2154 3.75 16.7579V4.375C3.75 3.68464 4.30964 3.125 5 3.125H21.2418C21.8013 3.125 22.2926 3.49671 22.4447 4.03506Z"
                stroke="#333333"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          {{ dizlikes }}
        </div>
        <div class="spacer"></div>
        <div class="recipe_icon_text1">
          <img src="assets/img/Timer.svg" />
          {{ recipe.cooking_time }} мин.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<script>
export default defineComponent({
  props: {
    recipe: Object,
  },
  data() {
    return {
      color: "white",
      stroke_col: "#333333",
      dis_color: "white",
      token: "",
      created_at_date: "",
      likes: this.recipe.likes,
      dizlikes: this.recipe.dizlikes,
      like_status: 0,
      dizlike_status: 0,
    };
  },
  methods: {
    get_scores(token) {
      fetch(`http://127.0.0.1:8000/score/info/${this.recipe.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.likes = json.likes;
            this.dizlikes = json.dislikes;
            this.like_status = json.status_like;
            this.dizlike_status = json.status_dizlike;
            this.colorSave();
          } else {
            this.error = true;
          }
        });
    },
    dateCount() {
      this.created_at_date = this.recipe.created_at
        .slice(0, 10)
        .replaceAll("-", ".");
    },
    colorSave() {
      if (this.like_status == 1) {
        this.color = "#eb5160";
        this.stroke_col = "#eb5160";
      }
      if (this.dizlike_status == 1) {
        this.dis_color = "#333333";
        this.stroke_col = "#333333";
      }
    },
    async changeColor(token) {
      if (this.color == "#eb5160") {
        let credetentials_d = {
          id_recipe: this.recipe.id,
        };
        fetch(`http://127.0.0.1:8000/score/no/${this.recipe.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credetentials_d),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.detail) {
              this.get_scores(token);
              this.color = "white";
              this.stroke_col = "#333333";
            } else {
              this.error = true;
            }
          });
      } else {
        let credetentials = {
          id_recipe: this.recipe.id,
        };
        fetch(`http://127.0.0.1:8000/score/like/${this.recipe.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credetentials),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.detail) {
              this.get_scores(token);
              this.color = "#eb5160";
              this.stroke_col = "#eb5160";
              this.dis_color = "white";
            } else {
              this.error = true;
            }
          });
      }
    },
    async changeColorDis(token) {
      if (this.dis_color == "#333333") {
        let credetentials_diz_d = {
          id_recipe: this.recipe.id,
        };
        fetch(`http://127.0.0.1:8000/score/no/${this.recipe.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credetentials_diz_d),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.detail) {
              this.get_scores(token);
              this.dis_color = "white";
            } else {
              this.error = true;
            }
          });
      } else {
        let credetentials_diz = {
          id_recipe: this.recipe.id,
        };
        fetch(`http://127.0.0.1:8000/score/dizlike/${this.recipe.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(credetentials_diz),
        })
          .then((response) => response.json())
          .then((json) => {
            if (!json.detail) {
              this.get_scores(token);
              this.dis_color = "#333333";
              this.color = "white";
              this.stroke_col = "#333333";
            } else {
              this.error = true;
            }
          });
      }
    },
  },
  mounted() {
    this.dateCount();
    this.get_scores(this.token);
  },
  beforeMount() {
    this.token = localStorage.getItem("access_token");
  },
});
</script>

<style scoped>
.dislike-btn {
  transition: 0.15s;
}
.dislike-btn:hover {
  cursor: pointer;
  opacity: 0.7;
  transform: scale(1.1);
}
.like-btn {
  transition: 0.15s;
}
.like-btn:hover {
  cursor: pointer;
  opacity: 0.7;
  transform: scale(1.1);
}
.card_recipe_text {
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card_recipe_info {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.card_recipe {
  display: flex;
  flex-direction: row;
  gap: 36px;
}
.spacer {
  width: 1px;
  height: 49px;
  background: rgb(77, 77, 77);
}
.recipe_icons {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
.recipe_icon_text1 {
  width: 73px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}
.recipe_icon_text1 img {
  width: 30px;
}
.recipe_icon_text {
  width: 30px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}
.recipe_date {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.recipe_name {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
}
.card_category {
  display: flex;
  flex-direction: row;
  color: rgb(235, 81, 96);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  gap: 6px;
}
.card_category span {
  display: flex;
  flex-direction: row;
  gap: 6px;
}
.thumb {
  width: 325.27px;
  height: 201px;
  object-fit: cover;
}
</style>