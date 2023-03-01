import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { RandomMetro } from './common'

const audioUrls = [
	'/audio/travel/travel5.mp3',
	'/audio/travel/travel4.mp3',
	'/audio/travel/travel3.mp3',
	'/audio/travel/travel2.mp3',
	'/audio/travel/travel1.mp3',
	'/audio/travel/waiting.mp3',
]

const travelAudio = new Tone.Players(audioUrls).toDestination()

travelAudio._buffers._buffers.forEach((_, index) => {
	travelAudio.player(index)
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
	return { interval: Math.ceil(playerDuration) + jitterDuration }
})

const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	loop.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	loop.stop()
	Tone.Transport.stop()
	travelAudio.stopAll()
	video.current.currentTime = 0
}

export { onStart, onStop, init }
