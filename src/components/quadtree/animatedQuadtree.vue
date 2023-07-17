<!-- eslint-disable no-extra-parens -->
<script lang="ts" setup>
import * as d3 from "d3";
import { onMounted } from "vue";

const points = ((random) =>
  Array.from({ length: 1000 }, () => [random(), random()]))(
  d3.randomNormal.source(d3.randomLcg(42))()
);

function quadtreeVisitParent(callback: (...arg: any) => void) {
  let quads = [] as any[],
    q:
      | { node: any; parent: any; x0: any; y0: any; x1: any; y1: any }
      | undefined,
    node = this._root,
    parent: { x0: any; y0: any; x1: any; y1: any },
    child: any,
    x0: any,
    y0: any,
    x1: any,
    y1: any,
    xm: number,
    ym: number;

  if (node) {
    quads.push({
      node,
      x0: this._x0,
      y0: this._y0,
      x1: this._x1,
      y1: this._y1,
    });
  }

  while ((q = quads.pop())) {
    node = q.node;
    parent = q.parent;

    if (parent) {
      callback(parent.x0, parent.y0, parent.x1, parent.y1);
    }
    if (!node.length) {
      continue;
    }
    x0 = q.x0;
    y0 = q.y0;
    x1 = q.x1;
    y1 = q.y1;
    xm = (x0 + x1) / 2;
    ym = (y0 + y1) / 2;

    if ((child = node[3])) {
      quads.push({ parent: q, node: child, x0: xm, y0: ym, x1: x1, y1: y1 });
    }
    if ((child = node[2])) {
      quads.push({ parent: q, node: child, x0: x0, y0: ym, x1: xm, y1: y1 });
    }
    if ((child = node[1])) {
      quads.push({ parent: q, node: child, x0: xm, y0: y0, x1: x1, y1: ym });
    }
    if ((child = node[0])) {
      quads.push({ parent: q, node: child, x0: x0, y0: y0, x1: xm, y1: ym });
    }
  }
  return this;
}

async function writeDataForSvg(
  svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
  tree: d3.Quadtree<number>,
  x: d3.ScaleLinear<number, number, never>,
  y: d3.ScaleLinear<number, number, never>,
  g: d3.Selection<SVGGElement, undefined, null, undefined>
) {
  const nodes = new Set();
  for (let i = 0; i < points.length; ++i) {
    tree.add(i);
    let t = svg.transition() as any;

    svg
      .append("circle")
      .attr("fill", "currentColor")
      .attr("stroke", "white")
      .attr("cx", x(points[i][0]))
      .attr("cy", y(points[i][1]))
      .attr("r", 0)
      .transition(t)
      .attr("r", 2.5);

    quadtreeVisitParent.call(
      tree,
      (
        x0: d3.NumberValue,
        y0: d3.NumberValue,
        x1: d3.NumberValue,
        y1: d3.NumberValue
      ) => {
        const key = [x0, y0, x1, y1].join();
        if (nodes.has(key)) {
          return;
        }
        nodes.add(key);
        t = t.transition();
        const xm = (Number(x0) + Number(x1)) / 2;
        const ym = (Number(y0) + Number(y1)) / 2;
        g.append("line")
          .attr("x1", x(xm))
          .attr("y1", y(ym))
          .attr("x2", x(xm))
          .attr("y2", y(ym))
          .transition(t)
          .attr("x1", x(x0));
        g.append("line")
          .attr("x1", x(xm))
          .attr("y1", y(ym))
          .attr("x2", x(xm))
          .attr("y2", y(ym))
          .transition(t)
          .attr("x2", x(x1));
        g.append("line")
          .attr("x1", x(xm))
          .attr("y1", y(ym))
          .attr("x2", x(xm))
          .attr("y2", y(ym))
          .transition(t)
          .attr("y1", y(y0));
        g.append("line")
          .attr("x1", x(xm))
          .attr("y1", y(ym))
          .attr("x2", x(xm))
          .attr("y2", y(ym))
          .transition(t)
          .attr("y2", y(y1));
      }
    );

    await t.end();
  }
}

function createSvgD3() {
  const width = 960;
  const height = width;
  const tree = d3.quadtree(
    [],
    (i) => points[i][0],
    (i) => points[i][1]
  ) as any;
  tree.cover(
    d3.min(points, ([x]) => x),
    d3.min(points, ([, y]) => y)
  );
  tree.cover(
    d3.max(points, ([x]) => x),
    d3.max(points, ([, y]) => y)
  );
  const x = d3.scaleLinear([tree._x0, tree._x1], [0.5, width - 0.5]);
  const y = d3.scaleLinear([tree._y0, tree._y1], [height - 0.5, 0.5]);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  const g = svg.append("g").attr("stroke", "currentColor").attr("fill", "none");

  g.append("rect")
    .attr("x", x(tree._x0))
    .attr("y", y(tree._y1))
    .attr("width", x(tree._x1) - x(tree._x0))
    .attr("height", y(tree._y0) - y(tree._y1));

  return {
    d3Svg: svg,
    d3Tree: tree,
    x,
    y,
    g,
  };
}

onMounted(() => {
  const { d3Svg, d3Tree, x, y, g } = createSvgD3();
  let tree = d3Tree;

  const svgInstance = d3Svg.node();

  if (svgInstance) {
    document.getElementById("d3-quadtreeDemo1")?.append(svgInstance);

    writeDataForSvg(d3Svg, tree, x, y, g);
  }
});
</script>

<template>
  <div class="quadtreeDemo">
    <div>
      <a
        href="https://observablehq.com/@d3/animated-quadtree?intent=fork"
        target="_blank"
        >https://observablehq.com/@d3/animated-quadtree?intent=fork</a
      >
    </div>
    <div id="d3-quadtreeDemo1"></div>
  </div>
</template>

<style lang="less" scoped></style>
