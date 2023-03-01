import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro, sToMs } from './common'

const audioUrls = [
	'/audio/nowhere/iteration1.mp3',
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
	'/audio/nowhere/nowhere.mp3',
	'/audio/nowhere/slowly.mp3',
]

const nowhereAudio = new Tone.Players(audioUrls).toDestination()

nowhereAudio._buffers._buffers.forEach((_, index) => {
	nowhereAudio.player(index)
})

const randomIndexGenerator = new Stochastic([{ range: [0, 11] }])
const randomJitterGenerator = new Stochastic([{ range: [-2000, 4000] }])

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
		probability: 0.5,
	},
]

const textIndexGenerator = new Stochastic(instruction3)

let video
const reverbDuration = 10
const loop = new RandomMetro(() => {
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
