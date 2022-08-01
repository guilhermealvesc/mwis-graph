import fs from 'fs';
import { stringify } from 'csv-stringify';

import { performance } from 'perf_hooks';
import { Graph } from 'graphlib';
import mwis from './mwis/mwisExponential';

const randomNumber = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const generateGraph = ():Graph => {
  const graph = new Graph({ directed: false });
  for(let nodeName = 'a'; nodeName !== 'd'; nodeName = String.fromCharCode(nodeName.charCodeAt(0) + 1)) {
    console.log(nodeName);
    graph.setNode(nodeName, randomNumber(0, 10)); // [1, 10]
    graph.setEdge(nodeName, String.fromCharCode(nodeName.charCodeAt(0) + 1));
  }
  return graph;
}


// const graph = generateGraph();
const graph = new Graph({ directed: false });

graph.setNode('a', 1);
graph.setNode('b', 4);
graph.setEdge('a', 'b');
graph.setNode('c', 5);
graph.setEdge('b', 'c');
graph.setNode('d', 4);
graph.setEdge('c', 'd');

console.log(graph.nodes());
console.log(graph.edges());


console.log( mwis(graph));
// stringify(
//   data,
//   {
//     columns: ['', ...sizes.map(size => size.toString())],
//     header: true,
//   },
//   (err, output) => {
//     fs.writeFileSync(__dirname + '/data/data.csv', output);
//   }
// );

// Use CSV in https://charts.livegap.com/app.php?lan=en&gallery=line