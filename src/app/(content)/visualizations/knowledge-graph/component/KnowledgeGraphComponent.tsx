'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { Concept } from '../types';
import { fetchConcepts } from '../notionService';
import './styles.css';  // 导入样式文件

interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
}

// 自定义hook用于获取和缓存concepts数据
const useConcepts = () => {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadConcepts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchConcepts();
      setConcepts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch concepts'));
      console.error('Failed to fetch concepts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConcepts();
  }, [loadConcepts]);

  return { concepts, loading, error, refetch: loadConcepts };
};

export default function KnowledgeGraphComponent() {
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined> | null>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, undefined> | null>(null);
  const { concepts, loading, error } = useConcepts();

  // 准备节点和连接线数据
  const { nodes, links } = useMemo(() => {
    const nodes: Node[] = concepts.map(concept => ({
      id: concept.id,
      name: concept.title
    }));

    const links: Link[] = [];
    concepts.forEach(concept => {
      if (concept.relatedConcepts) {
        concept.relatedConcepts.forEach((relatedId: string) => {
          links.push({
            source: concept.id,
            target: relatedId
          });
        });
      }
    });

    return { nodes, links };
  }, [concepts]);

  // 获取容器尺寸的函数
  const getContainerSize = useCallback(() => {
    if (!containerRef.current) return { width: 800, height: 600 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      width: rect.width - 32,
      height: rect.height - 32
    };
  }, []);

  // 初始化图表
  const initializeGraph = useCallback(() => {
    if (!containerRef.current) return;

    // 清除现有的SVG
    d3.select('#graph-container svg').remove();

    // 获取容器尺寸
    const { width, height } = getContainerSize();

    // 创建SVG
    svgRef.current = d3.select('#graph-container')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height]);

    // 创建 tooltip div
    tooltipRef.current = d3.select('#graph-container')
      .append('div')
      .attr('class', 'graph-tooltip');

    return { width, height };
  }, [getContainerSize]);

  // 更新图表数据
  const updateGraph = useCallback((nodes: Node[], links: Link[]) => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = svgRef.current;
    const tooltip = tooltipRef.current;

    // 清除现有的元素
    svg.selectAll('*').remove();

    // 获取 SVG 尺寸
    const viewBox = svg.attr('viewBox')?.split(' ').map(Number);
    const width = viewBox?.[2] || 800;
    const height = viewBox?.[3] || 600;

    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4]) // 设置缩放范围
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // 应用缩放行为到 SVG
    svg.call(zoom);

    // 创建一个容器组来包含所有元素
    const g = svg.append('g');

    // 创建力导向图
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // 保存simulation引用
    simulationRef.current = simulation;

    // 绘制连接线
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#a8a29e')
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', 1);

    // 绘制节点
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .attr('fill', '#6b7280')  // 使用统一的灰色
      .style('cursor', 'pointer')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
        const concept = concepts.find(c => c.id === d.id);
        if (concept) {
          window.open(concept.publicUrl, '_blank');
        }
      })
      .on('mouseover', function(event, d) {
        const currentNode = d as Node;
        
        // 高亮当前节点
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 16)
          .attr('fill', '#059669');

        // 高亮相连的节点
        node
          .filter(n => {
            const isConnected = links.some(l => 
              (l.source as Node).id === currentNode.id && (l.target as Node).id === n.id ||
              (l.target as Node).id === currentNode.id && (l.source as Node).id === n.id
            );
            return isConnected;
          })
          .transition()
          .duration(200)
          .attr('r', 14)
          .attr('fill', '#10b981');

        // 高亮相连的连接线
        link
          .filter(l => 
            (l.source as Node).id === currentNode.id || 
            (l.target as Node).id === currentNode.id
          )
          .transition()
          .duration(200)
          .attr('stroke', '#059669')
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4);

        // 淡化其他元素
        node
          .filter(n => n.id !== currentNode.id)
          .filter(n => !links.some(l => 
            (l.source as Node).id === currentNode.id && (l.target as Node).id === n.id ||
            (l.target as Node).id === currentNode.id && (l.source as Node).id === n.id
          ))
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('fill', '#d1fae5');

        link
          .filter(l => 
            (l.source as Node).id !== currentNode.id && 
            (l.target as Node).id !== currentNode.id
          )
          .transition()
          .duration(200)
          .attr('stroke', '#e5e7eb')
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.1);

        // 显示 tooltip
        const concept = concepts.find(c => c.id === currentNode.id);
        if (concept) {
          tooltip
            .style('opacity', 1)
            .html(`
              <div class="graph-tooltip-title">${concept.title}</div>
              <div class="graph-tooltip-description">${concept.description || '暂无描述'}</div>
              <a href="${concept.publicUrl}" target="_blank" class="graph-tooltip-link">
                在 Notion 中查看 →
              </a>
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px');
        }
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseleave', function() {
        // 恢复所有元素的默认样式
        node
          .transition()
          .duration(200)
          .attr('r', 12)
          .attr('fill', '#6b7280');  // 恢复统一的灰色

        link
          .transition()
          .duration(200)
          .attr('stroke', '#a8a29e')
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.2);

        // 隐藏 tooltip
        tooltip.style('opacity', 0);
      });

    // 添加节点标签
    const labels = g.append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text(d => d.name)
      .attr('font-size', '12px')
      .attr('dx', 20)
      .attr('dy', 4)
      .attr('fill', '#4b5563')
      .attr('pointer-events', 'none')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        // 找到对应的 concept
        const concept = concepts.find(c => c.id === d.id);
        if (concept) {
          window.open(concept.publicUrl, '_blank');
        }
      });

    // 更新力导向图
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x ?? 0)
        .attr('y1', d => (d.source as Node).y ?? 0)
        .attr('x2', d => (d.target as Node).x ?? 0)
        .attr('y2', d => (d.target as Node).y ?? 0);

      node
        .attr('cx', d => d.x ?? 0)
        .attr('cy', d => d.y ?? 0);

      labels
        .attr('x', d => d.x ?? 0)
        .attr('y', d => d.y ?? 0);
    });

    // 拖拽函数
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      const subject = event.subject as Node;
      subject.fx = subject.x ?? 0;
      subject.fy = subject.y ?? 0;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
      const subject = event.subject as Node;
      subject.fx = event.x;
      subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, Node, unknown>) {
      if (!event.active) simulation.alphaTarget(0);
      const subject = event.subject as Node;
      subject.fx = null;
      subject.fy = null;
    }
  }, [concepts]);

  // 初始化图表和更新数据
  useEffect(() => {
    if (loading || concepts.length === 0) return;

    // 初始化图表
    initializeGraph();

    // 更新图表数据
    updateGraph(nodes, links);

    // 清理函数
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
        simulationRef.current = null;
      }
    };
  }, [concepts, loading, nodes, links, initializeGraph, updateGraph]);

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (simulationRef.current && svgRef.current) {
        const { width, height } = getContainerSize();
        simulationRef.current.force('center', d3.forceCenter(width / 2, height / 2));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getContainerSize]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="border rounded-lg p-4 bg-white h-[600px] flex items-center justify-center">
          <div className="text-gray-500">加载中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="border rounded-lg p-4 bg-white h-[600px] flex items-center justify-center">
          <div className="text-red-500">加载失败: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div 
        ref={containerRef}
        id="graph-container" 
        className="border rounded-lg p-4 bg-white h-[calc(100vh-200px)]"
      ></div>
    </div>
  );
} 