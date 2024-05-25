<template>
  <div class="input_form">
    <label for="auth">{{ label_input }}</label>
    <input :type="type1" id="auth" />
  </div>
</template>

<script setup>
const props = defineProps({
  label_input: String,
  type1: String,
});
</script>

<style scoped>
.input_form label {
  color: rgb(0, 0, 0);
  font-size: 28px;
  font-weight: 400;
  line-height: 34px;
  text-align: left;
}
.input_form input {
  box-sizing: border-box;
  border-bottom: 2px solid rgb(0, 0, 0);
  background: rgb(255, 255, 255);
  width: 432px;
  height: 45px;
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-weight: 400;
  line-height: 29px;
  text-align: left;
}
.input_form {
  display: flex;
  flex-direction: column;
}
</style>