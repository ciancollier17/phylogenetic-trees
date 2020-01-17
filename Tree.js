/// Tree
/// Object for storing phylogenetic trees. Takes in an optional
/// string (a tree represented in Newick format)

const Node = require('./Node');

function Tree (treeArray) {
  this.root = new Node();
  this.parseArray(treeArray);
}

Tree.prototype.parseArray = function (treeArray) {
  function parseArray (root, treeArray, currIndex) {
    let node;

    if (currIndex >= treeArray.length) {
      return 1;
    }

    let elementToParse = treeArray[currIndex][0];

    if (Array.isArray(elementToParse)) {
      node = new Node(null, treeArray[currIndex][1], root);
      parseArray(node, elementToParse, 0);
    } else {
      node = new Node(elementToParse, treeArray[currIndex][1], root);
    }

    root.addChild(node);
    parseArray(root, treeArray, currIndex + 1);
  }

  return parseArray(this.root, treeArray, 0);
};

Tree.prototype.toNewick = function () {
  function toNewick (current, acc, childCounter) {
    if (childCounter >= current.children.length) {
      acc = acc.split('');
      acc[acc.length - 1] = ')';
      acc = acc.join("");
      return '(' + acc;
    }

    if (current.children[childCounter].name && current.children[childCounter].children.length == 0) {
      acc += current.children[childCounter].name + ":" + current.children[childCounter].branchLength.toString() + ",";
    } else {
      acc += toNewick(current.children[childCounter], "", 0) + ":" + current.children[childCounter].branchLength.toString() + ",";
    }

    return toNewick(current, acc, childCounter + 1);
  }

  return toNewick(this.root, "", 0) + ";";
}

module.exports = Tree;
