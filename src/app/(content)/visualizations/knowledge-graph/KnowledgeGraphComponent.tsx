'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { Concept } from '@/types/notion';
import styles from './KnowledgeGraph.module.css';
// 添加视图类型枚举
type ViewType = 'default' | 'courseware';

interface Node {
  id: string;
  name: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  color?: string;
  courseware?: string[];
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
  const loadingRef = useRef(false);

  const loadConcepts = useCallback(async () => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);
      const data = await fetch('/api/notion/concepts').then(res => res.json());
      setConcepts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch concepts'));
      console.error('Failed to fetch concepts:', err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (concepts.length === 0) {
      loadConcepts();
    }
  }, [loadConcepts, concepts.length]);

  return { concepts, loading, error, refetch: loadConcepts };
};


// 将主要组件逻辑移到内部组件
export default function KnowledgeGraphComponent() {
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined> | null>(null);
  const tooltipRef = useRef<d3.Selection<HTMLDivElement, unknown, HTMLElement, undefined> | null>(null);
  const { concepts, loading, error } = useConcepts();
  const [viewType, setViewType] = useState<ViewType>('default');

  // 准备节点和连接线数据
  const { nodes, links } = useMemo(() => {
    const nodes: Node[] = concepts.map(concept => ({
      id: concept.id,
      name: concept.title,
      courseware: concept.relatedCourseware && concept.relatedCourseware.length > 0 
                    ? concept.relatedCourseware 
                    : ['未分类']
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

  // 生成课程颜色映射
  const coursewareColors = useMemo(() => {
    const uniqueCoursewares = Array.from(new Set(
      concepts.flatMap(c => 
        c.relatedCourseware && c.relatedCourseware.length > 0 
          ? c.relatedCourseware 
          : ['未分类']
      )
    ));
    const colorScale = d3.scaleOrdinal<string, string>(d3.schemeCategory10);
    return Object.fromEntries(
      uniqueCoursewares.map((courseware, index) => [courseware, colorScale(index.toString())])
    );
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
      .attr('class', styles.tooltip);

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
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    const g = svg.append('g');

    // 创建力导向图
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulationRef.current = simulation;

    // 绘制连接线
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (l: Link) => {
        if (viewType === 'courseware') {
          const sourceNode = nodes.find(n => n.id === (l.source as Node).id);
          const targetNode = nodes.find(n => n.id === (l.target as Node).id);
          if (!sourceNode || !targetNode) {
            return 'var(--course-link-color)';
          }
          const sourceCourses = sourceNode.courseware && sourceNode.courseware.length > 0 ? sourceNode.courseware : ['未分类'];
          const targetCourses = targetNode.courseware && targetNode.courseware.length > 0 ? targetNode.courseware : ['未分类'];
          const commonCourses = sourceCourses.filter(c => targetCourses.includes(c));
          let baseColorStr: string | null = null;
          if (commonCourses.length > 0) {
            baseColorStr = coursewareColors[commonCourses[0]];
          } else {
            const sourceColor1 = d3.color(coursewareColors[sourceCourses[0]]);
            const targetColor1 = d3.color(coursewareColors[targetCourses[0]]);
            if (sourceColor1 && targetColor1) {
              baseColorStr = d3.interpolateRgb(sourceColor1, targetColor1)(0.5).toString();
            } else {
              baseColorStr = sourceColor1?.toString() || targetColor1?.toString() || 'var(--course-link-color)';
            }
          }
          const finalColor = d3.color(baseColorStr || 'var(--course-link-color)');
          return finalColor ? finalColor.copy({ opacity: 0.2 }).toString() : 'var(--course-link-color)';
        }
        return 'var(--link-color)';
      })
      .attr('stroke-opacity', 0.2)
      .attr('stroke-width', 1);

    // 绘制节点
    const node = g.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 12)
      .attr('fill', d => {
        if (viewType !== 'courseware') {
          return 'var(--node-color)';
        }
        const courses = d.courseware && d.courseware.length > 0 ? d.courseware : ['未分类'];
        if (courses.length === 1) {
          return coursewareColors[courses[0]];
        }
        const color1 = d3.color(coursewareColors[courses[0]]);
        const color2 = d3.color(coursewareColors[courses[1]]);
        if (color1 && color2) {
          return d3.interpolateRgb(color1, color2)(0.5).toString();
        } 
        return color1?.toString() || coursewareColors['未分类'];
      })
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
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
          .attr('fill', 'var(--node-hover-color)');

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
          .attr('fill', 'var(--node-highlight-color)');

        // 高亮相连的连接线
        link
          .filter(l => 
            (l.source as Node).id === currentNode.id || 
            (l.target as Node).id === currentNode.id
          )
          .transition()
          .duration(200)
          .attr('stroke', 'var(--link-highlight-color)')
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.6);

        // 淡化未连接的节点
        node
          .filter(n => {
            const isConnected = links.some(l => 
              (l.source as Node).id === currentNode.id && (l.target as Node).id === n.id ||
              (l.target as Node).id === currentNode.id && (l.source as Node).id === n.id
            );
            return !isConnected && n.id !== currentNode.id;
          })
          .transition()
          .duration(200)
          .attr('r', 8)
          .attr('fill-opacity', 0.3);

        // 淡化未连接的连接线
        link
          .filter(l => 
            (l.source as Node).id !== currentNode.id && 
            (l.target as Node).id !== currentNode.id
          )
          .transition()
          .duration(200)
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.05);

        // 显示 tooltip
        const concept = concepts.find(c => c.id === currentNode.id);
        if (concept) {
          tooltip
            .style('opacity', 1)
            .html(`
              <div class="${styles.tooltipTitle}">${concept.title}</div>
              <div class="${styles.tooltipDescription}">${concept.description || '暂无描述'}</div>
              <a href="${concept.publicUrl}" target="_blank" class="${styles.tooltipLink}">
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
          .attr('fill', d => {
            if (viewType !== 'courseware') {
              return 'var(--node-color)';
            }
            const courses = d.courseware && d.courseware.length > 0 ? d.courseware : ['未分类'];
            if (courses.length === 1) {
              return coursewareColors[courses[0]];
            }
            const color1 = d3.color(coursewareColors[courses[0]]);
            const color2 = d3.color(coursewareColors[courses[1]]);
            if (color1 && color2) {
              return d3.interpolateRgb(color1, color2)(0.5).toString();
            } 
            return color1?.toString() || coursewareColors['未分类'];
          })
          .attr('fill-opacity', null);

        link
          .transition()
          .duration(200)
          .attr('stroke', (l: Link) => {
            if (viewType === 'courseware') {
              const sourceNode = nodes.find(n => n.id === (l.source as Node).id);
              const targetNode = nodes.find(n => n.id === (l.target as Node).id);
              if (!sourceNode || !targetNode) {
                return 'var(--course-link-color)';
              }
              const sourceCourses = sourceNode.courseware && sourceNode.courseware.length > 0 ? sourceNode.courseware : ['未分类'];
              const targetCourses = targetNode.courseware && targetNode.courseware.length > 0 ? targetNode.courseware : ['未分类'];
              const commonCourses = sourceCourses.filter(c => targetCourses.includes(c));
              let baseColorStr: string | null = null;
              if (commonCourses.length > 0) {
                baseColorStr = coursewareColors[commonCourses[0]];
              } else {
                const sourceColor1 = d3.color(coursewareColors[sourceCourses[0]]);
                const targetColor1 = d3.color(coursewareColors[targetCourses[0]]);
                if (sourceColor1 && targetColor1) {
                  baseColorStr = d3.interpolateRgb(sourceColor1, targetColor1)(0.5).toString();
                } else {
                  baseColorStr = sourceColor1?.toString() || targetColor1?.toString() || 'var(--course-link-color)';
                }
              }
              const finalColor = d3.color(baseColorStr || 'var(--course-link-color)');
              return finalColor ? finalColor.toString() : 'var(--course-link-color)';
            }
            return 'var(--link-color)';
          })
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
      .attr('fill', 'var(--text-color)')
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
  }, [concepts, viewType, coursewareColors]);

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
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="border rounded-lg p-4 bg-white h-[600px] flex items-center justify-center">
          <div className="text-red-500">Failed to load: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className={styles.tabs}>
        <button
          onClick={() => setViewType('default')}
          className={`${styles.tab} ${viewType === 'default' ? styles.tabActive : ''}`}
        >
          <span className={styles.tabIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            </svg>
          </span>
          默认视图
        </button>
        <button
          onClick={() => setViewType('courseware')}
          className={`${styles.tab} ${viewType === 'courseware' ? styles.tabActive : ''}`}
        >
          <span className={styles.tabIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
              <path d="M12 4v16" />
            </svg>
          </span>
          课程分组视图
        </button>
      </div>
      <div 
        ref={containerRef}
        id="graph-container" 
        className="border rounded-lg p-4 bg-white dark:bg-gray-900 h-[calc(100vh-200px)]"
      ></div>
    </div>
  );
}