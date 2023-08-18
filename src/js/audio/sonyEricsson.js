import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { RandomMetro } from './common'
import { sToMs } from './common'
import { Urn } from './common'

const audioUrls = [
	'/audio/sonyEricsson/5thSentence.mp3',
	'/audio/sonyEricsson/4thSentence.mp3',
	'/audio/sonyEricsson/3rdSentence.mp3',
	'/audio/sonyEricsson/2ndSentence.mp3',
	'/audio/sonyEricsson/1stSentence.mp3',
	'/audio/sonyEricsson/S0_05 - Sony Ericsson.mp3',
]

let video
let timingSound
let sonyAudio
let onFinish
const event = 'ended'
const loaded = new Promise((resolve) => {
	sonyAudio = new Tone.Players({
		urls: audioUrls,
		onload: resolve,
	}).toDestination()
})

const init = (args) => {
	video = args.video
	video.current.loop = false
	onFinish = () => {
		args.onFinish()
	}
	video.current.addEventListener(event, onFinish, true)
}
const urn = new Urn(audioUrls.length, audioUrls.length - 2)
let instruction1 = [
	{
		value: 0,
		probability: 0.7,
		name: 'zero',
	},
	{
		value: 1,
		probability: 0.3,
		followedBy: ['zero'],
	},
]
const coin = new Stochastic(instruction1)

let loopSound = new RandomMetro(() => {
	let textOrSound = coin.next()
	let playerIndex
	if (textOrSound == 0) {
		playerIndex = urn.next()
	} else {
		playerIndex = 5
	}
	let playerDuration = sonyAudio.player(playerIndex).buffer.duration
	sonyAudio.player(playerIndex).start()
	timingSound = playerDuration
	return {
		interval: sToMs(timingSound),
		clear: () => {
			sonyAudio.player(playerIndex).stop()
		},
	}
})

const onStart = async (video) => {
	await Promise.all([Tone.start(), loaded])
	timingSound = sonyAudio.player(0).buffer.duration
	console.log('Timing' + sonyAudio.player(2).buffer.duration)
	loopSound.start({
		nextInterval: () => {
			return sToMs(timingSound)
		},
	})
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	Tone.Transport.stop()
	loopSound.stop()
	removeEventListener(event, onFinish, true)
	if (video.current) {
		video.current.currentTime = 0
		video.current.pause()
	}
}

export { onStart, onStop, init }
