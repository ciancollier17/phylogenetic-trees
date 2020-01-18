/// DistanceMatrix
/// Object which represents a distance matrix.
/// Constructor takes an array of sequences as
/// strings.

const Matrix = require('./Matrix');
const calculateGeneticDistance = require('./calculateGeneticDistance');
const neighbourJoining = require('./neighbourJoining');

function DistanceMatrix (sequences) {
  this.matrix = new Matrix(sequences, calculateGeneticDistance);
  this.sequences = sequences;
}

DistanceMatrix.prototype.get = function (s1, s2) {
  return this.matrix.get(s1, s2);
}

DistanceMatrix.prototype.add = function (sequence, func) {
  this.sequences.push(sequence);
  return this.matrix.add(sequence, func);
}

DistanceMatrix.prototype.remove = function (sequence) {
  for (let i = 0; i < this.sequences.length; i++) {
    if (this.sequences[i][0] == sequence) {
      this.sequences.splice(i, 1);
      break;
    }
  }

  return this.matrix.remove(sequence);
}

DistanceMatrix.prototype.sum = function (s1) {
  let index = this.matrix.namesToIndex[s1];
  let sum = 0;

  if (typeof index == 'undefined') {
    throw new Error("DistanceMatrix: sum: Sequence not found in matrix.");
  }

  for (let i = 0; i < this.matrix.data[index].length; i++) {
    sum += this.matrix.data[index][i];
  }

  return sum;
}

DistanceMatrix.prototype.generateQMatrix = function () {
  let N = this.sequences.length;

  return new Matrix(this.sequences, (seq1, seq2, s1, s2) => {
    if (s1 == s2) {
      return Number.MAX_SAFE_INTEGER;
    }

    let dij = this.get(s1, s2);
    let S1 = this.sum(s1);
    let S2 = this.sum(s2);

    return (N - 2) * dij - S1 - S2;
  });
}

DistanceMatrix.prototype.neighbourJoining = function () {
  return neighbourJoining(this);
}

module.exports = DistanceMatrix;
