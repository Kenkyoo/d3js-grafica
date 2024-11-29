import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const aapl = [
    { date: 2014, close: 30 },
    { date: 2015, close: 52 },
    { date: 2016, close: 21 },
    { date: 2017, close: 17 },
    { date: 2018, close: 100 },
    { date: 2019, close: 57 },
    { date: 2020, close: 43 },
    { date: 2021, close: 22 },
    { date: 2022, close: 72 },
    { date: 2023, close: 349 },
    { date: 2024, close: 233 }
  ];  

const container = document.getElementById('container');

   // Declare the chart dimensions and margins.
   const width = 928;
   const height = 500;
   const marginTop = 20;
   const marginRight = 30;
   const marginBottom = 30;
   const marginLeft = 40;
 
   // Declare the x (horizontal position) scale.
   const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);
 
   // Declare the y (vertical position) scale.
   const y = d3.scaleLinear([0, d3.max(aapl, d => d.close)], [height - marginBottom, marginTop]);
 
   // Declare the line generator.
   const line = d3.line()
       .x(d => x(d.date))
       .y(d => y(d.close));
 
   // Create the SVG container.
   const svg = d3.create("svg")
       .attr("width", width)
       .attr("height", height)
       .attr("viewBox", [0, 0, width, height])
       .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
 
   // Add the x-axis.
   svg.append("g")
       .attr("transform", `translate(0,${height - marginBottom})`)
       .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
 
   // Add the y-axis, remove the domain line, add grid lines and a label.
   svg.append("g")
       .attr("transform", `translate(${marginLeft},0)`)
       .call(d3.axisLeft(y).ticks(height / 40))
       .call(g => g.select(".domain").remove())
       .call(g => g.selectAll(".tick line").clone()
           .attr("x2", width - marginLeft - marginRight)
           .attr("stroke-opacity", 0.1))
       .call(g => g.append("text")
           .attr("x", -marginLeft)
           .attr("y", 10)
           .attr("fill", "currentColor")
           .attr("text-anchor", "start")
           .text("↑ Variacion en porcentajes (%)"));
 
   // Append a path for the line.
   svg.append("path")
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", line(aapl));
 
// Return the SVG element.
container.append(svg.node());