const Tree = require('./Tree');

test("Can parse tree in Newick format with depth of 1", () => {
  let tree = new Tree([['A', 1], ['B', 1], ['C', 1]]);
  expect(tree.root.children[0].branchLength).toEqual(1);
  expect(tree.root.children[1].branchLength).toEqual(1);
  expect(tree.root.children[2].branchLength).toEqual(1);
  expect(tree.root.children[2].parent.children[1].branchLength).toEqual(1);
});

test("Can parse tree in Newick format with depth of 3", () => {
  let tree = new Tree([['A', 1], [[['B', 2], [[['D', 1], ['E', 5]], 1]], 3], ['C', 1]]);
  expect(tree.root.children[0].branchLength).toEqual(1);
  expect(tree.root.children[1].children[1].branchLength).toEqual(1);
  expect(tree.root.children[1].branchLength).toEqual(3);
  expect(tree.root.children[1].children[0].branchLength).toEqual(2);
  expect(tree.root.children[1].children[1].children[0].branchLength).toEqual(1);
  expect(tree.root.children[1].children[1].children[0].name).toEqual('D');
  expect(tree.root.children[1].children[1].children[1].branchLength).toEqual(5);
  expect(tree.root.children[1].children[1].children[1].name).toEqual('E');
});

test("Can convert tree with depth of 1 to Newick format", () => {
  const tree = new Tree([['A', 1], ['B', 2], ['C', 3], ['D', 4], ['E', 5]]);
  expect(tree.toNewick()).toEqual("(A:1,B:2,C:3,D:4,E:5);");
});

test("Can convert tree with depth of 3 to Newick format", () => {
  const tree = new Tree([['A', 1], [[['B', 3], [[['C', 5], ['D', 6]], 4]], 2]]);
  expect(tree.toNewick()).toEqual("(A:1,(B:3,(C:5,D:6):4):2);");
});
