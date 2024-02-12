import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro, sToMs } from './common'
import { prefix } from '../constants'

const urls = [
	'iteration1.mp3',
	'iteration2.mp3',
	'iteration3.mp3',
	'iteration4.mp3',
	'iteration5.mp3',
	'iteration6.mp3',
	'iteration7.mp3',
	'iteration8.mp3',
	'iteration9.mp3',
	'iteration10.mp3',
	'iteration11.mp3',
	'iteration12.mp3',
	'nowhere.mp3',
	'slowly.mp3',
]

let nowhereAudio

const loaded = new Promise((resolve) => {
	nowhereAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: `${prefix}/audio/nowhere/`,
	}).toDestination()
})
const randomIndexGenerator = new Stochastic([{ range: [0, 11] }])
const randomJitterGenerator = new Stochastic([{ range: [sToMs(-2), sToMs(4)] }])

const instruction3 = [
	{
		value: 12,
		name: 'nowhere',
		probability: 0.4,
	},
	{
		value: 13,
		name: 'slowly',
		probability: 0.4,
		followedBy: ['rest'],
	},
	{
		value: null,
		name: 'rest',
		probability: 0.6,
	},
]

const textIndexGenerator = new Stochastic(instruction3)

let video
const reverbDuration = 10
const loop = new RandomMetro(() => {
	nowhereAudio.player(12).volume.value = -13
	nowhereAudio.player(13).volume.value = -13
	const currentIndex = randomIndexGenerator.next()
	const textIndex = textIndexGenerator.next()
	const randomJitter = msToS(randomJitterGenerator.next())
	const currentPlayer = nowhereAudio.player(currentIndex)
	let textJitter = 0
	currentPlayer.start()
	if (textIndex != null) {
		textJitter = 3
		nowhereAudio
			.player(textIndex)
			.start(
				Tone.now() +
					currentPlayer.buffer.duration +
					randomJitter -
					2 -
					reverbDuration
			)
	}
	return {
		interval: sToMs(
			currentPlayer.buffer.duration - reverbDuration + randomJitter + textJitter
		),
	}
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

const start = async (video) => {
	await Promise.all([Tone.start(), loaded])
	Tone.Transport.start()
	loop.start()
	video.current.currentTime = 0
	video.current.play()
}

const stop = () => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	loop.stop(Tone.immediate())
	nowhereAudio.stopAll()
	Tone.Transport.stop()
}

export { start, stop, init }
