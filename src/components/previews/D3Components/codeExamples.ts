interface CodeExample {
  name: string;
  code: string;
}

export const codeExamples: Record<string, CodeExample> = {
  barChart: {
    name: "柱状图",
    code: `// 示例数据
const data = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 15 },
  { name: "D", value: 25 },
  { name: "E", value: 18 }
];

// 设置画布尺寸
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

// 清除旧的内容
d3.select("#visualization").selectAll("*").remove();

// 创建 SVG
const svg = d3.select("#visualization")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// 创建比例尺
const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

// 添加柱状图
svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", d => x(d.name))
  .attr("y", d => y(d.value))
  .attr("height", d => y(0) - y(d.value))
  .attr("width", x.bandwidth())
  .attr("fill", "steelblue");

// 添加坐标轴
svg.append("g")
  .attr("transform", \`translate(0,\${height - margin.bottom})\`)
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("transform", \`translate(\${margin.left},0)\`)
  .call(d3.axisLeft(y));`
  },
  pieChart: {
    name: "饼图",
    code: `// 示例数据
const data = [
  { name: "A", value: 30 },
  { name: "B", value: 20 },
  { name: "C", value: 15 },
  { name: "D", value: 25 },
  { name: "E", value: 10 }
];

// 设置画布尺寸
const width = 400;
const height = 300;
const radius = Math.min(width, height) / 2;

// 清除旧的内容
d3.select("#visualization").selectAll("*").remove();

// 创建 SVG
const svg = d3.select("#visualization")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", \`translate(\${width / 2},\${height / 2})\`);

// 创建饼图生成器
const pie = d3.pie()
  .value(d => d.value)
  .sort(null);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius - 40);

// 创建颜色比例尺
const color = d3.scaleOrdinal()
  .domain(data.map(d => d.name))
  .range(d3.schemeCategory10);

// 添加饼图
const arcs = svg.selectAll("arc")
  .data(pie(data))
  .join("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.name))
  .attr("stroke", "white")
  .style("stroke-width", "2px");

// 添加文本标签
const arcLabel = d3.arc()
  .innerRadius(radius - 80)
  .outerRadius(radius - 80);

svg.selectAll("text")
  .data(pie(data))
  .join("text")
  .attr("transform", d => \`translate(\${arcLabel.centroid(d)})\`)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(d => d.data.name);`
  },
  lineChart: {
    name: "折线图",
    code: `// 示例数据
const data = [
  { date: "2023-01", value: 10 },
  { date: "2023-02", value: 15 },
  { date: "2023-03", value: 25 },
  { date: "2023-04", value: 20 },
  { date: "2023-05", value: 30 },
  { date: "2023-06", value: 28 }
];

// 设置画布尺寸
const width = 400;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

// 清除旧的内容
d3.select("#visualization").selectAll("*").remove();

// 创建 SVG
const svg = d3.select("#visualization")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// 创建比例尺
const x = d3.scalePoint()
  .domain(data.map(d => d.date))
  .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .nice()
  .range([height - margin.bottom, margin.top]);

// 创建线条生成器
const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.value));

// 添加线条
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", line);

// 添加数据点
svg.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", d => x(d.date))
  .attr("cy", d => y(d.value))
  .attr("r", 4)
  .attr("fill", "steelblue");

// 添加坐标轴
svg.append("g")
  .attr("transform", \`translate(0,\${height - margin.bottom})\`)
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("transform", \`translate(\${margin.left},0)\`)
  .call(d3.axisLeft(y));`
  }
}; 