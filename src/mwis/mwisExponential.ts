import { Graph } from "graphlib";
import { Response } from "./interface/Response";

export function getPathSizeUpTo3Steps(graph: Graph, startNode: string, fatherNode: string): number {
  let i;
  for(i = 1; i <= 3; i++) {
    const neighbors = graph.neighbors(startNode) ?? [];
    const neighborsWithoutFather = neighbors?.filter(node => node != fatherNode);
    if(neighborsWithoutFather?.length > 0) {
      fatherNode = startNode;
      startNode = neighborsWithoutFather[0];
    } else return i;
  }

  return Infinity;
}

export function getNodeAtNthStep(graph: Graph, steps: number, startNode: string, fatherNode: string): string {
  for(let i = 0; i < steps; i++) {
    const neighbors = graph.neighbors(startNode) ?? [];
    const neighborsWithoutFather = neighbors.filter(node => node !== fatherNode);
    if(neighborsWithoutFather.length !== 0) {
      fatherNode = startNode;
      startNode = neighborsWithoutFather[0];
    } else return startNode;
    
  }
  return startNode;
}

export function getNext3Nodes(graph: Graph, startNode: string, fatherNode: string) {
  return {
    firstNode: getNodeAtNthStep(graph, 1, startNode, fatherNode),
    secondNode: getNodeAtNthStep(graph, 2, startNode, fatherNode),
    thirdNode: getNodeAtNthStep(graph, 3, startNode, fatherNode),
  }
}
function mwisStub(graph: Graph, startNode: string, fatherNode: string): Response {

  const pathSize = getPathSizeUpTo3Steps(graph, startNode, fatherNode);

  const {firstNode, secondNode, thirdNode} = getNext3Nodes(graph, startNode, fatherNode);

  if (pathSize <= 2) return {value: graph.node(startNode), nodes: [startNode]} ?? {value: 0, nodes: []};
  if (pathSize === 3) return {value: graph.node(startNode) + graph.node(secondNode), nodes: [startNode, secondNode]};
  
  let greaterSol = mwisStub(graph, secondNode, firstNode);
  let lowerSol = mwisStub(graph, thirdNode, secondNode);

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }

  greaterSol.value += graph.node(startNode);
  greaterSol.nodes.push(startNode);

  return greaterSol;
}

export default function mwis(graph: Graph) {
  const firstNode = getNodeAtNthStep(graph, 1, '0', '-');

  let greaterSol = mwisStub(graph, '0', '-')
  let lowerSol = mwisStub(graph, firstNode, '0')

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }

  return greaterSol;
}