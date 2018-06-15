// perra bida

const graph = {
  UNO: {A: 1, B: 9, C: 14},
  DOS: {B: 10, D:15},
  TRES: {C: 2, D: 11},
  SEIS: {finish: 9},
  CUATRO: {finish: 6},
  CINCO: {}
};

const costs = {
  A: 1,
  B: 9,
  C: 14,
  finish: Infinity 
};

const parents = {
  A: 'start',
  B: 'start',
  C: 'start',
  finish: null
};

const processed = ["start", "A", "B", "C"];

console.log(costs)

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

const sutra = (graph) => {
  const costs = Object.assign({finish: Infinity}, graph.start);
  const parents = {finish: null};

  for (let child in graph.start) { // add children of start node
    parents[child] = 'start';
  }

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
