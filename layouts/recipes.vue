<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4">
        <NuxtLink to="/recipes">Edok.ru</NuxtLink>
      </nav>
    </header>

    <div class="container mx-auto p-4">
      <slot />
    </div>

    <footer class="container mx-auto p-4 flex justify-between border-t-2">
      <ul class="flex gap-4">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/add_recipe">About</NuxtLink></li>
        <li><NuxtLink to="/recipes">Recipes</NuxtLink></li>
      </ul>
    </footer>
  </div>
</template>
  
  <style scoped>
.router-link-exact-active {
  color: rgb(255, 34, 101);
}
</style>