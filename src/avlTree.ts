import { balanceUpstream } from "./balance"
import { BinarySearchTree } from "./binaryTree"
import { BstNode } from "./bst-node"

export class AvlTree extends BinarySearchTree {
    public insert(value: number): BstNode {
        const node = super.insert(value)
        this.root = balanceUpstream(node)
        return node
    }

    public remove(value: number): boolean {
        const node = super.find(value)
        if (node) {
            const found = super.remove(value)
            this.root = balanceUpstream(node.parent)
            return found
        }
        return false
    }
}


