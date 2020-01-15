/// Matrix: DO NOT USE DIRECTLY
/// Provides object and methods for building and
/// manipulating matrices of sequences. Wrapped by
/// DistanceMatrix, VarianceMatrix etc...

function Matrix (sequences, func) {
  if (!sequences || !Array.isArray(sequences)) {
    throw new Error("Matrix: Matrix must be initialised with an array.");
  }

  if (!func || !(func instanceof Function)) {
    throw new Error("Matrix: Matrix expects a function for its second argument.")
  }

  this.data = [];
  this.namesToIndex = {};
  this.namesToSequences = {};

  for (let i = 0; i < sequences.length; i++) {
    this.namesToIndex[sequences[i][0]] = i;
    this.namesToSequences[sequences[i][0]] = sequences[i][1];
    this.data.push([]);

    for (let k = 0; k < sequences.length; k++) {
      this.data[i].push(func(sequences[i][1], sequences[k][1]));
    }
  }
}

Matrix.prototype.get = function (s1, s2) {
  if (typeof this.namesToIndex[s1] == 'undefined' || typeof this.namesToIndex[s2] == 'undefined') {
    throw new Error("Matrix: get: The supplied sequences were not found in the matrix.");
  }

  return this.data[this.namesToIndex[s1]][this.namesToIndex[s2]];
}

Matrix.prototype.update = function (s1, s2, newValue) {
  if (typeof this.namesToIndex[s1] == 'undefined' || typeof this.namesToIndex[s2] == 'undefined') {
    throw new Error("Matrix: update: The supplied sequences were not found in the matrix.");
  }

  if (typeof newValue == 'undefined') {
    throw new Error("Matrix: update: no newValue specified");
  }

  this.data[this.namesToIndex[s1]][this.namesToIndex[s2]] = newValue;
}

module.exports = Matrix;
