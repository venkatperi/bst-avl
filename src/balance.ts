import { BstNode } from "./bst-node"
import {
    leftRightRotation, leftRotation, rightLeftRotation, rightRotation
} from "./rotations"


function balance(node: BstNode): BstNode {
    if (node.balanceFactor > 1) {
        return node.left!.balanceFactor < 0 ? leftRightRotation(node)
                                            : rightRotation(node)
    }
    if (node.balanceFactor < -1) {
        return node.right!.balanceFactor > 0 ? rightLeftRotation(node)
                                             : leftRotation(node)
    }
    return node
}

export function balanceUpstream(node: BstNode | undefined): BstNode | undefined {
    let current: BstNode | undefined = node
    let newParent

    while (current) {
        newParent = balance(current)
        current = current.parent
    }
    return newParent
}

