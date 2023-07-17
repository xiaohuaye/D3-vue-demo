<script lang="ts" setup>
import AnimatedQuadtree from "components/quadtree/animatedQuadtree.vue";
</script>

<template>
  <div class="quadtree">
    <AnimatedQuadtree />
  </div>
</template>

<style lang="less" scoped>
.quadtree {
  height: 100%;
  overflow-y: auto;
}

.quadtreeDemo {
  margin-bottom: 100 * @vpx;
}
</style>
