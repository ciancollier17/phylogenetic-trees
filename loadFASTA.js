/// loadFASTA (path)
/// Takes the path of a file in FASTA format and
/// returns the sequences within as an array in
/// the format [['sequence name', 'sequence'],
/// ['sequence name', 'sequence']]

const readlline = require('readline');

function loadFASTA (path) {
  return new Promise((resolve, reject) => {
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(path)
    });

    let sequences = [];
    let sequenceName = "";
    let sequence = "";

    lineReader.on('line', function (line) {
      if (line[0] == '>') {
        if (sequence != "") {
          sequences.push([sequenceName, sequence]);
        }

        sequenceName = line.split('>')[1];
        sequence = "";
      } else {
        line = line.toUpperCase();
        
        if ((line.match(/[ATCG-]/g) || []).length != line.length) {
          reject("loadFASTA: Invalid FASTA file.");
        }

        sequence += line;
      }
    });

    lineReader.on('close', function () {
      sequences.push([sequenceName, sequence]);
      resolve(sequences);
    });
  });
}

module.exports = loadFASTA;
