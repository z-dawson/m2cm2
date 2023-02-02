import * as Tone from 'tone'
import wait from 'wait'
import { Urn, RandomMetro, mToMs } from '@/js/audio/common'
const { rando, randoSequence } = require('@nastyox/rando.js')

const context = new AudioContext()

const audioUrls = [
	'/audio/apartment/S0_03 a.mp3',
	'/audio/apartment/S0_03 b.mp3',
	'/audio/apartment/S0_03 c.mp3',
	'/audio/apartment/S0_03 d.mp3',
	'/audio/apartment/S0_03 e.mp3',
	'/audio/apartment/S0_03 f.mp3',
]

let apartmentAudio = new Tone.Players(audioUrls).toDestination()

const urn = new Urn(audioUrls.length, 1)
let randomMetro

apartmentAudio._buffers._buffers.forEach((_, index) => {
	apartmentAudio.player(index)
})

apartmentAudio.fadeOut = 0.3
apartmentAudio.fadeIn = 0.08
let playerIndex
let video
let looping = false
Tone.Transport.debug = true

const init = (args) => {
	video = args.video
	video.current.addEventListener('playing', onLoop)
	video.current.addEventListener('seeking', () => {
		console.log('seeking')
	})
	randomMetro = new RandomMetro(
		console.log,
		mToMs(video.current.duration) / 2,
		mToMs(video.current.duration) * 2
	)
}

const onStart = async (video) => {
	video.current.currentTime = 0
	video.current.play()
	Tone.start()

	await wait(1000)
	randomMetro.start(() => {
		let count = 0
		let max = rando(2, 5)
		const time = video.current.duration * rando(1, 'float')
		looping = true
		const intervalReference = setInterval(() => {
			if (count >= max) {
				looping = false
				clearInterval(intervalReference)
			}
			video.current.currentTime = time
			apartmentAudio.player(playerIndex).seek(time)
			count = count + 1
		}, rando(200, 1500))
	})
}

const onLoop = (video) => {
	if (!looping) {
		console.log('playing')
		const prevPlayerIndex = urn.discarded[urn.discarded.length - 1]
		if (prevPlayerIndex) apartmentAudio.player(prevPlayerIndex).stop()

		playerIndex = urn.next()
		console.log(playerIndex)
		apartmentAudio.player(playerIndex).start(Tone.now())
	}
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	apartmentAudio.player(playerIndex).stop()
	randomMetro.stop()
}

export { onStart, onStop, init }
