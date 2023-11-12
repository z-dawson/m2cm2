import * as Tone from 'tone'
import { Urn, getNumFilenames } from './common'
import Stochastic from './stochastic'
import { prefix } from '../constants'

const audioUrls = getNumFilenames(124)

const voiceIntervals = new Stochastic([80, 100, 2 * 60, 2.2 * 60])

const voiceUrl = '/audio/lobby/recurring.mp3'

let voice

const voiceLoaded = new Promise((resolve) => {
	voice = new Tone.Player({
		url: voiceUrl,
		onload: resolve,
	}).toDestination()
})
voice.volume.value = -8

const voiceLoop = new Tone.Loop((time) => {
	const randomDuration = voiceIntervals.next()
	voice.start(randomDuration)
	voiceLoop.interval = time + randomDuration
})

let players

const loaded = new Promise((resolve) => {
	players = new Tone.Players({
		urls: audioUrls,
		onload: resolve,
		baseUrl: `${prefix}/audio/lobby/`,
	}).toDestination()
})

const urn = new Urn(audioUrls.length, audioUrls.length - 1)
let video
let playerIndexes = []

const init = (args) => {
	video = args.video
	video.current.loop = true
	Object.assign(video.current.style, {
		objectPosition: '70% 100%',
	})
	video.current.addEventListener('seeked', () => {
		if (!video?.current?.paused) onRepeat()
	})
}

const start = async () => {
	await Promise.all([Tone.start(), loaded, voiceLoaded])
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	voiceLoop.start()
}

const onRepeat = () => {
	// stop prev
	// urn.discarded
	// 	.slice(urn.discarded.length - 2, urn.discarded.length)
	// 	.forEach((index) => {
	// 		players.player(index).stop()
	// 	})

	playerIndexes = [urn.next(), urn.next()]
	console.log(`schedule player ${playerIndexes[0]} for door opening`)
	players.player(playerIndexes[0]).start(Tone.now() + 0.9)

	console.log(`schedule player ${playerIndexes[1]} for door opening`)
	players.player(playerIndexes[1]).start(Tone.now() + 4.2)
}

const stop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	playerIndexes.forEach((index) => {
		players.player(index).stop()
	})
	voiceLoop.cancel()
	voiceLoop.stop()
	Tone.Transport.stop()
}

export { start, stop, init }
