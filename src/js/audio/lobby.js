import * as Tone from 'tone'
import { randomInt, Urn } from './common'
import Stochastic from './stochastic'

const audioUrls = [
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549].mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-8.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-7.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-6.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-5.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-4.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-3.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-2.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114549]-1.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548].mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-9.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-8.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-7.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-6.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-54.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-53.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-52.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-51.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-50.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-5.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-49.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-48.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-47.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-46.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-45.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-44.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-43.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-42.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-41.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-40.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-4.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-39.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-38.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-37.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-36.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-35.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-34.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-33.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-32.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-31.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-30.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-3.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-29.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-28.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-27.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-26.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-25.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-24.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-23.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-22.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-21.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-20.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-2.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-19.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-18.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-17.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-16.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-15.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-14.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-13.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-12.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-11.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-10.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114548]-1.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547].mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-9.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-8.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-7.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-6.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-51.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-50.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-5.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-49.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-48.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-47.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-46.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-45.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-44.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-43.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-42.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-41.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-40.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-4.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-39.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-38.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-37.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-36.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-35.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-34.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-33.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-32.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-31.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-30.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-3.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-29.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-28.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-27.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-26.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-25.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-24.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-23.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-22.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-21.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-20.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-2.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-19.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-18.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-17.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-16.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-15.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-14.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-13.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-12.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-11.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-10.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114547]-1.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546].mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-7.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-6.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-5.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-4.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-3.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-2.mp3',
	'S0_05 - Lobby - Chord Clips [2022-12-22 114546]-1.mp3',
]

const voiceIntervals = new Stochastic([45, 60, 15, 2 * 60, 3 * 60])

const voiceUrl = 'audio/lobby/recurring.mp3'

const voice = new Tone.Player(voiceUrl).toDestination()

const voiceLoop = new Tone.Loop((time) => {
	const randomDuration = voiceIntervals.next()
	voice.start(time)
	voiceLoop.interval = time + randomDuration
})

let players = new Tone.Players(
	audioUrls.map((url) => 'audio/lobby/' + url)
).toDestination()

const urn = new Urn(audioUrls.length, audioUrls.length - 1)
let video
let playerIndexes = []

players._buffers._buffers.forEach((_, index) => {
	players.player(index)
})

const init = (args) => {
	video = args.video
	video.current.loop = true
	Object.assign(video.current.style, {
		objectPosition: '70% 100%',
	})
	video.current.addEventListener('seeked', () => {
		if (!video?.current?.paused) onRepeat()
	})
}

const onStart = async () => {
	await Tone.start()
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	voiceLoop.start()
}

const onRepeat = () => {
	// stop prev
	urn.discarded
		.slice(urn.discarded.length - 2, urn.discarded.length)
		.forEach((index) => {
			players.player(index).stop()
		})

	playerIndexes = [urn.next(), urn.next()]
	console.log(`schedule player ${playerIndexes[0]} for door opening`)
	players.player(playerIndexes[0]).start(Tone.now() + 0.9)

	console.log(`schedule player ${playerIndexes[1]} for door opening`)
	players.player(playerIndexes[1]).start(Tone.now() + 4.2)
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	playerIndexes.forEach((index) => {
		players.player(index).stop()
	})
	voiceLoop.cancel()
	voiceLoop.stop()
	Tone.Transport.stop()
}

export { onStart, onStop, init }
