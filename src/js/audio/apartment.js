import * as Tone from 'tone'
import { randomRange } from '@/js/audio/common'
const { rando, randoSequence } = require('@nastyox/rando.js')

let apartmentAudio = new Tone.Players([
	'/audio/apartment/S0_03 a.mp3',
	'/audio/apartment/S0_03 b.mp3',
	'/audio/apartment/S0_03 c.mp3',
	'/audio/apartment/S0_03 d.mp3',
	'/audio/apartment/S0_03 e.mp3',
	'/audio/apartment/S0_03 f.mp3',
]).toDestination()

apartmentAudio._buffers._buffers.forEach((_, index) => {
	apartmentAudio.player(index).sync()
})

apartmentAudio.fadeOut = 0.3
apartmentAudio.fadeIn = 0.08
let a
let id
let apartmentAudioEvent
Tone.Transport.debug = true

const onStart = async (video) => {
	console.log(apartmentAudio._players)
	await Tone.start()
	Tone.Transport.start()
	video.current.currentTime = 0
	await video.current.play()
	apartmentAudioEvent = new Tone.ToneEvent((time) => {
		a = randomRange(0, 5)
		apartmentAudio
			.player(a)
			.start(time)
			.stop(time + video.current.duration)
	})
	apartmentAudioEvent.start()
	apartmentAudioEvent.loop = true
	console.log(Tone.now() + video.current.duration)
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
