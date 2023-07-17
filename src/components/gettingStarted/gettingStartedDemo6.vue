<script lang="ts" setup>
import * as d3 from "d3";
import { onMounted } from "vue";

import aapl from "@/assets/aapl.json";

const aaplForDate = aapl.map((a) => {
  return {
    close: a.close,
    date: Date.parse(a.date),
  };
});

function createSvgD3() {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(
    // @ts-ignore next line
    d3.extent(aaplForDate, (d) => d.date),
    [marginLeft, width - marginRight]
  );

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear(
    // @ts-ignore next line
    [0, d3.max(aaplForDate, (d) => d.close)],
    [height - marginBottom, marginTop]
  );

  // Declare the line generator.
  const line = d3
    .line()
    // @ts-ignore next line
    .x((d) => x(d.date))
    // @ts-ignore next line
    .y((d) => y(d.close));

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Daily close ($)")
    );

  // Append a path for the line.
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    // @ts-ignore next line
    .attr("d", line(aaplForDate));

  return svg.node();
}

onMounted(() => {
  const svgInstance = createSvgD3();

  if (svgInstance) {
    document.getElementById("d3-wrapper7")?.append(svgInstance);
  }
});
</script>

<template>
  <div>
    <div>
      <p>Line chart</p>
      <a
        href="https://observablehq.com/@d3/line-chart/2?intent=fork"
        target="_blank"
        >https://observablehq.com/@d3/line-chart/2?intent=fork</a
      >
    </div>
    <div id="d3-wrapper7"></div>
  </div>
</template>

<style lang="less" scoped></style>
