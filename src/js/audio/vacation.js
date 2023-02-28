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
const random = new Stochastic(instruction1)
const randomDuration = new Stochastic([{ range: [0, 6] }])
const randomRepeatDuration = new Stochastic([{ range: [0, 2] }])
const randomRepeatLoop2 = new Stochastic([{ range: [35, 65] }])
const operatorRandom = new Stochastic([{ range: [0, 4] }])
const waterRandom = new Stochastic([{ range: [4, 19] }])
const operatorJitter = new Stochastic([{ range: [15, 32] }])
const waterJitter = new Stochastic([{ range: [400, 800] }])

vacationAudio.volume.value = -13
vacationAudio2.volume.value = 2

let loopWaves = new RandomMetro(() => {
	let timing
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
	return { interval: sToMs(timing) }
})

let loopText = new RandomMetro(() => {
	vacationAudio2.player(20).start(1)
	return { interval: sToMs(randomRepeatLoop2.next()) }
})

let loopOperator = new RandomMetro(() => {
	let operatorIndex = operatorRandom.next()
	let waterIndex = waterRandom.next()
	let waterOffset = waterJitter.next() / 100
	//let playerDuration = vacationAudio2.player(operatorIndex).buffer.duration
	vacationAudio2.player(operatorIndex).start()
	vacationAudio2.player(waterIndex).start(Tone.now() + waterOffset)
	return { interval: sToMs(operatorJitter.next()) }
})

const init = (args) => {
	video = args.video
	video.current.loop = true
}

const onResize = ({ width, height }) => {
	const animation = {
		animationName: 'horizontal-scroll',
		animationDuration: '40s',
		animationDirection: 'alternate',
		animationIterationCount: 'infinite',
		animationTimingFunction: 'linear',
	}

	const noAnimation = {
		animation: 'none',
	}

	const styles = height > width ? animation : noAnimation

	video?.current && Object.assign(video.current.style, styles)
}

const onStart = async (video) => {
	await Tone.start()
	loopWaves.start()
	loopText.start()
	loopOperator.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init, onResize }
