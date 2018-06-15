// perra bida

const problem = {
  UNO: {A: 1, B: 9, C: 14},
  A: {B: 10, D: 15},
  B: {C: 2, D: 11},
  C: {CINCO: 9},
  D: {CINCO: 6},
  CINCO: {}
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

// function that returns the minimum cost and path to reach el CINCO
const sutra = (graph) => {
  
  // track paths
  const costs = Object.assign({CINCO: Infinity}, graph.UNO);
  const parents = {CINCO: null};
  for (let child in graph.UNO) { // add children of UNO node
    parents[child] = 'UNO';
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

  let optimalPath = ['CINCO'];
  let parent = parents.CINCO;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse(); // reverse array to get correct order

  const results = {
    distance: costs.CINCO,
    path: optimalPath
  };

  return results;
}; // end of function

console.log(sutra(problem));
