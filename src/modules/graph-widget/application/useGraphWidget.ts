import { onMounted, ref, reactive, watch } from 'vue';
import * as d3 from 'd3';
import type { GraphConfig, GraphNode, GraphLink } from '../domain/GraphConfig';

export function useGraphWidget(initialConfig: GraphConfig) {
  const svgRef = ref<SVGSVGElement | null>(null);

  // Estado reactivo para nodos y links que se puedan cambiar
  const nodes = reactive<GraphNode[]>([...initialConfig.nodes]);
  const links = reactive<GraphLink[]>([...initialConfig.links]);

  // Nodo seleccionado para eliminar o para enlazar
  const selectedNode = ref<GraphNode | null>(null);

  onMounted(() => {
    if (!svgRef.value) return;

    const width = 600;
    const height = 600;

    const svg = d3
      .select(svgRef.value)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', width)
      .attr('height', height);

    function restartSimulation() {
      svg.selectAll('*').remove();

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          'link',
          d3
            .forceLink(
              links.map(l => ({
                ...l,
                source: nodes.find(n => n.id === l.source),
                target: nodes.find(n => n.id === l.target),
              }))
            )
            .id((d: any) => d.id)
            .distance(100)
        )
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2));

      // LINKS
      const link = svg
        .append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(
          links.map(l => ({
            ...l,
            source: nodes.find(n => n.id === l.source),
            target: nodes.find(n => n.id === l.target),
          }))
        )
        .join('line')
        .attr('stroke-width', 2)
        .on('click', (event, d) => {
          event.stopPropagation();
          // Aquí podrías agregar lógica para eliminar links si quieres
          const index = links.indexOf(d);
          if (index > -1) {
            links.splice(index, 1);
            restartSimulation();
          }
        });

      // NODOS
      const node = svg
        .append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', 10)
        .attr('fill', d => d3.schemeCategory10[d.group % 10])
        .style('cursor', 'pointer')
        .on('click', (event, d) => {
          event.stopPropagation();

          // Si no hay nodo seleccionado, seleccionamos este
          if (!selectedNode.value) {
            selectedNode.value = d;
            d3.select(event.currentTarget).attr('stroke', 'black').attr('stroke-width', 3);
          } else if (selectedNode.value === d) {
            // Deseleccionar si clickeas dos veces en el mismo nodo
            selectedNode.value = null;
            d3.select(event.currentTarget).attr('stroke', '#fff').attr('stroke-width', 1.5);
          } else {
            // Ya hay un nodo seleccionado, creamos un link si no existe
            const source = selectedNode.value;
            const target = d;

            const exists = links.some(
              l =>
                (l.source === source.id && l.target === target.id) || (l.source === target.id && l.target === source.id)
            );
            if (!exists) {
              links.push({ source: source.id, target: target.id });
            }

            // Limpiar selección
            selectedNode.value = null;
            // Reiniciar simulación para reflejar cambios
            restartSimulation();
          }
        })
        .call(
          d3
            .drag()
            .on('start', (event, d: any) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d: any) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d: any) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        );

      // LABELS
      const label = svg
        .append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(d => d.id)
        .attr('font-size', 12)
        .attr('dx', 12)
        .attr('dy', '.35em');

      simulation.on('tick', () => {
        link
          .attr('x1', d => (d.source as any).x)
          .attr('y1', d => (d.source as any).y)
          .attr('x2', d => (d.target as any).x)
          .attr('y2', d => (d.target as any).y);

        node.attr('cx', d => (d as any).x).attr('cy', d => (d as any).y);

        label.attr('x', d => (d as any).x).attr('y', d => (d as any).y);
      });
    }

    // Inicializar simulación
    restartSimulation();

    // Agregar nodo nuevo donde se haga click en el SVG
    svg.on('click', event => {
      const [x, y] = d3.pointer(event);
      const newNodeId = `Nodo${nodes.length + 1}`;

      nodes.push({
        id: newNodeId,
        group: Math.floor(Math.random() * 10),
        x,
        y,
      });

      restartSimulation();
    });
  });

  return { svgRef };
}
