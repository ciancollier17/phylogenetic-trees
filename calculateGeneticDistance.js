/// calculateGeneticDistance (s1, s2)
/// Takes two aligned genetic sequences as strings
/// consisting of A, T, C, G and - characters and
/// returns the Jukes-Cantor Distance between them.

function calculateGeneticDistance(s1, s2) {
  s1 = s1.toUpperCase();
  s2 = s2.toUpperCase();

  if (s1.length != s2.length) {
    throw new Error("calculateGeneticDistance: Sequences different lengths.");
  }

  let fu = 0; // number of mismatches
  let I = 0; // identical bases
  let G = 0; // number of contiguous gap stretches
  let inGap = 0; // 0 if not in contiguous gap, 1 if in s1 gap and 2 if in s2 gap

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] == '-' && s2[i] != '-' && inGap != 1) {
      inGap = 1;
      G++;
    } else if (s2[i] == '-' && s1[i] != '-' && inGap != 2) {
      inGap = 2;
      G++;
    } else {
      inGap = 0;
    }

    if (s1[i] != s2[i] && s1[i] != '-' && s2[i] != '-') {
      fu++;
    } else if (s1[i] == s2[i] && s1[i] != '-') {
      I++;
    }
  }

  let T = fu + I + G;
  let value = -0.75 * Math.log(1 - ((4 / 3) * (fu / (fu + I)))) * (1 - (G / T)) + (G / T);
  return (isFinite(value) ? value : Number.MAX_SAFE_INTEGER);
}

module.exports = calculateGeneticDistance;
