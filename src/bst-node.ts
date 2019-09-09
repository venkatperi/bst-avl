export type VisitorFn<T> = (node: BstNode, context: T) => void

export const LEFT = Symbol('LEFT')

export const RIGHT = Symbol('RIGHT')

export type ParentSide = typeof LEFT | typeof RIGHT

export class BstNode {
    value: number

    parent?: BstNode

    count: number = 1

    private _left?: BstNode

    private _right?: BstNode

    parentSide?: ParentSide

    constructor(value: number) {
        this.value = value
    }

    /**
     * Gets the left child node of the current node
     *
     * @returns {BstNode | undefined} the left child node, if present
     */
    get left(): BstNode | undefined {
        return this._left
    }

    /**
     * Sets the left child of the current node
     *
     * @param {BstNode | undefined} node
     */
    set left(node: BstNode | undefined) {
        this._left = node
        if (node) {
            node.parent = this
            node.parentSide = LEFT
        }
    }

    get right(): BstNode | undefined {
        return this._right
    }

    set right(node: BstNode | undefined) {
        this._right = node
        if (node) {
            node.parent = this
            node.parentSide = RIGHT
        }
    }

    get isLeftChild(): boolean {
        return this.parentSide === LEFT
    }

    get isRightChild(): boolean {
        return this.parentSide === RIGHT
    }

    get isLeaf(): boolean {
        return !(this.left && this.right)
    }

    get sibling(): BstNode | undefined {
        if (!this.parent) {
            return undefined
        }
        return this.isLeftChild ? this.parent.right : this.parent.left
    }

    get leftHeight(): number {
        return this.left ? this.left.height : 0
    }

    get rightHeight(): number {
        return this.right ? this.right.height : 0
    }

    get height(): number {
        return Math.max(this.leftHeight, this.rightHeight) + 1
    }

    get balanceFactor(): number {
        return this.leftHeight - this.rightHeight
    }

    get rightMost(): BstNode {
        return !this.right ? this : this.right.rightMost
    }

    get leftMost(): BstNode {
        return !this.left ? this : this.left.leftMost
    }

    combineLeftIntoRightSubtree(): BstNode | undefined {
        if (!this.right) {
            return this.left
        }
        const leftMost = this.right.leftMost
        leftMost.left = this.left
        return this.right
    }

    visitReverseOrder<T>(visitor: VisitorFn<T>, context: T) {
        if (this.right) { this.right.visitReverseOrder(visitor, context) }
        visitor(this, context)
        if (this.left) { this.left.visitReverseOrder(visitor, context) }
    }

    visitInOrder<T>(visitor: VisitorFn<T>, context: T) {
        if (this.left) { this.left.visitInOrder(visitor, context) }
        visitor(this, context)
        if (this.right) { this.right.visitInOrder(visitor, context) }
    }

    visitPreOrder<T>(visitor: VisitorFn<T>, context: T) {
        visitor(this, context)
        if (this.left) { this.left.visitPreOrder(visitor, context) }
        if (this.right) { this.right.visitPreOrder(visitor, context) }
    }

    visitPostOrder<T>(visitor: VisitorFn<T>, context: T) {
        if (this.left) { this.left.visitPostOrder(visitor, context) }
        if (this.right) { this.right.visitPostOrder(visitor, context) }
        visitor(this, context)
    }

    visitDepthFirst<T>(visitor: VisitorFn<T>, context: T) {
        const stack: Array<BstNode> = [this]
        while (stack.length) {
            let node = stack.pop()
            if (node) {
                visitor(node, context)
                if (node.right) { stack.push(node.right) }
                if (node.left) { stack.push(node.left) }
            }
        }
    }


    visitBreadthFirst<T>(visitor: VisitorFn<T>, context: T) {
        const queue: Array<BstNode> = [this]
        while (queue.length) {
            let node = queue.shift()
            if (node) {
                visitor(node, context)
                if (node.left) { queue.push(node.left) }
                if (node.right) { queue.push(node.right) }
            }
        }
    }


    asciiTree(prefix = '', isTail = true): string {
        let result = []

        if (this.right) {
            result.push(this.right.asciiTree(
                prefix + (isTail ? "│  " : "   "), false))
        }

        result.push(prefix, (isTail ? "└─ " : "┌─ "),
            this.value, "(", this.count, ")\n")

        if (this.left) {
            result.push(this.left.asciiTree(
                prefix + (isTail ? "   " : "│  "), true))
        }

        return result.join('')
    }

}
