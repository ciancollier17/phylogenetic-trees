const Matrix = require('./Matrix');

const arrayError = "Matrix: Matrix must be initialised with an array.";
const funcError = "Matrix: Matrix expects a function for its second argument.";
const notFoundError = "Matrix: get: The supplied sequences were not found in the matrix.";
const notFoundErrorUpdate = "Matrix: update: The supplied sequences were not found in the matrix.";
const notFoundErrorRemove = "Matrix: remove: The supplied sequences were not found in the matrix.";
const noNewValueError = "Matrix: update: no newValue specified";

test("Throws exception when no array argument given", () => {
  expect(() => new Matrix((s1, s2) => 2)).toThrow(arrayError);
});

test("Throws exception when other type instead of array given", () => {
  expect(() => new Matrix("ATAT", (s1, s2) => 2)).toThrow(arrayError);
});

test("Throws exception when no function given", () => {
  expect(() => new Matrix([["Seq1", "ATAT"], ["Seq2", "TATA"]])).toThrow(funcError);
});

test("Throws exception when non-function type given for second argument", () => {
  expect(() => new Matrix([["Seq1", "ATAT"], ["Seq2", "TATA"]], 43)).toThrow(funcError);
});

const matrix = new Matrix([["Seq1", "ATAT"], ["Seq2", "TATA"], ["Seq3", "CGCG"]], (s1, s2) => s1 + s2);

test("Can get a value from the matrix", () => {
  expect(matrix.get("Seq1", "Seq2")).toEqual("ATATTATA");
  expect(matrix.get("Seq2", "Seq3")).toEqual("TATACGCG");
});

test("Throws exception when a requested sequence is not in the matrix", () => {
  expect(() => matrix.get("Seq4", "Seq1")).toThrow(notFoundError);
});

test("Can update value in matrix", () => {
  matrix.update("Seq1", "Seq3", 23);
  expect(matrix.get("Seq1", "Seq3")).toEqual(23);
});

test("Update throws exception if sequences not found", () => {
  expect(() => matrix.update("Seq5", "Seq3", 23)).toThrow(notFoundErrorUpdate);
});

test("Update throws exception if no newValue given", () => {
  expect(() => matrix.update("Seq1", "Seq2")).toThrow(noNewValueError);
});

test("Can add sequence to matrix", () => {
  matrix.add(["Seq4", "CCCC"]);
  expect(matrix.get("Seq4", "Seq1")).toEqual("CCCCATAT");
  expect(matrix.get("Seq2", "Seq4")).toEqual("TATACCCC");
  expect(matrix.get("Seq4", "Seq4")).toEqual("CCCCCCCC");
});

test("Can add sequence to matrix using different function", () => {
  matrix.add(["Seq5", null], (s1, s2) => 2);
  expect(matrix.get("Seq5", "Seq1")).toEqual(2);
  expect(matrix.get("Seq2", "Seq5")).toEqual(2);
  expect(matrix.get("Seq5", "Seq5")).toEqual(2);
});

test("Can remove a sequence from the matrix", () => {
  matrix.remove("Seq2");
  expect(() => matrix.get("Seq2", "Seq2")).toThrow(notFoundError);
  expect(() => matrix.get("Seq3", "Seq2")).toThrow(notFoundError);
});

test("Remove throws exception when sequence not found", () => {
  expect(() => matrix.remove("Seq10")).toThrow(notFoundErrorRemove);
});

let numericMatrix = new Matrix([['A', 'AAAAA'], ['B', 'AAA'], ['C', 'AAAA']], (s1, s2) => s1.length + s2.length);

test("Min correctly finds minimum of matrix", () => {
  expect(numericMatrix.min()).toEqual(['B', 'B']);
});
