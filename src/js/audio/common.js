const { rando, randoSequence } = require('@nastyox/rando.js')
const randomRange = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	// The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1) + min)
}
const Urn = class {
	constructor(max, waiting, reuse = 1) {
		const fillRange = (start, end) =>
			Array(end - start + 1)
				.fill(0)
				.map((_, index) => start + index)
		this.waiting = waiting
		this.reuse = reuse
		this.possible = fillRange(0, max - 1)
		this.discarded = []
	}
	next() {
		if (this.discarded.length > this.waiting || this.possible.length == 0) {
			this.possible = this.possible.concat(this.discarded.slice(0, this.reuse))
			this.discarded.splice(0, this.reuse)
		}
		const index = Math.floor(Math.random() * this.possible.length)
		const result = this.possible[index]
		this.possible.splice(index, 1)
		this.discarded.push(result)
		return result
	}
}
export { randomRange, Urn }
