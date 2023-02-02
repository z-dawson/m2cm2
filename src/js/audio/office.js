import * as Tone from 'tone'
import wait from 'wait'
import { Urn, RandomMetro, mToMs } from '@/js/audio/common'
const { rando, randoSequence } = require('@nastyox/rando.js')

const context = new AudioContext()

const audioUrls = [
	'/audio/workspace/memory.mp3',
	'/audio/workspace/continue.mp3',
	'/audio/workspace/fading.mp3',
	'/audio/workspace/knowing.mp3',
	'/audio/workspace/changing.mp3',
	'/audio/workspace/processing.mp3',
	'/audio/workspace/programming.mp3',
	'/audio/workspace/progressing.mp3',
	'/audio/workspace/remembering.mp3',
	'/audio/workspace/returning.mp3',
	'/audio/workspace/searching.mp3',
]

let officeAudio = new Tone.Players(audioUrls).toDestination()

const urn = new Urn(audioUrls.length, 1)

officeAudio._buffers._buffers.forEach((_, index) => {
	officeAudio.player(index)
})

let playerIndex
let playerDuration
let prevPlayerDuration
let video
let loopDuration = 9
let looping = false
let loop

const init = (args) => {
	video = args.video
	video.current.addEventListener('ended', onEnd)
	video.current.addEventListener('seeking', () => {
		console.log('seeking')
	})
}

const onStart = async (video) => {
	Tone.start()
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	loop = new Tone.ToneEvent((time) => {
		console.log('event')
		console.log({ time })
		playerIndex = rando(0, 1)
		playerDuration = officeAudio.player(playerIndex).buffer.duration
		officeAudio.player(playerIndex).start(time)
		playerIndex = rando(2, 8)
		prevPlayerDuration = officeAudio.player(playerIndex).buffer.duration
		loopDuration = playerDuration + prevPlayerDuration
		console.log(loopDuration)
		officeAudio.player(playerIndex).start(time + playerDuration)
		loop.loop = true
		console.log(loop.progress)
	}).start()
	loop.loopEnd = loopDuration
}

const onEnd = (video) => {
	loop.cancel(Tone.immediate())
	Tone.Transport.stop()
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	loop.cancel(Tone.immediate())
	officeAudio.stopAll()
	Tone.Transport.stop()
}

export { onStart, onStop, init }
