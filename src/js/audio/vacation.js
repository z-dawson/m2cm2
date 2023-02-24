import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { mToMs } from './common'

const audioUrls = [
	'/audio/vacation/Small Wave.mp3',
	'/audio/vacation/Medium Wave.mp3',
	'/audio/vacation/Large Wave.mp3',
	'/audio/vacation/forgetting.mp3',
]

let vacationAudio = new Tone.Players(audioUrls).toDestination()

vacationAudio._buffers._buffers.forEach((_, index) => {
	vacationAudio.player(index)
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
const instruction3 = [{ range: [-3, 2] }]
const instruction4 = [{ range: [16, 25] }]
const random = new Stochastic(instruction1)
const randomDuration = new Stochastic(instruction2)
const randomRepeatDuration = new Stochastic(instruction3)
const randomRepeatLoop2 = new Stochastic(instruction4)
let playerDuration
let playerIndex

let loop = new Tone.Loop((time) => {
	playerIndex = random.next()
	console.log(playerIndex)
	let JitterDuration
	if (playerIndex != null) {
		JitterDuration = randomRepeatDuration.next()
		console.log('jitterDuration ' + JitterDuration)
		playerDuration = vacationAudio.player(playerIndex).buffer.duration
		vacationAudio.player(playerIndex).start(time)
		loop.interval = time + playerDuration + JitterDuration
		console.log('totalInterval ' + loop.interval)
	} else {
		let JitterDuration = randomDuration.next()
		console.log(JitterDuration)
		loop.interval = time + JitterDuration
	}
})

let loop2 = new Tone.Loop((time) => {
	let textRepeat
	vacationAudio.player(3).start(time)
	textRepeat = randomRepeatLoop2.next()
	loop2.interval = time + textRepeat
})
const init = (args) => {
	video = args.video
	video.current.loop = true
}

const onStart = async (video) => {
	await Tone.start()
	Tone.Transport.start()
	loop.start()
	loop2.start()
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	loop.cancel(Tone.now())
	loop.stop()
	vacationAudio.player(playerIndex).stop()
	Tone.Transport.stop()
	video.current.currentTime = 0
}

export { onStart, onStop, init }
