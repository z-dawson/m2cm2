import * as Tone from 'tone'
import { prefix } from '../constants'

const urls = new Array(8).fill(0).map((value, index) => {
	return `Statement${index + 1}.mp3`
})

let players

const loaded = new Promise((resolve, reject) => {
	players = new Tone.Players({
		urls,
		onload: () => resolve(),
		baseUrl: `${prefix}/audio/index/`,
	}).toDestination()
})

let playingIndex

const start = async (index) => {
	await Promise.all([Tone.start(), loaded])
	playingIndex = index
	players.player(playingIndex).start(Tone.now())
}

const stop = (index = playingIndex) => {
	players.loaded && players.player(index).stop()
}

export { start, stop }
