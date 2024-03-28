import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { randomInt, RandomMetro } from './common'
import { sToMs } from './common'

const waveUrls = ['Small Wave.mp3', 'Medium Wave.mp3', 'Large Wave.mp3']
const operatorUrls = [
	'Operator/Operator 1.mp3',
	'Operator/Operator 2.mp3',
	'Operator/Operator 3.mp3',
	'Operator/Operator 4.mp3',
]

const waterUrls = [
	'Water Slices/Water 01.mp3',
	'Water Slices/Water 02.mp3',
	'Water Slices/Water 03.mp3',
	'Water Slices/Water 04.mp3',
	'Water Slices/Water 05.mp3',
	'Water Slices/Water 06.mp3',
	'Water Slices/Water 07.mp3',
	'Water Slices/Water 08.mp3',
	'Water Slices/Water 09.mp3',
	'Water Slices/Water 010.mp3',
	'Water Slices/Water 011.mp3',
	'Water Slices/Water 012.mp3',
	'Water Slices/Water 013.mp3',
	'Water Slices/Water 014.mp3',
	'Water Slices/Water 015.mp3',
	'Water Slices/Water 016.mp3',
]

const baseUrl = '/audio/vacation/'

const voiceUrl = 'forgetting.mp3'

let voicePlayer

const voiceLoaded = new Promise((resolve) => {
	voicePlayer = new Tone.Player({
		url: baseUrl + voiceUrl,
		onload: resolve,
	}).toDestination()
})

const wavePanner = new Tone.Panner(0).toDestination()
const operatorPanner = new Tone.Panner(0).toDestination()
const waterPanner = new Tone.Panner(0).toDestination()

let wavePlayers, operatorPlayers, waterPlayers

const loaded = new Promise((resolve) => {
	let index = 0
	const onload = () => {
		console.log(index)
		if (++index > 2) resolve()
	}

	wavePlayers = new Tone.Players({
		urls: waveUrls,
		baseUrl,
		onload,
	}).connect(wavePanner)
	operatorPlayers = new Tone.Players({
		urls: operatorUrls,
		baseUrl,
		onload,
	}).connect(operatorPanner)
	waterPlayers = new Tone.Players({
		urls: waterUrls,
		baseUrl,
		onload,
	}).connect(waterPanner)
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
voicePlayer.volume.value = -6

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
	return {
		interval: sToMs(interval),
		clear: () => {
			if (playerIndex != null) {
				wavePlayers.player(playerIndex).stop()
			}
		},
	}
})

const loopVoice = new RandomMetro(({ count }) => {
	if (count !== 0) voicePlayer.start()
	return {
		interval: sToMs(randomInt(140, 200)),
		clear: () => {
			voicePlayer.stop()
		},
	}
})

const loopOperatorAndWater = new RandomMetro(() => {
	const waterOffset = randomInt(400, 800) / 100
	//let playerDuration = vacationAudio2.player(operatorIndex).buffer.duration
	const initPan = randomInt(0, 2) ? 1 : -1
	const operatorIndex = randomInt(0, operatorUrls.length - 1)
	const selectedPlayer = operatorPlayers.player(operatorIndex)
	operatorPanner.pan.value = initPan
	operatorPanner.pan.rampTo(-initPan, selectedPlayer.buffer.duration)
	selectedPlayer.start()
	waterPanner.pan.value = [-0.8, 0, 0.8][randomInt(0, 3)]
	const waterIndex = randomInt(waterUrls.length)
	waterPlayers.player(waterIndex).start(Tone.now() + waterOffset)
	return {
		interval: sToMs(randomInt(15, 32)),
		clear: () => {
			waterPlayers.player(waterIndex).stop()
			operatorPlayers.player(operatorIndex).stop()
		},
	}
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

const start = async (video) => {
	await Promise.all([Tone.start(), loaded, voiceLoaded])
	voicePlayer.volume.value = -13
	loopWaves.start()
	loopVoice.start()
	loopOperatorAndWater.start()
	video.current.currentTime = 0
	video.current.play()
}

const stop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	Tone.Transport.stop()
	loopWaves.stop()
	loopVoice.stop()
	loopOperatorAndWater.stop()
}

export { start, stop, init, onResize }
