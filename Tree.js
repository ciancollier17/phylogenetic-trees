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

Tree.prototype.mergeNodes = function (n1, n2, newParentName, newParentBranchLength) {
  let queue = [this.root];
  let n1p, n2p;

  while (queue.length > 0) {
    let node = queue.shift();

    if (node.name == n1) { n1p = node }
    else if (node.name == n2) { n2p = node }

    for (let i = 0; i < node.children.length; i++) {
      queue.unshift(node.children[i]);
    }

    if (n1p && n2p) { break; }
  }

  if (n1p && n2p) {
    let sharedParent = new Node(newParentName, newParentBranchLength, n1p.parent);
    let longerList = n1p.parent.children.length > n2p.parent.children.length ? n1p.parent.children.length : n2p.parent.children.length;

    for (let i = 0; i < longerList; i++) {
      if (typeof n1p.parent.children[i] != 'undefined') {
        if (n1p.parent.children[i].name == n1) {
          n1p.parent.children.splice(i, 1);
        }
      }

      if (typeof n2p.parent.children[i] != 'undefined') {
        if (n2p.parent.children[i].name == n2) {
          n2p.parent.children.splice(i, 1);
        }
      }
    }

    n1p.parent.addChild(sharedParent);
    sharedParent.addChild(n1p);
    sharedParent.addChild(n2p);
  }
}

module.exports = Tree;
