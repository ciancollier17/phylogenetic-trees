const calculateGeneticDistance = require('./calculateGeneticDistance');

const s1 = "AAAA";
const s2 = "ATAT";
const s2a = "A-AT";
const s3 = "C-CG";
const s4 = "CG-G";
const s5 = "--ATCGATCG-CGCG";
const s6 = "CGATCGTATGGCG--";
const s7 = "cgatcgtatggcg--";

test("Returns correct genetic distance when no gaps", () => {
  expect(calculateGeneticDistance(s1, s2)).toBeCloseTo(0.82395921650);
});

test("Returns correct genetic distance when there is a gap in one sequence", () => {
  expect(calculateGeneticDistance(s2, s2a)).toBeCloseTo(0.25);
});

test("Returns correct genetic distance when there is gaps in both sequences", () => {
  expect(calculateGeneticDistance(s3, s4)).toBeCloseTo(0.5);
});

test("Returns correct genetic distacne when there are gaps and mismatches in both sequences", () => {
  expect(calculateGeneticDistance(s5, s6)).toBeCloseTo(0.52547632140);
});

test("Works with lower case letters too", () => {
  expect(calculateGeneticDistance(s6, s7)).toBeCloseTo(0);
})

test("Throws error when sequences are different lengths", () => {
  expect(() => calculateGeneticDistance(s1, s6)).toThrow("calculateGeneticDistance: Sequences different lengths.");
});
