import { Graph } from "graphlib";
import { Response } from "./interface/Response";
import { getNext3Nodes, getNodeAtNthStep, getPathSizeUpTo3Steps } from "./mwisExponential";

const memo = new Map<string, Response>();

function mwisStub(graph: Graph, startNode: string, fatherNode: string): Response {
  const memoValue = memo.get(startNode);
  if(memoValue) return memoValue;

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
  
  let greaterSol = mwisStub(graph, secondNode, firstNode);
  let lowerSol = mwisStub(graph, thirdNode, secondNode);

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }
  // a b c d e f g
  const returnValue: Response = {
    value: greaterSol.value + graph.node(startNode),
    nodes: [...greaterSol.nodes, startNode]
  }
  
  memo.set(startNode, {
   ...returnValue
  });
  return returnValue;
}

export default function mwisPD(graph: Graph) {
  memo.clear();
  const firstNode = getNodeAtNthStep(graph, 1, '0', '-');

  let greaterSol = mwisStub(graph, '0', '-');
  let lowerSol = mwisStub(graph, firstNode, '0');

  if(greaterSol.value < lowerSol.value) {
    greaterSol = lowerSol;
  }

  return greaterSol;
}