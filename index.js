const DistanceMatrix = require('./DistanceMatrix');
const loadFASTA = require('./loadFASTA');

const dm = new DistanceMatrix([
  ["Seq1", "ATATATAT"],
  ["Seq2", "CGCGCGCG"],
  ["Seq3", "ATATATAT"],
  ["Seq4", "A-ATTTTT"]]);

console.log(dm.get("Seq3", "Seq4"));
console.log(dm.get("Seq2", "Seq2"));
