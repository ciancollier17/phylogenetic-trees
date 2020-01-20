/// neighbourJoining (distanceMatrix)
/// Implementation of the neighbour joining algorithm
/// takes a distance matrix as an argument. Returns a
/// rooted tree.

const DistanceMatrix = require('./DistanceMatrix');
const Tree = require('./Tree');

function neighbourJoining (distanceMatrix) {
  let mergeNum = 0;
  let sequences = distanceMatrix.sequences;
  let leaves = sequences.map(seq => {
    return [seq[0], 0];
  });
  let tree = new Tree(leaves);

  while(sequences.length > 3) {
    // Generate Q matrix and select minimum value
    let Q = distanceMatrix.generateQMatrix();
    let minimum = Q.min();
    let f = minimum[0];
    let g = minimum[1];

    console.log(minimum);

    // Calculate length  of branches to new node
    let branchLengthF = 0.5 * distanceMatrix.get(f, g) + ((1 / (2 * (sequences.length - 2))) * (distanceMatrix.sum(f) - distanceMatrix.sum(g)));
    let branchLengthG = distanceMatrix.get(f, g) - branchLengthF;

    // Update the distance matrix with the new node
    distanceMatrix.add([mergeNum.toString(), ""], (s1, s2, n1, n2) => {
      if (n1 == n2) {
        return 0;
      }

      let k = n1 == mergeNum.toString() ? n2 : n1;
      let dfk = distanceMatrix.get(f, k);
      let dgk = distanceMatrix.get(g, k);
      let dfg = distanceMatrix.get(f, g);

      return 0.5 * (dfk + dgk - dfg);
    });

    distanceMatrix.remove(f);
    distanceMatrix.remove(g);

    // Update the tree
    tree.mergeNodes(f, g, mergeNum.toString(), 1, branchLengthF, branchLengthG);
    mergeNum++;
  }

  let a = tree.root.children[0];
  let b = tree.root.children[1];
  let c = tree.root.children[2];

  a.branchLength = 0.5 * distanceMatrix.get(a.name, b.name) + 0.5 * (distanceMatrix.sum(a.name) - distanceMatrix.sum(b.name));
  b.branchLength = distanceMatrix.get(a.name, b.name) - a.branchLength;
  c.branchLength = distanceMatrix.get(a.name, c.name) - a.branchLength;

  return tree;
}

module.exports = neighbourJoining;
