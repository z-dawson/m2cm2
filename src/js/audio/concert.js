import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { msToS, RandomMetro } from './common'
import { sToMs } from './common'
import { randomRange } from './common'
const audioUrls1 = [
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131921].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131951].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131952]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131952]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131952]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131952].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131953]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131953].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131954]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131954].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131955].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131956]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131956]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131956]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131956].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131957]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131957]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131957]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131957].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131958]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131958].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131959]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 131959].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132000]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132000].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132001].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132002]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132002]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132002].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132003]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132003].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132004]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132004]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132004].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132005]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132005]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132005].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132006].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132008]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132008]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132008].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132009]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132009].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132010]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132010]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132010]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132010]-4.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132010].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132011]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132011].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132013]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132013].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132014]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132014]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132014]-3.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132014].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132015]-1.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132015]-2.mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132015].mp3',
	'/audio/Concert/Piano Sample1 Clips/Freeze Piano Concerto (S1) [2023-02-28 132016].mp3',
]
const audioUrls2 = [
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134240]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134216].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134240].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134241].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134242].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134243]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134243]-2.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134243].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134244]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134244].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134245]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134245].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134246].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134247]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134247].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134248]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134248].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134249]-1.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134249]-2.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134249]-3.mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134249].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134250].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134251].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134252].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134254].mp3',
	'/audio/Concert/Piano Sample2 Clips/Freeze Piano Concerto (S2) [2023-02-28 134255].mp3',
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
