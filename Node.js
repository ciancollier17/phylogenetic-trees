/// Node
/// Node of a Tree object.

function Node (name = null, branchLength = null, parent = null) {
  this.name = name;
  this.branchLength = branchLength;
  this.children = [];
  this.parent = parent;
}

Node.prototype.addChild = function (node) {
  node.parent = this;
  this.children.push(node);
}

module.exports = Node;
