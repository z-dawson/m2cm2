import * as Tone from 'tone'
import Stochastic from '@/js/audio/stochastic.js'
import { RandomMetro } from './common'
import { sToMs } from './common'

const audioUrls1 = [
	'Freeze Piano Concerto (S1) [2023-02-28 131921].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131951].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131952]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131952]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131952]-3.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131952].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131953]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131953].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131954]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131954].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131955].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131956]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131956]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131956]-3.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131956].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131957]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131957]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131957]-3.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131957].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131958]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131958].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131959]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 131959].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132000]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132000].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132001].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132002]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132002]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132002].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132003]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132003].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132004]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132004]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132004].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132005]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132005]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132005].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132006].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132008]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132008]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132008].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132009]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132009].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132010]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132010]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132010]-3.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132010]-4.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132010].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132011]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132011].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132013]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132013].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132014]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132014]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132014]-3.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132014].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132015]-1.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132015]-2.mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132015].mp3',
	'Freeze Piano Concerto (S1) [2023-02-28 132016].mp3',
]
const audioUrls2 = [
	'Freeze Piano Concerto (S2) [2023-02-28 134240]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134216].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134240].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134241].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134242].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134243]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134243]-2.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134243].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134244]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134244].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134245]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134245].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134246].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134247]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134247].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134248]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134248].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134249]-1.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134249]-2.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134249]-3.mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134249].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134250].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134251].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134252].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134254].mp3',
	'Freeze Piano Concerto (S2) [2023-02-28 134255].mp3',
]

let concertAudio1, concertAudio2

const loaded1 = new Promise((resolve) => {
	concertAudio1 = new Tone.Players({
		urls: audioUrls1,
		onload: resolve,
		baseUrl: '/audio/Concert/Piano Sample1 Clips/',
	}).toDestination()
})

const loaded2 = new Promise((resolve) => {
	concertAudio2 = new Tone.Players({
		urls: audioUrls2,
		onload: resolve,
		baseUrl: '/audio/Concert/Piano Sample2 Clips/',
	}).toDestination()
})

let video
let video2
const init = (args) => {
	video = args.video
	video.current.loop = true
	video2 = args.video2
}

concertAudio1.fadeOut = 0.02
concertAudio1.fadeIn = 0.02
concertAudio2.fadeOut = 0.02
concertAudio2.fadeIn = 0.02

const instruction3 = [
	{ value: 1, followedBy: ['bank2'], name: 'bank1', probability: 1 },
	{ value: 2, followedBy: ['bank1'], name: 'bank2', probability: 0 },
]
const randomBank1 = new Stochastic([{ range: [0, 59] }])
const randomBank2 = new Stochastic([{ range: [0, 25] }])
const bankSelector = new Stochastic(instruction3)
const randomTiming1 = new Stochastic([{ range: [14, 30] }])
const randomTiming2 = new Stochastic([{ range: [16, 24] }])
const loop1 = new Tone.Loop(() => {
	console.log('loop1')
	let playerIndex = randomBank1.next()
	const selectedPlayer = concertAudio1.player(playerIndex)
	selectedPlayer.start(Tone.now())
	loop1.interval = selectedPlayer.buffer.duration
	console.log('volumeAudio1 ' + concertAudio1.volume.value)
})

const loop2 = new Tone.Loop(() => {
	console.log('loop2')
	const playerIndex = randomBank2.next()
	const selectedPlayer = concertAudio2.player(playerIndex)
	selectedPlayer.start(Tone.now())
	loop2.interval = selectedPlayer.buffer.duration
	console.log('volumeAudio2 ' + concertAudio2.volume.value)
})

const timeSelector = new RandomMetro(() => {
	console.log('timeSelector')
	if (bankSelector.next() == 1) {
		video.current.currentTime = 0
		concertAudio1.volume.rampTo(0, 0.05)
		concertAudio2.volume.rampTo(-80, 0.05)
		video.current.style.visibility = 'visible'
		video2.current.style.visibility = 'hidden'
		return { interval: sToMs(randomTiming1.next()) }
	} else {
		video2.current.currentTime = 0
		video2.current.play()
		video2.current.style.visibility = 'visible'
		video.current.style.visibility = 'hidden'
		concertAudio1.volume.rampTo(-80, 0.05)
		concertAudio2.volume.rampTo(0, 0.05)
		return { interval: sToMs(randomTiming2.next()) }
	}
})

const onStart = async (video) => {
	await Promise.all([Tone.start(), loaded1, loaded2])
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	video2.current.currentTime = 0
	video2.current.play()
	loop1.start()
	loop2.start()
	timeSelector.start()
}

const onStop = () => {
	timeSelector.stop()
	loop1.stop()
	loop2.stop()
	concertAudio1.stopAll()
	concertAudio2.stopAll()
	video?.current?.pause?.()
	video2?.current?.pause?.()
	;[(video, video2)].forEach((v) => {
		if (v.current) {
			v.current.pause()
			v.current.currentTime = 0
		}
	})
}

export { onStart, onStop, init }
