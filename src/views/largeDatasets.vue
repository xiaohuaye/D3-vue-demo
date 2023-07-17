<script lang="ts" setup>
import * as d3 from "d3";
import { onMounted } from "vue";

const points = Array.from({ length: 8640 }).map((_a, i) => {
  const negative = Math.random() > 0.5 ? 1 : -1;

  return {
    date: new Date("2023-3-16 00:00:00").getTime() + 10000 * i,
    temperature: 28 + negative * Math.floor(Math.random() * 10),
  };
});

console.log("points", points);

function createSvgD3() {
  // Declare the chart dimensions and margins.
  const width = 65535;
  const height = 400;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(
    // @ts-ignore next line
    d3.extent(points, (d) => d.date),
    [marginLeft, width - marginRight]
  );

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear(
    [
      // @ts-ignore next line
      d3.min(points, (d) => d.temperature) - 2,
      // @ts-ignore next line
      d3.max(points, (d) => d.temperature) + 2,
    ],
    [height - marginBottom, marginTop]
  );

  // Declare the line generator.
  const line = d3
    .line()
    // @ts-ignore next line
    .x((d) => x(d.date))
    // @ts-ignore next line
    .y((d) => y(d.temperature));

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
        .tickFormat((x) => {
          const d = x as Date;
          return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        })
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
        .text("温度 ℃")
    );

  // Append a path for the line.
  svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    // @ts-ignore next line
    .attr("d", line(points));

  svg
    .append("g")
    .selectAll()
    .data(points)
    .join("circle")
    // @ts-ignore next line
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.temperature))
    .attr("fill", (d) => {
      if (d.temperature > 35 || d.temperature < 21) {
        return "#8f2243";
      }
      return "#32a852";
    })
    .attr("r", 3)
    .on("click", (...arg) => {
      console.log("arg", arg);
    });

  return svg.node();
}

onMounted(() => {
  const svgInstance = createSvgD3();

  if (svgInstance) {
    document.getElementById("d3-largeDatasets")?.append(svgInstance);
  }
});
</script>

<template>
  <div class="largeDatasetsWrapper">
    <div class="largeDatasetsWrapperDemo">
      <p>8640数据测试</p>
      <div id="d3-largeDatasets"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.largeDatasetsWrapper {
  height: 100%;
  overflow-y: auto;
}

.largeDatasetsWrapperDemo {
  margin-bottom: 100 * @vpx;
  width: 65600 * @vpx;
  overflow-x: auto;
}
</style>
