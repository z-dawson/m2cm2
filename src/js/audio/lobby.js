import * as Tone from 'tone'
import { prefix, xFadeTime } from '../constants'
import { RandomMetro, Urn, getNumFilenames, sToMs } from './common'
import Stochastic from './stochastic'
import delay from 'delay'

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

const voiceLoop = new RandomMetro(({ count }) => {
	if (count !== 0) {
		voice.start()
		console.log('recurring...')
	}
	return {
		interval: sToMs(voiceIntervals.next()),
	}
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
	players.volume.value = 0
	voice.volume.value = -13
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	voiceLoop.start()
}

const onRepeat = () => {
	playerIndexes = [urn.next(), urn.next()]
	console.log(`schedule player ${playerIndexes[0]} for door opening`)
	players.player(playerIndexes[0]).start(Tone.now() + 0.9)

	console.log(`schedule player ${playerIndexes[1]} for door opening`)
	players.player(playerIndexes[1]).start(Tone.now() + 4.2)
}

const stop = async (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	players.volume.rampTo(-80, xFadeTime)
	voiceLoop.stop()
	await delay(sToMs(xFadeTime))
	players.stopAll()
	voice.stop()
	Tone.Transport.stop()
}

export { init, start, stop }
