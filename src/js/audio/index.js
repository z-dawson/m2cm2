import * as Tone from 'tone'
import { prefix, xFadeTime } from '../constants'
import delay from 'delay'
import { sToMs } from './common'

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
	players.volume.value = -13
	playingIndex = index
	players.player(playingIndex).start(Tone.now())
}

const stop = async (index = playingIndex) => {
	if (players.loaded) {
		players.volume.rampTo(-80, xFadeTime)
		await delay(sToMs(xFadeTime))
		players.player(index).stop()
	}
}

export { start, stop }
