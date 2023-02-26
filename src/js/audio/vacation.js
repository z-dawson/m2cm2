import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'

const audioUrls = [
	'/audio/vacation/Small Wave.mp3',
	'/audio/vacation/Medium Wave.mp3',
	'/audio/vacation/Large Wave.mp3',
]
const audioUrls2 = [
	'/audio/vacation/Operator/Operator 1.mp3',
	'/audio/vacation/Operator/Operator 2.mp3',
	'/audio/vacation/Operator/Operator 3.mp3',
	'/audio/vacation/Operator/Operator 4.mp3',
	'/audio/vacation/Water Slices/Water 01.mp3',
	'/audio/vacation/Water Slices/Water 02.mp3',
	'/audio/vacation/Water Slices/Water 03.mp3',
	'/audio/vacation/Water Slices/Water 04.mp3',
	'/audio/vacation/Water Slices/Water 05.mp3',
	'/audio/vacation/Water Slices/Water 06.mp3',
	'/audio/vacation/Water Slices/Water 07.mp3',
	'/audio/vacation/Water Slices/Water 08.mp3',
	'/audio/vacation/Water Slices/Water 09.mp3',
	'audio/vacation/Water Slices/Water 010.mp3',
	'audio/vacation/Water Slices/Water 011.mp3',
	'audio/vacation/Water Slices/Water 012.mp3',
	'audio/vacation/Water Slices/Water 013.mp3',
	'audio/vacation/Water Slices/Water 014.mp3',
	'audio/vacation/Water Slices/Water 015.mp3',
	'audio/vacation/Water Slices/Water 016.mp3',
	'/audio/vacation/forgetting.mp3',
]

let vacationAudio = new Tone.Players(audioUrls).toDestination()

vacationAudio._buffers._buffers.forEach((_, index) => {
	vacationAudio.player(index)
})

let vacationAudio2 = new Tone.Players(audioUrls2).toDestination()

vacationAudio2._buffers._buffers.forEach((_, index) => {
	vacationAudio2.player(index)
})

let video

const instruction1 = [
	{
		value: 0,
		repeat: [0, 8],
		name: 'smallWaves',
		probability: 1,
		followedBy: ['largeWaves'],
	},
	{
		range: [1, 2],
		repeat: [0, 3],
		name: 'largeWaves',
		probability: 0,
		followedBy: ['rest'],
	},
	{
		value: null,
		name: 'rest',
		probability: 0,
		followedBy: ['smallWaves'],
	},
]
const instruction2 = [{ range: [0, 6] }]
const instruction3 = [{ range: [0, 2] }]
const instruction4 = [{ range: [35, 65] }]
const instruction5 = [{ range: [0, 4] }]
const instruction6 = [{ range: [4, 19] }]
const instruction7 = [{ range: [15, 32] }]
const instruction8 = [{ range: [400, 800] }]
const random = new Stochastic(instruction1)
const randomDuration = new Stochastic(instruction2)
const randomRepeatDuration = new Stochastic(instruction3)
const randomRepeatLoop2 = new Stochastic(instruction4)
const operatorRandom = new Stochastic(instruction5)
const waterRandom = new Stochastic(instruction6)
const operatorJitter = new Stochastic(instruction7)
const waterJitter = new Stochastic(instruction8)

let timing
let timing2 = randomRepeatLoop2.next()
let timingOperator = operatorJitter.next()
vacationAudio.volume.value = -10
vacationAudio2.volume.value = 6

let loopWaves = new RandomMetro(() => {
	let playerIndex = random.next()
	console.log(playerIndex)
	if (playerIndex != null) {
		let JitterDuration
		JitterDuration = randomRepeatDuration.next()
		let playerDuration = vacationAudio.player(playerIndex).buffer.duration
		console.log('playerduration ' + playerDuration)
		vacationAudio.player(playerIndex).start()
		timing = playerDuration + JitterDuration
	} else {
		let JitterDuration = randomDuration.next()
		console.log('else' + JitterDuration)
		timing = JitterDuration
	}
})

let loopText = new RandomMetro(() => {
	vacationAudio2.player(20).start(1)
	timing2 = randomRepeatLoop2.next()
})
let loopOperator = new RandomMetro(() => {
	let operatorIndex = operatorRandom.next()
	let waterIndex = waterRandom.next()
	let waterOffset = waterJitter.next() / 100
	//let playerDuration = vacationAudio2.player(operatorIndex).buffer.duration
	vacationAudio2.player(operatorIndex).start()
	vacationAudio2.player(waterIndex).start(Tone.now() + waterOffset)
})
const init = (args) => {
	video = args.video
	video.current.loop = true
}

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
