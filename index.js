const DistanceMatrix = require('./DistanceMatrix');
const loadFASTA = require('./loadFASTA');

let sequences = [];

loadFASTA('./testFASTAS/test4.fasta').then(data => {
  sequences = data;
  let dm = new DistanceMatrix(sequences);
  console.log(dm.get("NC_002546.1:6871-8403 Fasciola hepatica mitochondrion, complete genome", "NC_012920.1:5904-7445 Homo sapiens mitochondrion, complete genome"));
  console.log(dm.get("NC_012920.1:5904-7445 Homo sapiens mitochondrion, complete genome", "NC_001643.1:5321-6862 Pan troglodytes mitochondrion, complete genome"));
  console.log(dm.get("NC_001643.1:5321-6862 Pan troglodytes mitochondrion, complete genome", "NC_012920.1:5904-7445 Homo sapiens mitochondrion, complete genome"))
});
