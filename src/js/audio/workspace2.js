import * as Tone from 'tone'
import { randomInt } from './common'
import Stochastic from './stochastic'
import { sToMs } from './common'
import { RandomMetro } from './common'
import { prefix } from '../constants'

const urls = [
	'memory.mp3',
	'continue.mp3',
	'fading.mp3',
	'knowing.mp3',
	'changing.mp3',
	'processing.mp3',
	'programming.mp3',
	'progressing.mp3',
	'remembering.mp3',
	'returning.mp3',
	'searching.mp3',
	'Monody 1.mp3',
	'Monody 2.mp3',
	'Monody 3.mp3',
	'Monody 4.mp3',
	'Monody 5.mp3',
	'Monody 6.mp3',
	'Monody 8.mp3',
	'Monody 7.mp3',
	'Monody 9.mp3',
	'Monody 10.mp3',
	'Monody 11.mp3',
	'Monody 12.mp3',
	'Monody 13.mp3',
	'Monody 14.mp3',
]

let workspaceAudio

const loaded = new Promise((resolve) => {
	workspaceAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: `${prefix}/audio/workspace2/`,
	}).toDestination()
})

const instruction1 = [
	{ name: 'words', range: [3, 11], probability: 1, followedBy: ['keywords'] },
	{ name: 'keywords', range: [1, 2], probability: 0, followedBy: ['words'] },
]
const instruction2 = [{ range: [12, 25] }]
const instruction3 = [{ range: [35, 45] }]
const textInterval = new Stochastic(instruction3)
const randomText = new Stochastic(instruction1)
const randomMonody = new Stochastic(instruction2)

let video

//let loop

const loop = new RandomMetro(() => {
	let currentInterval = sToMs(textInterval.next())
	let textIndex = randomText.next()
	workspaceAudio.player(textIndex).start(30)
	return { interval: currentInterval }
})
const loop2 = new RandomMetro(() => {
	const musicIndex = randomMonody.next()
	const currentPlayer = workspaceAudio.player(musicIndex)
	const currentPlayerDur = sToMs(currentPlayer.buffer.duration)
	currentPlayer.start()
	return { interval: currentPlayerDur }
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

const start = async (video) => {
	await Promise.all([Tone.start(), loaded])
	Tone.Transport.start()
	loop.start()
	loop2.start()
	video.current.currentTime = 0
	video.current.play()
}

const stop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	loop.cancel(Tone.immediate())
	loop2.cancel(Tone.immediate())
	workspaceAudio.stopAll()
	Tone.Transport.stop()
}

export { start, stop, init }
