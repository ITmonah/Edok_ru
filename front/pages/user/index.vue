<template>
  <div>
    <div class="error_div" v-if="error">
      <h1>Вы вышли из аккаунта</h1>
      <NuxtLink
        to="/"
        style="
          font-size: 30px;
          background-color: rgb(235, 81, 96);
          color: white;
          padding: 8px;
          border-radius: 8px;
          margin-top: 10px;
        "
        >На главную</NuxtLink
      >
    </div>
    <div class="bg_grey" v-if="!error">
      <div class="profile_head">
        <div class="profile_head1" style="">
          <img :src="'http://127.0.0.1:8000/' + user.img_avatar" alt="avatar" />
          <label for="file-upload" class="custom-file-upload"> Аватар </label>
          <input
            class="red_img"
            id="file-upload"
            type="file"
            ref="fileInput"
            @change="handleFileUpload($event)"
          />
        </div>
        <div class="profile_head_stats">
          <div class="stats_div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.5 12.0623C4.50627 11.6792 3 9.9255 3 7.82C3 5.43415 4.93413 3.5 7.32 3.5C7.7033 3.5 8.0749 3.54991 8.4287 3.6436C9.2199 2.64246 10.4449 2 11.82 2C13.2352 2 14.4914 2.68049 15.2794 3.73211C15.7186 3.58166 16.1898 3.5 16.68 3.5C19.0659 3.5 21 5.43415 21 7.82C21 9.9255 19.4937 11.6792 17.5 12.0623V20C17.5 20.5523 17.0523 21 16.5 21H7.5C6.9477 21 6.5 20.5523 6.5 20V12.0623Z"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 15.5H17.5"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 12.5V15.5"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 14V17"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 14V17"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>{{ user.username }}</p>
          </div>
          <div class="stats_div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.9993 2.5L8.9428 8.7388L2 9.74555L7.02945 14.6625L5.8272 21.5L11.9993 18.2096L18.1727 21.5L16.9793 14.6625L22 9.74555L15.0956 8.7388L11.9993 2.5Z"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
            <p>Рейтинг: {{ user.raiting }}</p>
          </div>
          <div class="stats_div">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 21H21"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M3 18H21"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4.5 12.5C4.5 8.35785 7.85785 5 12 5C16.1421 5 19.5 8.35785 19.5 12.5V18H4.5V12.5Z"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.5 12.5V14.5"
                stroke="#EB5160"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M14 5V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V5"
                stroke="#EB5160"
                stroke-width="2"
              />
            </svg>
            <p>Количество выложенных рецептов: {{ user.count_r }}</p>
          </div>
        </div>
      </div>
      <div class="profile_main">
        <h1>Данные о пользователе</h1>
        <div class="profile_main_input">
          <label for="emailp_input">Email</label>
          <input type="email" id="emailp_input" />
        </div>
        <div class="profile_main_input">
          <label for="passp_input">Пароль</label>
          <input type="password" id="passp_input" />
        </div>
        <h1>Информационные сообщения</h1>
        <div class="profile_main_info_btn">
          <input type="checkbox" id="switch" />
          <label for="switch">Toggle</label>
          <p>Получать информационные сообщения на E-mail</p>
        </div>
        <button style="margin-top: 37px" @click="acc_exit()">
          Выйти из аккаунта
        </button>
        <button @click="conf()">Удалить аккаунт</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      authShow: false,
      error: false,
      token: "",
      det: "",
      form: null,
    };
  },
  methods: {
    get_user(token) {
      fetch("http://127.0.0.1:8000/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.user = json;
            this.authShow = true;
          } else {
            this.error = true;
            this.det = json.detail;
          }
        });
    },
    conf() {
      const al = confirm("Вы действительно хотите удалить аккаунт?");
      if (al == true) {
        this.del_user(this.token);
      }
    },
    handleFileUpload(e) {
      this.form = e.target.files[0];
      this.upd_img(this.token);
    },
    del_user(token) {
      fetch(`http://127.0.0.1:8000/user/my_profile_delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.detail) {
            this.acc_exit();
          } else {
            this.error = true;
          }
        });
    },
    upd_img(token) {
      const fileInput = this.$refs.fileInput;
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      fetch(`http://127.0.0.1:8000/user/my_profile_img`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
    async acc_exit() {
      localStorage.setItem("access_token", "");
      await navigateTo({ path: "/" });
      location.reload();
    },
  },
  beforeMount() {
    this.token = localStorage.getItem("access_token");
    this.get_user(this.token);
  },
};
</script>

<style scoped>
.error_div {
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.error_div h1 {
  font-size: 40px;
}
.profile_main_info_btn {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.profile_main_info_btn p {
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  margin-left: 18px;
}
.profile_main_info_btn input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}
.profile_main_info_btn label {
  cursor: pointer;
  text-indent: -9999px;
  width: 73px;
  height: 33px;
  background: rgb(197, 197, 197);
  display: block;
  border-radius: 100px;
  position: relative;
}

.profile_main_info_btn label:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 5px;
  width: 25px;
  height: 25px;
  background: #fff;
  border-radius: 45px;
  transition: 0.3s;
}

.profile_main_info_btn input:checked + label {
  background: rgb(235, 81, 96);
}

.profile_main_info_btn input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.profile_main_info_btn label:active:after {
  width: 30px;
}

.profile_main_input {
  display: flex;
  flex-direction: column;
}
.profile_main_input input {
  width: 533px;
  height: 45px;
  border-bottom: 2px solid rgb(31, 31, 31);
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  text-align: left;
}
.profile_main {
  height: 676px;
  background: white;
  border-radius: 22px 22px 0px 0px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding-left: 47px;
  padding-top: 37px;
  gap: 30px;
}
.profile_main button {
  color: rgb(235, 81, 96);
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}
.profile_main_info_btn p {
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
}
.profile_main_input label {
  color: rgb(0, 0, 0);
  font-size: 28px;
  font-weight: 400;
  line-height: 34px;
  text-align: left;
}
.profile_main h1 {
  color: rgb(0, 0, 0);
  font-size: 28px;
  font-weight: 500;
  line-height: 34px;
  text-align: left;
}
.bg_grey {
  background: rgb(231, 231, 231);
}
.stats_div p {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  text-align: left;
}
.stats_div {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
}
.profile_head_stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profile_head {
  height: 237px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: white;
  gap: 45px;
  border-radius: 0px 0px 22px 22px;
}
.profile_head1 {
  position: relative;
  max-width: 156px;
  height: 156px;
}
.profile_head1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 102.5px;
}

.red_img {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 102.5px;
  width: 100%;
  height: 100%;
  top: 0px;
  opacity: 0;
  padding: auto;
  transition: 0.3s;
  background: url(assets/img/Pencil.svg);
  background-repeat: no-repeat;
  background-position: center center;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0px;
  height: 100%;
  opacity: 0;
  border-radius: 102.5px;
  color: #fff;
}
.custom-file-upload:hover {
  transition: 0.3s;
  opacity: 100;
  background-color: rgba(0, 0, 0, 0.4);
}
.red_img img {
  position: absolute;
  width: 58px;
  height: 60px;
  border-radius: 0px;
}
.red_img:hover {
  opacity: 100;
}
</style>