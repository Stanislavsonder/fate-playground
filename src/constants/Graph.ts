export class GraphNode<T> {
	data: T
	adjacent: GraphNode<T>[]
	comparator: (a: T, b: T) => number

	constructor(data: T, comparator: (a: T, b: T) => number) {
		this.data = data
		this.adjacent = []
		this.comparator = comparator
	}

	addAdjacent(node: GraphNode<T>): void {
		this.adjacent.push(node)
	}

	removeAdjacent(data: T): GraphNode<T> | null {
		const index = this.adjacent.findIndex(node => this.comparator(node.data, data) === 0)

		if (index > -1) {
			return this.adjacent.splice(index, 1)[0]
		}

		return null
	}
}

export class Graph<T> {
	nodes: Map<T, GraphNode<T>> = new Map()
	comparator: (a: T, b: T) => number

	constructor(comparator: (a: T, b: T) => number) {
		this.comparator = comparator
	}

	addNode(data: T): GraphNode<T> {
		let node = this.nodes.get(data)

		if (node) return node

		node = new GraphNode(data, this.comparator)
		this.nodes.set(data, node)

		return node
	}

	removeNode(data: T): GraphNode<T> | null {
		const nodeToRemove = this.nodes.get(data)

		if (!nodeToRemove) return null

		this.nodes.forEach(node => {
			node.removeAdjacent(nodeToRemove.data)
		})

		this.nodes.delete(data)

		return nodeToRemove
	}

	addEdge(source: T, destination: T): void {
		const sourceNode = this.addNode(source)
		const destinationNode = this.addNode(destination)

		sourceNode.addAdjacent(destinationNode)
	}

	removeEdge(source: T, destination: T): void {
		const sourceNode = this.nodes.get(source)
		const destinationNode = this.nodes.get(destination)

		if (sourceNode && destinationNode) {
			sourceNode.removeAdjacent(destination)
		}
	}

	private depthFirstSearchAux(node: GraphNode<T>, visited: Map<T, boolean>, result: T[]): void {
		if (!node) return

		visited.set(node.data, true)

		result.push(node.data)

		node.adjacent.forEach(item => {
			if (!visited.has(item.data)) {
				this.depthFirstSearchAux(item, visited, result)
			}
		})
	}

	depthFirstSearch(): T[] {
		const result: T[] = []
		const visited: Map<T, boolean> = new Map()
		this.nodes.forEach(node => {
			if (!visited.has(node.data)) {
				this.depthFirstSearchAux(node, visited, result)
			}
		})
		return result
	}

	private breadthFirstSearchAux(node: GraphNode<T>, visited: Map<T, boolean>, result: T[]): void {
		const queue: GraphNode<T>[] = []

		if (!node) return

		queue.push(node)
		visited.set(node.data, true)

		while (queue.length) {
			node = queue.shift() as GraphNode<T>

			if (!node) continue

			result.push(node.data)

			node.adjacent.forEach(item => {
				if (!visited.has(item.data)) {
					visited.set(item.data, true)
					queue.push(item)
				}
			})
		}
	}

	breadthFirstSearch(): T[] {
		const result: T[] = []
		const visited: Map<T, boolean> = new Map()
		this.nodes.forEach(node => {
			if (!visited.has(node.data)) {
				this.breadthFirstSearchAux(node, visited, result)
			}
		})
		return result
	}
}
