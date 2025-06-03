import type { GraphLink } from './GraphLink';
import type { GraphNode } from './GraphNode';

export interface GraphConfig {
  title: string;
  nodes: GraphNode[];
  links: GraphLink[];
}
