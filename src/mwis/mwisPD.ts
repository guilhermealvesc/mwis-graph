import { Graph } from "graphlib";
import { Response } from "./interface/Response";
import { getNext3Nodes, getNodeAtNthStep, getPathSizeUpTo3Steps } from "./mwisExponential";

function mwisStub(graph: Graph, startNode: string, fatherNode: string, memo: Map<string, Response>): Response {
  const memoResponse = memo.get(startNode)

  if(memoResponse) {
    return memoResponse;
  }

  const pathSize = getPathSizeUpTo3Steps(graph, startNode, fatherNode);

  const {firstNode, secondNode, thirdNode} = getNext3Nodes(graph, startNode, fatherNode);

  if (pathSize <= 2) {
    const response = {value: graph.node(startNode), nodes: [startNode]} ?? {value: 0, nodes: []}
    memo.set(startNode, response);
    return response;
  }

  if (pathSize === 3) {
    const response = {value: graph.node(startNode) + graph.node(secondNode), nodes: [startNode, secondNode]};
    memo.set(startNode, response);
    return response;
  } 
  
  let greaterSol = mwisStub(graph, secondNode, firstNode, memo);
  let lowerSol = mwisStub(graph, thirdNode, secondNode, memo);

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }
  
  greaterSol.value += graph.node(startNode);
  greaterSol.nodes.push(startNode);
  
  memo.set(startNode, greaterSol);
  return greaterSol;
}

export default function mwisPD(graph: Graph) {
  const memo = new Map<string, Response>();
  const firstNode = getNodeAtNthStep(graph, 1, 'A', '-');

  let greaterSol = mwisStub(graph, 'A', '-', memo);
  let lowerSol = mwisStub(graph, firstNode, 'A', memo);

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }

  return greaterSol;
}