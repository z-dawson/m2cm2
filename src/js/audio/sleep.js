import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro, sToMs, getNumFilenames } from './common'

const urls = ['empty.mp3', ...getNumFilenames(56)]
let sleepAudio

const loaded = new Promise((resolve) => {
	sleepAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: '/audio/Sleep/',
	}).toDestination()
})
let video
sleepAudio.fadeOut = 0.02
sleepAudio.fadeIn = 0.02

const init = (args) => {
	video = args.video
	video.current.loop = true
}

const instruction1 = [
	{ value: 1, probability: 0.5, name: 'normalShuffle' },
	{ value: 2, probability: 0.25, repeat: [3, 15], name: 'glitchedShuffle' },
	{ value: null, probability: 0.25, name: 'rest' },
]
const shuffleMode = new Stochastic(instruction1)
const audioShuffle = new Stochastic([{ range: [1, 56] }])
const fastRepeats = new Stochastic([{ range: [80, 190] }])
const rest = new Stochastic([{ range: [1.5, 4.5] }])
let playerIndex = 1

const loop = new RandomMetro(() => {
	sleepAudio.player(0).volume.value = -13
	let Timing
	const shuffleState = shuffleMode.next()
	const glitchTime = msToS(fastRepeats.next())
	sleepAudio.player(playerIndex).stop()
	playerIndex = audioShuffle.next()
	const selectedPlayer = sleepAudio.player(playerIndex)
	selectedPlayer.start(Tone.now())
	const playerDuration = selectedPlayer.buffer.duration
	//console.log('loop1')
	console.log({ shuffleState })
	switch (shuffleState) {
		case null:
			Timing = playerDuration + rest.next()
			//console.log('rest')
			break
		case 1:
			Timing = playerDuration
			//console.log('normalPlay')
			break
		case 2:
			video.current.currentTime = 1
			Timing = glitchTime
			// console.log(glitchTime)
			console.log('glitch')
	}
	return { interval: sToMs(Timing) }
	//console.log(Timing + ' ScheduledTime')
})

const loopVoice = new Tone.Loop((time) => {
	sleepAudio.player(0).start(time)
	// console.log('previousInterval ' + loopVoice.interval)
	loopVoice.interval = 120
	// console.log('currentInterval ' + loopVoice.interval)
	// console.log('TimeNow ' + time)
	sleepAudio.player(0).stop(time + sleepAudio.player(0).buffer.duration)
})

const onStart = async (video) => {
	await Promise.all([Tone.start(), loaded])
	Tone.Transport.start()
	loop.start()
	loopVoice.start(60)
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}

	// loop.cancel(Tone.now())
	loop.stop()
	loopVoice.stop()
	sleepAudio.player(playerIndex).stop()
	sleepAudio.player(0).stop()
	Tone.Transport.stop()
}

export { onStart, onStop, init }
