// perra bida

const problem = {
  start: {A: 1, B: 9, C: 14},
  A: {B: 10, D: 15},
  B: {C: 2, D: 11},
  C: {finish: 9},
  D: {finish: 6},
  finish: {}
};

const lowestCostNode = (costs, processed)  => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

// function that returns the minimum cost and path to reach Finish
const sutra = (graph) => {
  
  // track paths
  const costs = Object.assign({finish: Infinity}, graph.start);
  const parents = {finish: null};
  for (let child in graph.start) { // add children of start node
    parents[child] = 'start';
  }

  // track nodes that have already been processed
  const processed = [];
  
  let node = lowestCostNode(costs, processed);
  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse(); // reverse array to get correct order

  const results = {
    distance: costs.finish,
    path: optimalPath
  };

  return results;
}; // end of function

console.log(sutra(problem));
