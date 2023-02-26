import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'
const audioUrls1 = [
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-4.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-5.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-6.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-7.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-8.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303]-9.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132303].mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-4.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-5.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-6.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-7.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-8.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-9.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-10.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-11.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-12.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-13.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-14.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-15.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-16.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-17.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-18.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-19.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-20.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-21.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-22.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-23.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-24.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-25.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-26.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-27.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-28.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-29.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-30.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-31.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-32.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-33.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-34.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-35.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-36.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-37.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-38.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-39.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-40.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304]-41.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132304].mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-4.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-5.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-6.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305]-7.mp3',
	'/audio/Concert/Piano Sample1 Clips/S0_11 - Concert - Piano Clips [2022-12-22 132305].mp3',
]
const audioUrls2 = [
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-2.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-3.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-4.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-5.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-6.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-7.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-8.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-9.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-10.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-11.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-12.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-13.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-14.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847]-15.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135847].mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-2.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-3.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-4.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-5.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-6.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-7.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-8.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848]-9.mp3',
	'/audio/Concert/Piano Sample2 Clips/S0_11 - Concert - Piano Clips [2022-12-22 135848].mp3',
]

let concertAudio1 = new Tone.Players(audioUrls1).toDestination()

concertAudio1._buffers._buffers.forEach((_, index) => {
	concertAudio1.player(index)
})

let concertAudio2 = new Tone.Players(audioUrls2).toDestination()

concertAudio2._buffers._buffers.forEach((_, index) => {
	concertAudio2.player(index)
})

let video

const init = (args) => {
	video = args.video
	video.current.loop = true
}
concertAudio1.fadeOut = 0.02
concertAudio1.fadeIn = 0.02
concertAudio2.fadeOut = 0.02
concertAudio2.fadeIn = 0.02
const instruction1 = [{ range: [0, 59] }]
const instruction2 = [{ range: [0, 25] }]
const instruction3 = [
	{ value: 1, followedBy: ['bank2'], name: 'bank1' },
	{ value: 2, followedBy: ['bank1'], name: 'bank2' },
]
const instruction4 = [{ range: [12, 26] }]
let randomBank1 = new Stochastic(instruction1)
let randomBank2 = new Stochastic(instruction2)
let bankSelector = new Stochastic(instruction3)
let randomTiming = new Stochastic(instruction4)

let loop1 = new Tone.Loop((time) => {
	console.log('loop1')
	let playerDuration
	let playerIndex = randomBank1.next()
	concertAudio1.player(playerIndex).start(Tone.now())
	playerDuration = concertAudio1.player(playerIndex).buffer.duration
	loop1.interval = playerDuration
	console.log('volumeAudio1 ' + concertAudio1.volume.value)
})
let loop2 = new Tone.Loop((time) => {
	console.log('loop2')
	let playerDuration
	let playerIndex = randomBank2.next()
	concertAudio2.player(playerIndex).start(Tone.now())
	playerDuration = concertAudio2.player(playerIndex).buffer.duration
	loop2.interval = playerDuration
	console.log('volumeAudio2 ' + concertAudio2.volume.value)
})

const timeSelector = new RandomMetro(() => {
	console.log('timeSelector')
	if (bankSelector.next() == 1) {
		concertAudio1.volume.rampTo(0, 0.05)
		concertAudio2.volume.rampTo(-80, 0.05)
	} else {
		concertAudio1.volume.rampTo(-80, 0.05)
		concertAudio2.volume.rampTo(0, 0.05)
	}
})
const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	loop1.start()
	loop2.start()
	timeSelector.start({
		nextInterval: () => {
			return sToMs(randomTiming.next())
		},
	})
}

const onStop = () => {
	timeSelector.stop()
}

export { onStart, onStop, init }
