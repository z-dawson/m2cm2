import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro, sToMs } from './common'
import { randomRange } from './common'

const audioUrls = [
	'/audio/Sleep/empty.mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 1 [2022-12-21 183740].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 2 [2022-12-21 183747].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 3 [2022-12-21 183752].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 4 [2022-12-21 183759].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 5 [2022-12-21 183804].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 6 [2022-12-21 183814].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 7 [2022-12-21 183823].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 9 [2022-12-21 183903].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 10 [2022-12-21 183911].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 11 [2022-12-21 183922].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 12 [2022-12-21 183951].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 13 [2022-12-21 184000].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 14 [2022-12-21 184016].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 15 [2022-12-21 184028].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 17 [2022-12-21 184106].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 18 [2022-12-21 184111].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 19 [2022-12-21 184117].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 21 [2022-12-21 184125].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 23 [2022-12-21 184138].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 25 [2022-12-21 184146].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 27 [2022-12-21 184153].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 31 [2022-12-21 184215].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 32 [2022-12-21 184219].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 34 [2022-12-21 184233].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 36 [2022-12-21 184246].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 38 [2022-12-21 184259].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 39 [2022-12-21 184303].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 40 [2022-12-21 184311].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 41 [2022-12-21 184318].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 42 [2022-12-21 184327].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 44 [2022-12-21 184340].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 45 [2022-12-21 184352].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 46 [2022-12-21 184404].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 47 [2022-12-21 184410].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 48 [2022-12-21 184416].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 49 [2022-12-21 184426].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 53 [2022-12-21 184454].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 54 [2022-12-21 184501].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 55 [2022-12-21 184520].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 56 [2022-12-21 184526].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 57 [2022-12-21 184538].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 58 [2022-12-21 184551].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 61 [2022-12-21 184609].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 62 [2022-12-21 184617].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 63 [2022-12-21 184629].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 64 [2022-12-21 184635].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 66 [2022-12-21 184727].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 67 [2022-12-21 184734].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 68 [2022-12-21 184744].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 69 [2022-12-21 184753].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 70 [2022-12-21 184800].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 71 [2022-12-21 184816].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 72 [2022-12-21 184822].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 75 [2022-12-21 184840].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 76 [2022-12-21 184845].mp3',
	'/audio/Sleep/SF0_03 Sliced/Slice 77 [2022-12-21 184853].mp3',
]
let sleepAudio = new Tone.Players(audioUrls).toDestination()

sleepAudio._buffers._buffers.forEach((_, index) => {
	sleepAudio.player(index)
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
const rest = new Stochastic([{ range: [1500, 4500] }])
let playerDuration
let playerIndex = 1

let loop = new RandomMetro(() => {
	let Timing
	let shuffleState = shuffleMode.next()
	let glitchTime = msToS(fastRepeats.next())
	sleepAudio.player(playerIndex).stop(Tone.now())
	playerIndex = audioShuffle.next()
	sleepAudio.player(playerIndex).start(Tone.now())
	playerDuration = sleepAudio.player(playerIndex).buffer.duration
	//console.log('loop1')
	console.log({ shuffleState })
	switch (shuffleState) {
		case null:
			Timing = playerDuration + msToS(rest.next())
			//console.log('rest')
			break
		case 1:
			Timing = playerDuration
			//console.log('normalPlay')
			break
		case 2:
			Timing = glitchTime
			// console.log(glitchTime)
			console.log('glitch')
	}
	return { interval: sToMs(Timing) }
	//console.log(Timing + ' ScheduledTime')
})
let loopVoice = new Tone.Loop((time) => {
	sleepAudio.player(0).start(time)
	// console.log('previousInterval ' + loopVoice.interval)
	loopVoice.interval = 45
	// console.log('currentInterval ' + loopVoice.interval)
	// console.log('TimeNow ' + time)
	sleepAudio.player(0).stop(time + sleepAudio.player(0).buffer.duration)
})
const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	loop.start()
	loopVoice.start(2)
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	loop.cancel(Tone.now())
	loop.stop()
	loopVoice.stop()
	sleepAudio.player(playerIndex).stop()
	sleepAudio.player(0).stop()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init }
