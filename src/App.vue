<script setup lang="ts">
import { router } from "./router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const refresh = ref(false);

const route = useRoute();

function backHome() {
  router.push({
    name: "homePage",
  });
}
</script>

<template>
  <div>
    <div v-show="route.name !== 'homePage'" class="backWrap">
      <button @click="backHome">返回</button>
    </div>
    <router-view v-if="!refresh" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style scoped lang="less">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.backWrap {
  position: absolute;
  right: 10 * @vpx;
  top: 10 * @vpx;
}
</style>
