import fs from 'fs';
import { stringify } from 'csv-stringify';

import { performance } from 'perf_hooks';
import { Graph } from 'graphlib';
import mwis from './mwis/mwisExponential';
import mwisPD from './mwis/mwisPD';

const randomNumber = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const generateGraph = ():Graph => {
  const graph = new Graph({ directed: false });

  const upToChar = 'a'
  for(let nodeName = 'A'; nodeName !== upToChar; nodeName = String.fromCharCode(nodeName.charCodeAt(0) + 1)) {
    graph.setNode(nodeName, randomNumber(0, 10)); // [1, 10]
    
    if(String.fromCharCode(nodeName.charCodeAt(0) + 1) !== upToChar)
      graph.setEdge(nodeName, String.fromCharCode(nodeName.charCodeAt(0) + 1));
  }
  return graph;
}


const graph = generateGraph();

graph.nodes().map(node => console.log(node, graph.node(node)))

console.log(mwisPD(graph));
console.log(mwis(graph));

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