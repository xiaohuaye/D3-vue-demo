<script lang="ts" setup>
import type { RouteRecordNormalized } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

interface RouterItemI {
  name: string;
  routerName: string;
  origin: RouteRecordNormalized;
}

// 排出入口路由
const blackList = ["", "homePage"];

const List = router.getRoutes().filter((r) => {
  return !blackList.includes(r.name?.toString() || "");
});

const routerList = List.map((l) => {
  return {
    name: l.name?.toString() || "",
    routerName: l.meta.descript as string,
    origin: l,
  };
});

function jumpTo(item: RouterItemI) {
  router.push({
    name: item.origin.name,
  });
}
</script>

<template>
  <div>
    <div v-for="item in routerList" :key="item.name">
      <button class="routerBtn" @click="jumpTo(item)">
        {{ item.routerName }}
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.routerBtn {
  margin-bottom: 30 * @vpx;
}
</style>
