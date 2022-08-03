import fs from 'fs';
import { stringify } from 'csv-stringify';

import { performance } from 'perf_hooks';
import { Graph } from 'graphlib';
import mwis from './mwis/mwisExponential';
import mwisPD from './mwis/mwisPD';

const randomNumber = (min: number, max: number): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const generateGraph = (graphSize: number):Graph => {
  const graph = new Graph({ directed: false });

  for(let i = 0; i < graphSize; i++) {
    graph.setNode(i.toString(), randomNumber(0, 10)); // [1, 10]
    if(i !== graphSize - 1)
      graph.setEdge(i.toString(), (i + 1).toString());
  }
  return graph;
}

// graph.nodes().map(node => console.log(node, graph.node(node)))

const data: string[][] = [['Exponencial'],['Programação dinâmica']];
const sizes: number[] = [];
for (let index = 10; index <= 50; index++) {
  const graph = generateGraph(index);
  
  let startTime, endTime;
  
  startTime = performance.now()
  mwis(graph);
  endTime = performance.now();
  const timeExp = ((endTime - startTime) / 1000).toFixed(4);
  data[0].push(timeExp.toString());
  
  startTime = performance.now()
  mwisPD(graph);
  endTime = performance.now();
  const timePD = ((endTime - startTime) / 1000).toFixed(4);
  data[1].push(timePD.toString());

  sizes.push(index);
}





stringify(
  data,
  {
    columns: ['', ...sizes.map(size => size.toString())],
    header: true,
  },
  (err, output) => {
    fs.writeFileSync(__dirname + '/data/data2.csv', output);
  }
);

// Use CSV in https://charts.livegap.com/app.php?lan=en&gallery=line