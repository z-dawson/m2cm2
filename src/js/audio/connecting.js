import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'

const audioUrls = [
	'/audio/Connecting/connecting.mp3',
	'/audio/Connecting/connecting5.mp3',
	'/audio/Connecting/connecting4.mp3',
	'/audio/Connecting/connecting3.mp3',
	'/audio/Connecting/connecting2.mp3',
	'/audio/Connecting/connecting1.mp3',
]
let connectingAudio = new Tone.Players(audioUrls).toDestination()

connectingAudio._buffers._buffers.forEach((_, index) => {
	connectingAudio.player(index)
})

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
	return {interval: sToMs(timingSound)}
})

let loopText = new RandomMetro(() => {
	connectingAudio.player(0).start()
	timingText = randomIntervalText.next()
	return {interval: sToMs(timingText)}
})

const onStart = async (video) => {
	await Tone.start()
	loopSound.start()
	loopText.start()
}
const onStop = (video) => {
	video.current.pause()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop }
