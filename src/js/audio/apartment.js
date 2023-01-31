import * as Tone from 'tone'
import { Urn } from '@/js/audio/common'
// const { rando, randoSequence } = require('@nastyox/rando.js')

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

apartmentAudio._buffers._buffers.forEach((_, index) => {
	apartmentAudio.player(index).sync()
})

apartmentAudio.fadeOut = 0.3
apartmentAudio.fadeIn = 0.08
let playerIndex
let apartmentAudioEvent
Tone.Transport.debug = true

const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	video.current.currentTime = 0
	await video.current.play()
	apartmentAudioEvent = new Tone.ToneEvent((time) => {
		playerIndex = urn.next()
		console.log({ playerIndex })
		apartmentAudio
			.player(playerIndex)
			.start(time)
			.stop(time + video.current.duration)
	})
	apartmentAudioEvent.start()
	apartmentAudioEvent.loop = true
	apartmentAudioEvent.loopEnd = Tone.now() + video.current.duration
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	apartmentAudioEvent.stop()
	apartmentAudio.stopAll()
	Tone.Transport.stop()
	Tone.Transport.cancel()
}

export { onStart, onStop }
