// DISCONTINUED

import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { RandomMetro } from './common'
import { sToMs } from './common'
import { prefix, xFadeTime } from '../constants'
import delay from 'delay'

const audioUrls = [
	'connecting.mp3',
	'connecting5.mp3',
	'connecting4.mp3',
	'connecting3.mp3',
	'connecting2.mp3',
	'connecting1.mp3',
]
let connectingAudio, video

const loaded = new Promise((resolve) => {
	connectingAudio = new Tone.Players({
		urls: audioUrls,
		onload: resolve,
		baseUrl: `${prefix}/audio/Connecting/`,
	}).toDestination()
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

let instruction1 = [{ range: [1, 5] }]
let instruction2 = [{ range: [1, 8] }]
let instruction3 = [{ range: [35, 62] }]
const randomSound = new Stochastic(instruction1)
const randomIntervalSound = new Stochastic(instruction2)
const randomIntervalText = new Stochastic(instruction3)
let timingSound
let timingText

let loopSound = new RandomMetro(() => {
	let playerIndex = randomSound.next()
	let playerDuration = connectingAudio.player(playerIndex).buffer.duration
	connectingAudio.player(playerIndex).start()
	timingSound = playerDuration + randomIntervalSound.next()
	return {
		interval: sToMs(timingSound),
		clear: () => {
			connectingAudio.player(playerIndex).stop()
		},
	}
})

let loopText = new RandomMetro(() => {
	connectingAudio.player(0).start()
	timingText = randomIntervalText.next()
	return {
		interval: sToMs(timingText),
		clear: () => {
			connectingAudio?.player(0).stop()
		},
	}
})

const start = async (video) => {
	await Promise.all([Tone.start(), loaded])
	connectingAudio.player(0).volume.value = -13
	loopSound.start()
	loopText.start()
	video.current.play()
}
const stop = async (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	connectingAudio.volume.rampTo(-80, xFadeTime)
	loopSound.stop()
	loopText.stop()
	await delay(sToMs(xFadeTime))
	Tone.Transport.stop()
	connectingAudio.stopAll()
}

export { start, stop, init }
