const DistanceMatrix = require('./DistanceMatrix');

const notFoundError = "DistanceMatrix: sum: Sequence not found in matrix.";
const dm = new DistanceMatrix([['A', 'AAAAA'],['B', 'ATCGA'],['C', 'A-CGA']]);

test("Can sum distances of each sequence", () => {
  expect(dm.sum('A')).toBeCloseTo(2.06624580752);
  expect(dm.sum('B')).toBeCloseTo(1.4070784343255752);
});

test("Sum fails when sequence not in distance matrix", () => {
  expect(() => dm.sum('Q')).toThrow(notFoundError);
});

const dm2 = new DistanceMatrix([
  ['Liver Fluke', '---------ATGAGTTGGTT'],
  ['Mouse', 'ATGTTCATTAATCGTTGATT'],
  ['Human', 'ATGTTCGCCGACCGTTGACT'],
  ['Chimp', 'ATGTTCACCGACCGCTGACT']]);

test('Can generate correct Q matrix', () => {
  const Q = dm2.generateQMatrix();
  expect(Q.get('Liver Fluke', 'Liver Fluke')).toEqual(Number.MAX_SAFE_INTEGER);
  expect(Q.get('Mouse', 'Human')).toBeCloseTo(-2.1273987200993307);
  expect(Q.get('Human', 'Chimp')).toBeCloseTo(-3.034201512123472);
});
