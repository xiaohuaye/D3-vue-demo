<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

interface RouterItemI {
  name: string;
  routerName: string;
}

const routerList: RouterItemI[] = [
  {
    name: "getting started",
    routerName: "gettingStarted",
  },
];

function jumpTo(item: RouterItemI) {
  router.push({
    name: item.routerName,
  });
}
</script>

<template>
  <div>
    <div v-for="item in routerList" :key="item.name">
      <button @click="jumpTo(item)">{{ item.name }}</button>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
