<template>
  <div class="chef_card">
    <div><img :src="user.img_avatar" alt="avatar" /></div>
    <p>{{ user.name }}</p>
    <div class="chef_card_score">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        v-bind:style="{ fill: color_chef }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 21H17.5L20.5 10.5L15.5 13L12 6L8.5 13L3.5 10.5L6.5 21Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 10.5C4.32843 10.5 5 9.82843 5 9C5 8.17157 4.32843 7.5 3.5 7.5C2.67157 7.5 2 8.17157 2 9C2 9.82843 2.67157 10.5 3.5 10.5Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
        <path
          d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
        <path
          d="M20.5 10.5C21.3284 10.5 22 9.82843 22 9C22 8.17157 21.3284 7.5 20.5 7.5C19.6716 7.5 19 8.17157 19 9C19 9.82843 19.6716 10.5 20.5 10.5Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
      </svg>
      <span v-bind:style="{ color: color_chef }">4.66</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        v-bind:style="{ fill: color_chef }"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 21H17.5L20.5 10.5L15.5 13L12 6L8.5 13L3.5 10.5L6.5 21Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.5 10.5C4.32843 10.5 5 9.82843 5 9C5 8.17157 4.32843 7.5 3.5 7.5C2.67157 7.5 2 8.17157 2 9C2 9.82843 2.67157 10.5 3.5 10.5Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
        <path
          d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
        <path
          d="M20.5 10.5C21.3284 10.5 22 9.82843 22 9C22 8.17157 21.3284 7.5 20.5 7.5C19.6716 7.5 19 8.17157 19 9C19 9.82843 19.6716 10.5 20.5 10.5Z"
          v-bind:style="{ stroke: color_chef }"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  color_chef: String,
  user: String,
});
</script>

<style scoped>
.chef_card_score {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.chef_card {
  width: 205px;
  height: 308px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.chef_card p {
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
}
.chef_card span {
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
}
.chef_card img {
  max-width: 205px;
  height: 205px;
  object-fit: cover;
  border-radius: 102.5px;
}
</style>