'use client';

import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getI18nText } from '@/i18n';
import * as d3 from 'd3';

export interface HelloWorldContent {
  clickMe: string;
  animating: string;
  clicks: string;
  title: string;
}

export default function HelloWorldPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { language } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const animationRef = useRef<number | null>(null);

  // 获取当前语言的文本
  const content = getI18nText(language, 'visualizations.helloworld.content') as HelloWorldContent;

  useEffect(() => {
    if (!svgRef.current) return;

    // 清除之前的 SVG 内容
    d3.select(svgRef.current).selectAll("*").remove();

    // 设置 SVG 尺寸
    const width = 800;
    const height = 400;

    // 创建 SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // 创建渐变
    const gradient = svg.append('defs')
      .append('radialGradient')
      .attr('id', 'circleGradient');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#6366f1');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#4f46e5');

    // 创建圆形
    const circle = svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 50)
      .style('fill', 'url(#circleGradient)')
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))');

    // 创建文本
    const text = svg.append('text')
      .text(content.clickMe)
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('font-family', 'Arial')
      .style('fill', '#ffffff')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('pointer-events', 'none')
      .attr('x', width / 2)
      .attr('y', height / 2);

    // 添加点击次数文本
    const countText = svg.append('text')
      .text(content.clicks + clickCount)
      .style('font-size', '18px')
      .style('font-family', 'Arial')
      .style('fill', '#4f46e5')
      .style('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height - 30);

    // 创建光晕效果
    const glowCircle = svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 50)
      .style('fill', 'none')
      .style('stroke', '#4f46e5')
      .style('stroke-width', 2)
      .style('opacity', 0)
      .style('pointer-events', 'none');

    // 添加交互效果
    circle.on('click', function() {
      // 清除之前的动画
      const currentAnimation = animationRef.current;
      if (currentAnimation) {
        window.cancelAnimationFrame(currentAnimation);
      }

      setClickCount(prev => prev + 1);

      // 随机生成目标颜色
      const targetColor = d3.rgb(
        Math.random() * 155 + 100,
        Math.random() * 155 + 100,
        Math.random() * 155 + 100
      );

      // 更新渐变颜色
      gradient.selectAll('stop')
        .transition()
        .duration(200)
        .attr('stop-color', targetColor.toString());

      // 圆形动画
      circle.transition()
        .duration(200)
        .ease(d3.easeCubicOut)
        .attr('r', 70)
        .transition()
        .duration(200)
        .ease(d3.easeCubicIn)
        .attr('r', 50)
        .on('end', () => {
          // 重置渐变颜色
          gradient.selectAll('stop')
            .transition()
            .duration(200)
            .attr('stop-color', (d, i) => i === 0 ? '#6366f1' : '#4f46e5');
        });

      // 文字动画
      text.transition()
        .duration(200)
        .style('font-size', '20px')
        .text(content.animating)
        .transition()
        .duration(200)
        .style('font-size', '24px')
        .text(content.clickMe);

      // 更新点击次数
      countText.text(content.clicks + (clickCount + 1))
        .style('opacity', 0)
        .transition()
        .duration(100)
        .style('opacity', 1);

      // 光晕效果
      glowCircle
        .attr('r', 50)
        .style('opacity', 0.5)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('r', 65)
        .style('opacity', 0)
        .on('end', function() {
          d3.select(this).attr('r', 50);
        });
    });

    // 添加鼠标悬停效果
    circle.on('mouseover', function() {
      // 圆形悬停效果
      d3.select(this)
        .transition()
        .duration(100)
        .ease(d3.easeQuadOut)
        .attr('r', 55);

      // 光晕效果
      glowCircle
        .attr('r', 50)
        .style('opacity', 0.5)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('r', 65)
        .style('opacity', 0)
        .on('end', function() {
          d3.select(this).attr('r', 50);
        });
    })
    .on('mouseout', function() {
      d3.select(this)
        .transition()
        .duration(100)
        .ease(d3.easeQuadIn)
        .attr('r', 50);

      glowCircle
        .transition()
        .duration(100)
        .style('opacity', 0);
    });

    // 在 effect 内部捕获当前的 ref 值
    const currentAnimationRef = animationRef.current;

    return () => {
      if (currentAnimationRef) {
        window.cancelAnimationFrame(currentAnimationRef);
      }
    };
  }, [language, clickCount, content]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
    </div>
  );
}

