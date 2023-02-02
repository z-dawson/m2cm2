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

const randomFloat = (min, max) => {
	return Math.random() * (max - min) + min
}

const randomInt = (min, max) => {
	return Math.floor(randomFloat(min, max))
}

const RandomMetro = class {
	constructor(callback, min, max) {
		Object.assign(this, { callback, min, max })
		this.delay
	}

	start(callback) {
		if (callback) this.callback = callback
		const time = randomInt(this.min, this.max)
		this.callback(time)
		this.delay = setTimeout(this.start.bind(this), time)
	}

	stop(callCallback = false) {
		clearTimeout(this.delay)
		callCallback && this.callback(0)
	}

	setRange(min, max) {
		Object.assign(this, { min, max })
	}
}

const mToMs = (m) => m * 1000

const msToM = (ms) => ms / 1000

export { randomRange, Urn, RandomMetro, mToMs, msToM }