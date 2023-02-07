import { randomInt } from './common'

const weightedRandom = (originalWeights) => {
	const weights = [...originalWeights]
	let i

	for (i = 1; i < weights.length; i++) weights[i] += weights[i - 1]

	const random = Math.random() * weights[weights.length - 1]

	for (i = 0; i < weights.length; i++) if (weights[i] > random) break

	return i
}

const parseElement = (element) => {
	const { restProbability: rest, followedBy } = element
	if (typeof element == 'number' || typeof element == 'string') {
		return {
			value: element,
			type: 'value',
		}
	} else {
		return {
			...element,
			type: ['value', 'range'].find((key) => element[key] !== undefined),
			restProbability: rest > 1 ? rest / 100 : rest,
			followedBy: followedBy ? parseInstructions(followedBy) : undefined,
		}
	}
}

const parseObject = (obj) => {
	return Object.entries(obj).map(([name, element]) => {
		return {
			...parseElement(element),
			name,
		}
	})
}

const parseArray = (arr) => {
	return arr.map((element, index, { length }) => {
		return {
			name: index,
			probability: 1 / length,
			...parseElement(element),
		}
	})
}

const parseInstructions = (instructions) => {
	return (Array.isArray(instructions) ? parseArray : parseObject)(instructions)
}

const getInstructionsByName = (arr) =>
	arr.reduce((byName, element, index) => {
		byName[element.name] = { ...element, index }
		return byName
	}, {})

const getProbabilities = (arr) => arr.map((element) => element.probability)

const Stochastic = class {
	constructor(instructions) {
		this.instructions = parseInstructions(instructions)
		this.probabilities = getProbabilities(this.instructions)
		this.byName = getInstructionsByName(this.instructions)

		this.count = this.max = 0
		this.finished = false
	}

	initCounter() {
		const { repeat } = this.instructions[this.current]
		this.count = 0
		this.max = Array.isArray(repeat) ? randomInt(...repeat) : repeat || 0
		this.finished = false
	}

	next() {
		const prev = this.instructions?.[this.current] || {}

		if (prev.repeat && !this.finished) {
			this.finished = this.max <= ++this.count
		} else if (
			prev.followedBy &&
			((prev.repeat && this.finished) || !prev.repeat)
		) {
			const { value } =
				prev.followedBy[weightedRandom(getProbabilities(prev.followedBy))]
			this.current = typeof value == 'number' ? value : this.byName[value].index
			this.initCounter()
		} else {
			this.current = weightedRandom(this.probabilities)
			this.initCounter()
		}

		const element = this.instructions[this.current]
		const { type, restProbability: rest } = element

		const pause = rest && !weightedRandom([rest, 1 - rest])

		const value = pause
			? null
			: type == 'range'
			? randomInt(...element[type])
			: type == 'value'
			? element[type]
			: null

		// const { current, count, max } = this
		// console.log({ current, count, max })
		return value
	}
}

// Instructions:
// [ value, value, value ]
// { value: probability, value: probability }
// [ Element, Element ]
// { value: Element, value: Element }

// Element:
// { value: number}
// { range: [min, max] }
// { value: number, probability: number }

// Follow actions
// { value: number, followedBy: [ ElementIndexOrName ]}
// { value: number, followedBy: { ElementIndexOrName: probability }}

// { value: number, repeat: number }
// { value: number, repeat: [min, max] }

// EXAMPLE

// const instruction = [
// 	{
// 		value: 1,
// 		restProbability: 0.2,

// 		probability: 0.2,
// 		followedBy: ['high'],
// 		name: 'low',

// 		repeat: 1,
// 	},
// 	{
// 		name: 'high',
// 		range: [100, 105],
// 		followedBy: [0],
// 		probability: 0.8,
// 	},
// ]

// const random = new Stochastic(instruction)

// random.next()

export default Stochastic
export { weightedRandom }
