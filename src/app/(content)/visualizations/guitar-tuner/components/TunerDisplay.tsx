'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TunerDisplayProps {
  cents: number;
  status: string;
  colorTheme: string;
  themeColors: {
    text: {
      secondary: string;
    };
    display: {
      background: string;
      border: string;
    };
    card: {
      background: string;
      border: string;
    };
  };
}

export default function TunerDisplay({ cents, status, themeColors }: TunerDisplayProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // 更新LED位置 - 优化动画效果
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const margin = { left: 30, right: 30 };
    
    // 缩小移动范围
    const xScale = d3.scaleLinear()
      .domain([-50, 50])
      .range([margin.left, width - margin.right]);

    // 限制移动范围
    const clampedCents = Math.max(-50, Math.min(50, cents));
    
    // 使用easeOut缓动效果，减少动画时间
    d3.select(svgRef.current)
      .select('.active-led-group')
      .transition()
      .duration(50)
      .ease(d3.easeQuad)
      .attr('transform', `translate(${xScale(clampedCents)}, ${svgRef.current.clientHeight/2})`);

    // 更新LED颜色和亮度
    const isPerfect = Math.abs(clampedCents) < 5;
    d3.select(svgRef.current)
      .selectAll('.active-led-group circle')
      .transition()
      .duration(50)
      .attr('fill', isPerfect ? '#22C55E' : '#EF4444')
      .style('opacity', isPerfect ? 1 : 0.8);

  }, [cents]);

  // 初始化D3
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 10, right: 30, bottom: 10, left: 30 };

    // 创建SVG
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    // 清除已有内容
    svg.selectAll('*').remove();

    // 创建比例尺
    const xScale = d3.scaleLinear()
      .domain([-50, 50])
      .range([margin.left, width - margin.right]);

    // 添加发光效果滤镜
    const defs = svg.append('defs');
    
    // 暗光效果
    const darkGlow = defs.append('filter')
      .attr('id', 'darkGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    darkGlow.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');

    const darkMerge = darkGlow.append('feMerge');
    darkMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    darkMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // 亮光效果
    const brightGlow = defs.append('filter')
      .attr('id', 'brightGlow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    brightGlow.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');

    const brightMerge = brightGlow.append('feMerge');
    brightMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    brightMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // 创建LED点阵
    const ledPoints = d3.range(-50, 51, 5);
    
    // 添加背景LED点（暗色）
    svg.selectAll('.led-point-bg')
      .data(ledPoints)
      .enter()
      .append('circle')
      .attr('class', 'led-point-bg')
      .attr('cx', d => xScale(d))
      .attr('cy', height/2)
      .attr('r', 2.5)
      .attr('fill', d => d === 0 ? '#FFFFFF' : '#4B5563')
      .attr('opacity', d => d === 0 ? 0.8 : 0.4)
      .attr('filter', 'url(#darkGlow)');

    // 创建激活的LED点组
    const activeLedGroup = svg.append('g')
      .attr('class', 'active-led-group')
      .attr('transform', `translate(${xScale(0)}, ${height/2})`);

    // 添加激活的LED点
    const activeLedRadius = 3;
    const ledSpacing = 6;
    
    [-1, 0, 1].forEach((offset, i) => {
      activeLedGroup.append('circle')
        .attr('class', `active-led-${i}`)
        .attr('cx', offset * ledSpacing)
        .attr('cy', 0)
        .attr('r', activeLedRadius)
        .attr('fill', '#EF4444')
        .attr('opacity', 0.9)
        .attr('filter', 'url(#brightGlow)');
    });

  }, []);

  return (
    <div className={`${themeColors.card.background} p-6 rounded-xl border ${themeColors.card.border} shadow-lg backdrop-blur-sm
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`${themeColors.text.secondary} text-sm font-mono tracking-wider`}>TUNER DISPLAY</div>
        <div className={`text-sm ${themeColors.text.secondary} font-mono`}>{status || '--'}</div>
      </div>
      
      {/* 表盘显示区 */}
      <div className={`relative h-24 ${themeColors.display.background} rounded-lg border ${themeColors.display.border} overflow-hidden`}>
        <div className="absolute inset-0">
          <svg ref={svgRef} className="w-full h-full" style={{ background: 'transparent' }} />
        </div>
      </div>
    </div>
  );
} 