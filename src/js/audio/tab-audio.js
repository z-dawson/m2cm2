import * as Tone from 'tone'
import { prefix } from '../constants'
import { getNumFilenames, randomInt } from './common'

const urls = getNumFilenames(20)

export default class TabAudio {
	constructor() {
		this.players
		this.playersPromise = new Promise((resolve) => {
			const players = new Tone.Players({
				urls,
				onload: () => {
					resolve(players)
				},
				baseUrl: `${prefix}/audio/experience/`,
			}).toDestination()
		})
		this.indexMapping = {}
		this.available = Array.from(new Array(20)).map((e, i) => i)
		this.discarded = []
	}

	async load() {
		this.players = await this.playersPromise
		this.players.fadeOut = 0.02
		this.players.fadeIn = 0.02
		this.players.volume.value = -8
		return this
	}

	play(index) {
		const randomIndex = randomInt(this.available.length)
		const playerIndex = this.available[randomIndex]
		this.indexMapping[index] = playerIndex
		this.discarded.push(this.available.splice(randomIndex, 1)[0])
		this.players.player(playerIndex).start()
		this.players.player(playerIndex).loop = true
	}

	stop(index) {
		const playerIndex = this.indexMapping[index]
		this.available.push(
			this.discarded.splice(this.discarded.indexOf(playerIndex), 1)[0]
		)
		this.players.player(playerIndex).stop()
	}

	restart(index) {
		const playerIndex = this.indexMapping[index]
		this.players.player(playerIndex).seek(0)
	}
}
