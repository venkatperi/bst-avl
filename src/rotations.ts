import { BstNode } from "./bst-node"

function swapChild(oldChild: BstNode, newChild: BstNode) {
    const parent = oldChild.parent

    if (parent) {
        if (oldChild.isLeftChild) {
            parent.left = newChild
        } else {
            parent.right = newChild
        }
    } else {
        newChild.parent = undefined
    }

    // clear out old child's parent
    oldChild.parent = undefined
}

export function leftRotation(node: BstNode): BstNode {
    const newParent = node.right!!
    const prevLeft = newParent.left

    swapChild(node, newParent)
    newParent.left = node
    node.right = prevLeft
    return newParent
}

export function rightRotation(node: BstNode): BstNode {
    const newParent = node.left!!
    const prevRight = newParent.right

    swapChild(node, newParent)
    newParent.right = node
    node.left = prevRight
    return newParent
}

export function leftRightRotation(node: BstNode) {
    leftRotation(node.left!)
    return rightRotation(node)
}

export function rightLeftRotation(node: BstNode) {
    rightRotation(node.right!!)
    return leftRotation(node)
}
