<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    "
  >
    <div class="recipe_detail">
      <div class="recipe_detail_head">
        <button @click="goToPrev()">&#10150;</button>
        <h1>{{ recipe.name }}</h1>
        <div class="category_detail">
          {{ recipe.category.name }}
          <span v-for="item in recipe.mealtime" :key="item.id">
            <img src="assets/img/rect_white.svg" alt="rect" /> {{ item.name }}
          </span>
        </div>
      </div>
      <div class="main_detail_div">
        <div class="main_detail">
          <img
            :src="'http://127.0.0.1:8000/' + recipe.face_img"
            alt="face_img"
          />
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <div class="main_detail_text">
              <h1>Автор: {{ recipe.user.name }}</h1>
              <div class="spacer_detail"></div>
              <p>Дата публикации: {{ created_at_date }}</p>
              <div class="spacer_detail"></div>
              <p>
                Общее время готовки: <span>{{ recipe.cooking_time }} мин.</span>
              </p>
              <div class="spacer_detail"></div>
              <p>Рейтинг рецепта: {{ points }} оч.</p>
            </div>
            <div class="recipe_icon">
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
            </div>
          </div>
        </div>
        <h1>Ингредиенты</h1>
        <div class="ingr_detail">
          <div v-for="item in recipe.counts" :key="item.id">
            <div class="ingr_line">
              <p>{{ item.ingredient.name }}</p>
              <div class="spacer"></div>
              <p>{{ item.count }} {{ item.system_of_calc.name }}</p>
            </div>
          </div>
        </div>
        <h1>Шаги рецепта</h1>
        <div class="detail_steps">
          <div v-for="item in recipe.steps" :key="item.id">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <h2>{{ item.number }} шаг</h2>
              <p style="width: 640px">{{ item.info }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_foot">
      <h1>Приятного аппетита!</h1>
      <h2>Не забудьте оценить блюдо и рассказать о нашем сайте друзьям.</h2>
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
      points: 0,
      created_at_date: "",
      token: "",
      likes: this.recipe.likes,
      dizlikes: this.recipe.dizlikes,
      like_status: 0,
      dizlike_status: 0,
    };
  },

  methods: {
    ratingCount() {
      let rate = this.recipe.likes * 2 - this.recipe.dizlikes;
      if (rate < 0) {
        this.points = 0;
      } else {
        this.points = rate;
      }
    },
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
    dateCount() {
      this.created_at_date = this.recipe.created_at
        .slice(0, 10)
        .replaceAll("-", ".");
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
    goToPrev() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.dateCount();
    this.ratingCount();
    this.get_scores(this.token);
  },
  beforeMount() {
    this.token = localStorage.getItem("access_token");
  },
});
</script>

<style scoped>
.recipe_detail_head button {
  color: white;
  font-size: 30px;
  width: 58px;
  height: 100%;
  -moz-transform: scale(-1, -1);
  -o-transform: scale(-1, -1);
  -webkit-transform: scale(-1, -1);
  transform: scale(-1, 1);
  transition: 0.1s;
}
.recipe_detail_head button:hover {
  background: rgba(114, 53, 58, 0.1);
}
.detail_foot {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 58px;
  margin-bottom: 21px;
  margin-top: 21px;
}
.detail_foot h1 {
  color: rgb(235, 81, 96);
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  text-align: left;
}
.detail_foot h2 {
  font-weight: 500;
  line-height: 29px;
  text-align: left;
}
.detail_steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.detail_steps h2 {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
}
.main_detail_div {
  padding-left: 58px;
  display: flex;
  flex-direction: column;
  gap: 21px;
}
.main_detail_div h1 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  text-align: left;
}
.ingr_line p {
  color: rgb(0, 0, 0);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  height: 22px;
  white-space: nowrap;
}
.spacer {
  background: rgba(235, 81, 96, 0.97);
  max-width: 100%;
  width: 100%;
  height: 1px;
  margin-bottom: 5px;
}
.ingr_line {
  width: 395px;
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 8px;
}
.recipe_detail {
  min-height: 700px;
  display: flex;
  flex-direction: column;
  gap: 21px;
}
.ingr_detail {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.main_detail {
  display: flex;
  flex-direction: row;
  gap: 29px;
}
.recipe_icon {
  display: flex;
  flex-direction: row;
  gap: 34px;
}
.recipe_icon_text {
  width: 30px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}
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
.main_detail_text {
  width: 309px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.spacer_detail {
  width: 100%;
  height: 2px;
  background: rgb(208, 208, 208);
}
.main_detail p {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.main_detail h1 {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
}
.main_detail_text span {
  color: rgb(235, 81, 96);
  font-weight: 600;
}
.main_detail img {
  width: 395px;
  height: 243px;
  object-fit: cover;
}
.recipe_detail_head h1 {
  color: rgb(255, 255, 255);
  font-size: 28px;
  font-weight: 600;
  line-height: 44px;
  text-align: left;
  margin-right: 28px;
}
.recipe_detail_head {
  width: 100%;
  height: 76px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgb(235, 81, 96);
}
.category_detail {
  height: 28px;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 6px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}
.category_detail span {
  display: flex;
  flex-direction: row;
  gap: 6px;
}
</style>