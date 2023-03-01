import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'

const audioUrls = [
	'/audio/sonyEricsson/S0_05 - Sony Ericsson.mp3',
	'/audio/sonyEricsson/5thSentence.mp3',
	'/audio/sonyEricsson/4thSentence.mp3',
	'/audio/sonyEricsson/3rdSentence.mp3',
	'/audio/sonyEricsson/2ndSentence.mp3',
	'/audio/sonyEricsson/1stSentence.mp3',
]
let video
let timingSound
let timingText
let sonyAudio = new Tone.Players(audioUrls).toDestination()

sonyAudio._buffers._buffers.forEach((_, index) => {
	sonyAudio.player(index)
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

let instruction1 = [{ range: [1, 5] }]

let loop = new RandomMetro(() => {
    
const onStart = async (video) => {
	await Tone.start()
	timing = vacationAudio.player(0).buffer.duration
	console.log('Timing' + vacationAudio.player(2).buffer.duration)
	loopWaves.start({
		nextInterval: () => {
			return sToMs(timing)
		},
	})
	loopText.start({
		nextInterval: () => {
			return sToMs(timing2)
		},
	})
	loopOperator.start({
		nextInterval: () => {
			return sToMs(timingOperator)
		},
	})
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init }
