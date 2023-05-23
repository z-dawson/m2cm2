import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'
import { randomInt, Urn } from './common'

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
let sonyAudio = new Tone.Players(audioUrls).toDestination()
const loaded = new Promise((resolve) => {
	sonyAudio = new Tone.Players({
		urls: audioUrls,
		onload: resolve,
	}).toDestination()
})

const init = (args) => {
	video = args.video
	video.current.loop = true
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
	return { interval: sToMs(timingSound) }
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
	video.current.pause()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init }
