<script lang="ts" setup>
import DisjointForceDirectedGraph from "components/force/disjointForceDirectedGraph.vue";
</script>

<template>
  <div class="disjointForceDirectedGraphWrapper">
    <DisjointForceDirectedGraph />
  </div>
</template>

<style lang="less" scoped>
.disjointForceDirectedGraphWrapper {
  height: 100%;
  overflow-y: auto;
}

.disjointForceDirectedGraphWrapperDemo {
  margin-bottom: 100 * @vpx;
}
</style>
