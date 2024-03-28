import * as Tone from 'tone'
import { prefix } from '../constants'
import { RandomMetro, sToMs } from './common'
import Stochastic from './stochastic'

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
	'Monody1.mp3',
	'Monody2.mp3',
	'Monody3.mp3',
	'Monody4.mp3',
	'Monody5.mp3',
	'Monody6.mp3',
	'Monody8.mp3',
	'Monody7.mp3',
	'Monody9.mp3',
	'Monody10.mp3',
	'Monody11.mp3',
	'Monody12.mp3',
	'Monody13.mp3',
	'Monody14.mp3',
]

let workspaceAudio

const loaded = new Promise((resolve) => {
	workspaceAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: `${prefix}/audio/workspace/`,
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

const loop = new RandomMetro(({ count }) => {
	const currentInterval = sToMs(textInterval.next())
	const textIndex = randomText.next()
	if (count !== 0) {
		workspaceAudio.player(textIndex).start()
	}
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
	Array.from(Array(11)).forEach((_, index) => {
		workspaceAudio.player(index).volume.value = -13
	})
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
	loop.stop()
	loop2.stop()
	workspaceAudio.stopAll()
	Tone.Transport.stop()
}

export { init, start, stop }
