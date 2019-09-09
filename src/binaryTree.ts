import { BstNode } from "./bst-node"

export class BinarySearchTree {
    root?: BstNode

    /**
     * Inserts the given value in the tree.
     *
     * @param {number} value to insert
     * @returns {BstNode} the node holding the given value
     */
    insert(value: number): BstNode {
        const {node, parent} = this.findMatchingNode(value)

        if (node) {
            node.count++
            return node
        }

        const newNode = new BstNode(value)
        if (parent) {
            if (value < parent.value) {
                parent.left = newNode
            } else {
                parent.right = newNode
            }
        } else {
            this.root = newNode
        }
        return newNode
    }

    /**
     * Removes the value from the tree
     *
     * @param {number} value to remove
     * @returns {boolean} true if the value was removed, else false if the
     *              value was not found in the tree
     */
    remove(value: number): boolean {
        const {node, parent} = this.findMatchingNode(value)

        if (!node) {
            return false
        }

        node.count--
        if (node.count > 0) {
            return true
        }

        const childrenSubtree = node.combineLeftIntoRightSubtree()

        if (!parent) {
            this.root = childrenSubtree
            if (this.root) {
                this.root.parent = undefined
            }
        } else if (node.isLeftChild) {
            parent.left = childrenSubtree
        } else {
            parent.right = childrenSubtree
        }

        return true
    }


    /**
     * Returns true if the given number is present in the tree
     *
     * @param {number} value to check for
     * @returns {boolean}
     */
    has(value: number): boolean {
        return !!this.find(value)
    }

    /**
     * Looks for the tree node that holds the given value.
     *
     * @param {number} value the value to search for
     * @returns {BstNode | undefined} The node which contains the value,
     *              undefined if the value is not present in the tree
     */
    find(value: number): BstNode | undefined {
        return this.findMatchingNode(value).node
    }

    private findMatchingNode(value: number): { node?: BstNode; parent?: BstNode } {
        let [parent, node]: [BstNode | undefined, BstNode | undefined] =
            [undefined, this.root]

        while (node && node!.value !== value) {
            [parent, node] =
                [node, node.value > value ? node.left : node.right]
        }
        return {node, parent}
    }
}


