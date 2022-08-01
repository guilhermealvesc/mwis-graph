import { Graph } from "graphlib";

function getPathSizeUpTo3Steps(graph: Graph, startNode: string, fatherNode: string): number {
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

function getNodeAtNthStep(graph: Graph, steps: number, startNode: string, fatherNode: string): string {
  for(let i = 0; i < steps; i++) {
    const neighbors = graph.neighbors(startNode) ?? [];
    const neighborsWithoutFather = neighbors.filter(node => node != fatherNode);
    if(neighborsWithoutFather.length !== 0) {
      fatherNode = startNode;
      startNode = neighborsWithoutFather[0];
    } else return startNode;
    
  }
  return startNode;
}

function mwisStub(graph: Graph, startNode: string, fatherNode: string): number {
  const pathSize = getPathSizeUpTo3Steps(graph, startNode, fatherNode);
  const nodeAtSecondPositionFromStartNode = getNodeAtNthStep(graph, 2, startNode, fatherNode);
  const nodeAtThirdPositionFromStartNode = getNodeAtNthStep(graph, 3, startNode, fatherNode);
  
  
  if (pathSize <= 2) return graph.node(startNode) ?? 0;
  if (pathSize == 3) return graph.node(startNode) + graph.node(nodeAtSecondPositionFromStartNode);
  
  const sol1 = mwisStub(graph, nodeAtSecondPositionFromStartNode, startNode);
  const sol2 = mwisStub(graph, nodeAtThirdPositionFromStartNode, startNode);

  return graph.node(startNode) + Math.max(sol1, sol2);

}

export default function mwis(graph: Graph) {
  return Math.max(mwisStub(graph, 'a', '-'), mwisStub(graph, 'b', '-'));
}