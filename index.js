const fs = require('fs');
const DistanceMatrix = require('./DistanceMatrix');
const loadFASTA = require('./loadFASTA');
const Tree = require('./Tree.js');

if (!process.argv[2]) {
  throw new Error("ERROR: Please enter an input FASTA file");
}

if (!process.argv[3]) {
  throw new Error("ERROR: Please enter an output NWK file");
}

if (!process.argv[4]) {
  throw new Error("ERROR: Please enter an outgroup.")
}

console.log(process.argv[2]);

let input = [];
loadFASTA(process.argv[2]).then(data => {
  input = data;

  let distanceMatrix = new DistanceMatrix(input);
  let tree = distanceMatrix.neighbourJoining();
  tree.reroot(process.argv[4]);

  fs.writeFile(process.argv[3], tree.toNewick(), err => {
    if (err) {
      console.log("ERROR: Could not write output file");      
    }
  });
}).catch(e => {
  console.log("ERROR: Input file could not be opened");
});
