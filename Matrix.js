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
  this.func = func;

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

Matrix.prototype.add = function (sequence, func = null) {
  func = func ? func : this.func;
  let values = [];
  let i = 0;

  for (let name in this.namesToSequences) {
    values.push(func(sequence[1], this.namesToSequences[name]));
    this.data[i].push(func(this.namesToSequences[name], sequence[1]));
    i++;
  }

  values.push(func(sequence[1], sequence[1]));
  this.data.push(values);
  this.namesToSequences[sequence[0]] = sequence[1];
  this.namesToIndex[sequence[0]] = this.data.length - 1;
}

Matrix.prototype.remove = function (sequence) {
  if (typeof this.namesToIndex[sequence] == 'undefined') {
    throw new Error("Matrix: remove: The supplied sequences were not found in the matrix.");
  }

  let index = this.namesToIndex[sequence];
  this.data.splice(index, 1);

  for (let name in this.namesToIndex) {
    if (this.namesToIndex[name] > index) {
      this.namesToIndex[name] = this.namesToIndex[name] - 1;
    } else if (this.namesToIndex[name] == index) {
      delete this.namesToIndex[name];
      delete this.namesToSequences[name];
    }
  }

  for (let i = 0; i < this.data.length; i++) {
    this.data[i].splice(index, 1);
  }
}

module.exports = Matrix;
