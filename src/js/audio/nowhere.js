import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS } from './common'

const audioUrls = [
	'/audio/nowhere/iteration2.mp3',
	'/audio/nowhere/iteration3.mp3',
	'/audio/nowhere/iteration4.mp3',
	'/audio/nowhere/iteration5.mp3',
	'/audio/nowhere/iteration6.mp3',
	'/audio/nowhere/iteration7.mp3',
	'/audio/nowhere/iteration8.mp3',
	'/audio/nowhere/iteration9.mp3',
	'/audio/nowhere/iteration10.mp3',
	'/audio/nowhere/iteration11.mp3',
	'/audio/nowhere/iteration12.mp3',
	'/audio/nowhere/iteration13.mp3',
	'/audio/nowhere/nowhere.mp3',
	'/audio/nowhere/slowly.mp3',
]

let nowhereAudio = new Tone.Players(audioUrls).toDestination()

nowhereAudio._buffers._buffers.forEach((_, index) => {
	nowhereAudio.player(index)
})
const instruction1 = [
	{
		range: [0, 11],
	},
]
const instruction2 = [
	{
		range: [-2000, 4000],
	},
]
const instruction3 = [
	{
		value: 12,
		name: 'nowhere',
		probability: 0.5,
	},
	{
		value: 13,
		name: 'slowly',
		probability: 0.5,
		followedBy: ['rest'],
	},
	{
		value: null,
		name: 'rest',
		probability: 0.4,
	},
]
const randomIndexGenerator = new Stochastic(instruction1)
const randomJitterGenerator = new Stochastic(instruction2)
const textIndexGenerator = new Stochastic(instruction3)
let video
let loop = new Tone.Loop((time) => {
	let currentIndex = randomIndexGenerator.next()
	let textIndex = textIndexGenerator.next()
	let randomJitter = msToS(randomJitterGenerator.next())
	console.log(currentIndex)
	console.log(randomJitter)
	let currentPlayer = nowhereAudio.player(currentIndex)
	currentPlayer.start()
	if (textIndex != null) {
		nowhereAudio
			.player(textIndex)
			.start(time + currentPlayer.buffer.duration + randomJitter - 2)
	}

	loop.interval = time + currentPlayer.buffer.duration + randomJitter
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	loop.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = () => {
	video.current.pause()
	video.current.currentTime = 0
	loop.stop(Tone.immediate())
	nowhereAudio.stopAll()
	Tone.Transport.stop()
}

export { onStart, onStop, init }
