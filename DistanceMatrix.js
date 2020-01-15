/// DistanceMatrix
/// Object which represents a distance matrix.
/// Constructor takes an array of sequences as
/// strings.

const Matrix = require('./Matrix');
const calculateGeneticDistance = require('./calculateGeneticDistance');

function DistanceMatrix (sequences) {
  this.matrix = new Matrix(sequences, calculateGeneticDistance);
}

DistanceMatrix.prototype.get = function (s1, s2) {
  return this.matrix.get(s1, s2);
}

module.exports = DistanceMatrix;
