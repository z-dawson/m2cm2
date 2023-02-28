import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, randomInt, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'

const waveUrls = [
	'/audio/vacation/Small Wave.mp3',
	'/audio/vacation/Medium Wave.mp3',
	'/audio/vacation/Large Wave.mp3',
]
const operatorUrls = [
	'/audio/vacation/Operator/Operator 1.mp3',
	'/audio/vacation/Operator/Operator 2.mp3',
	'/audio/vacation/Operator/Operator 3.mp3',
	'/audio/vacation/Operator/Operator 4.mp3',
]

const waterUrls = [
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
]

const voiceUrl = '/audio/vacation/forgetting.mp3'

const voicePlayer = new Tone.Player(voiceUrl).toDestination()

const wavePanner = new Tone.Panner(0).toDestination()
const operatorPanner = new Tone.Panner(0).toDestination()
const waterPanner = new Tone.Panner(0).toDestination()

const wavePlayers = new Tone.Players(waveUrls).connect(wavePanner)
const operatorPlayers = new Tone.Players(operatorUrls).connect(operatorPanner)
const waterPlayers = new Tone.Players(waterUrls).connect(waterPanner)

wavePlayers._buffers._buffers.forEach((_, index) => {
	wavePlayers.player(index)
})

operatorPlayers._buffers._buffers.forEach((_, index) => {
	operatorPlayers.player(index)
})

waterPlayers._buffers._buffers.forEach((_, index) => {
	waterPlayers.player(index)
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
const randomWave = new Stochastic(instruction1)

wavePlayers.volume.value = -15
operatorPlayers.volume.value = 5
waterPlayers.volume.value = 3

const loopWaves = new RandomMetro(() => {
	let interval
	const playerIndex = randomWave.next()
	if (playerIndex != null) {
		const jitterDuration = randomInt(0, 2)
		const selectedPlayer = wavePlayers.player(playerIndex)
		const playerDuration = selectedPlayer.buffer.duration
		const amount = 0.7
		const initPan = randomInt(0, 2) ? amount : -amount
		console.log({ initPan })
		wavePanner.pan.value = initPan
		wavePanner.pan.rampTo(-initPan, selectedPlayer.buffer.duration)
		selectedPlayer.start()
		console.log('playerduration ' + playerDuration)
		interval = playerDuration + jitterDuration
	} else {
		const jitterDuration = randomInt(0, 6)
		console.log('else' + jitterDuration)
		interval = jitterDuration
	}
	return { interval: sToMs(interval) }
})

const loopVoice = new RandomMetro(() => {
	voicePlayer.start(1)
	return { interval: sToMs(randomInt(35, 65)) }
})

const loopOperatorAndWater = new RandomMetro(() => {
	const waterOffset = randomInt(400, 800) / 100
	//let playerDuration = vacationAudio2.player(operatorIndex).buffer.duration
	const initPan = randomInt(0, 2) ? 1 : -1
	const playerIndex = randomInt(0, operatorUrls.length - 1)
	const selectedPlayer = operatorPlayers.player(playerIndex)
	operatorPanner.pan.value = initPan
	operatorPanner.pan.rampTo(-initPan, selectedPlayer.buffer.duration)
	selectedPlayer.start()
	waterPanner.pan.value = [-0.8, 0, 0.8][randomInt(0, 3)]
	waterPlayers
		.player(randomInt(0, waterUrls.length))
		.start(Tone.now() + waterOffset)
	return { interval: sToMs(randomInt(15, 32)) }
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
	loopVoice.start()
	loopOperatorAndWater.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	Tone.Transport.stop()
	loopWaves.stop()
	loopVoice.stop()
	loopOperatorAndWater.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init, onResize }
