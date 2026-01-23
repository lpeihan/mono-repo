<template>
  <van-nav-bar :title="$t('tabbar.home')" fixed placeholder />

  <form @submit="handleSubmit">
    <input v-model="form.name" type="text" />

    <label for="cars">Choose a car:</label>
    <select id="cars" name="cars">
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  </form>

  <div class="py-4 text-center">
    <img src="/logo.svg" class="mx-auto" />
  </div>

  <Tabbar />
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  name: '',
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  console.log(form.name);
};
</script>
