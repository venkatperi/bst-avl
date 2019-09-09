import { BinarySearchTree } from "../src/binaryTree"

let tree = new BinarySearchTree();

[30, 40, 40, 10, 15, 12, 50].forEach(x => tree.insert(x))
console.log(tree.root!!.asciiTree())

let res: Array<number> = []
tree.root!!.visitReverseOrder((node, ctx) => ctx.push(node.value), res)
console.log('rev order ', res)

res = []
tree.root!!.visitInOrder((node, ctx) => ctx.push(node.value), res)
console.log('in order  ', res)

res = []
tree.root!!.visitPreOrder((node, ctx) => ctx.push(node.value), res)
console.log('pre order ', res)

res = []
tree.root!!.visitPostOrder((node, ctx) => ctx.push(node.value), res)
console.log('post order', res)

res = []
tree.root!!.visitBreadthFirst((node, ctx) => ctx.push(node.value), res)
console.log('bfs       ', res)

res = []
tree.root!!.visitDepthFirst((node, ctx) => ctx.push(node.value), res)
console.log('dfs       ', res)

tree.remove(30)
console.log(tree.root!!.asciiTree())
res = []
tree.root!!.visitInOrder((node, ctx) => ctx.push(node.value), res)
console.log('in order  ', res)


