import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro, sToMs } from './common'

const urls = [
	'travel5.mp3',
	'travel4.mp3',
	'travel3.mp3',
	'travel2.mp3',
	'travel1.mp3',
	'waiting.mp3',
]

let travelAudio

const loaded = new Promise((resolve) => {
	travelAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: '/audio/travel/',
	}).toDestination()
})

let video

const instruction1 = [
	{ range: [0, 4], probability: 1, name: 'drone', followedBy: ['text'] },
	{ value: 5, name: 'text', probability: 0, followedBy: ['drone'] },
]
const instruction2 = [
	{ range: [-5, 3], probability: 1, name: 'drone', followedBy: ['text'] },
	{ range: [-3, 2], name: 'text', probability: 0, followedBy: ['drone'] },
]
const random = new Stochastic(instruction1)
const randomDuration = new Stochastic(instruction2)

const init = (args) => {
	video = args.video
	video.current.loop = true
}
const loop = new RandomMetro(() => {
	const playerIndex = random.next()
	const jitterDuration = randomDuration.next()
	console.log(jitterDuration)
	const selectedPlayer = travelAudio.player(playerIndex)
	const playerDuration = selectedPlayer.buffer.duration
	console.log('playerduration ' + playerDuration)
	selectedPlayer.start()
	return { interval: sToMs(Math.ceil(playerDuration) + jitterDuration) }
})

const onStart = async (video) => {
	await Promise.all([Tone.start(), loaded])
	Tone.Transport.start()
	loop.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	loop.stop()
	Tone.Transport.stop()
	travelAudio.stopAll()
}

export { onStart, onStop, init }
