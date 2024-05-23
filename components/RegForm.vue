<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div class="modal_head">
          <button
            type="button"
            class="btn-close"
            @click="close1"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M8.75 8.75L21.25 21.25"
                stroke="#333333"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.75 21.25L21.25 8.75"
                stroke="#333333"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button type="button" class="btn-close-reg" @click="close">
            Назад
          </button>
          <h1>Регистрация</h1>
        </div>
        <InputForm label_input="Email" type1="email" />
        <InputForm label_input="Отображаемое имя" type1="text" />
        <InputForm label_input="Пароль" type1="text" />
        <div class="btns">
          <button class="btn-sub">Регистрация</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal1",
  methods: {
    close() {
      this.$emit("close1");
    },
    close1() {
      this.$emit("close1");
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal_head {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.btn-reg {
  color: rgb(235, 81, 96);
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  width: 137px;
  height: 24px;
  margin: 0 auto;
}
.btn-sub {
  border-radius: 6px;
  background: rgb(235, 81, 96);
  width: 228px;
  height: 49px;
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.modal-backdrop h1 {
  color: rgb(0, 0, 0);
  font-size: 32px;
  font-weight: 400;
  line-height: 39px;
  text-align: left;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 39px;
  width: 558px;
  height: 557px;
  border-radius: 8px;
  background: rgb(255, 255, 255);
}

.btn-close {
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
  position: absolute;
  top: -30px;
  left: 350px;
}
.btn-close-reg {
  color: rgb(235, 81, 96);
  width: 64px;
  height: 24px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  position: absolute;
  text-align: left;
  top: -26px;
  left: -150px;
}
.btns {
  display: flex;
  flex-direction: column;
  gap: 23px;
  justify-content: center;
}
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>