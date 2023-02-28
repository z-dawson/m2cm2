import * as Tone from 'tone'
import { randomInt, Urn } from './common'
import Stochastic from './stochastic'

const audioUrls = [
	'Freeze CLIPS [2023-02-28 123430]-1.mp3',
	'Freeze CLIPS [2023-02-28 123526]-1.mp3',
	'Freeze CLIPS [2023-02-28 123526]-2.mp3',
	'Freeze CLIPS [2023-02-28 123526]-3.mp3',
	'Freeze CLIPS [2023-02-28 123526].mp3',
	'Freeze CLIPS [2023-02-28 123527]-1.mp3',
	'Freeze CLIPS [2023-02-28 123527]-2.mp3',
	'Freeze CLIPS [2023-02-28 123527]-3.mp3',
	'Freeze CLIPS [2023-02-28 123527].mp3',
	'Freeze CLIPS [2023-02-28 123528]-1.mp3',
	'Freeze CLIPS [2023-02-28 123528]-2.mp3',
	'Freeze CLIPS [2023-02-28 123528].mp3',
	'Freeze CLIPS [2023-02-28 123529]-1.mp3',
	'Freeze CLIPS [2023-02-28 123529]-2.mp3',
	'Freeze CLIPS [2023-02-28 123529]-3.mp3',
	'Freeze CLIPS [2023-02-28 123529]-4.mp3',
	'Freeze CLIPS [2023-02-28 123529].mp3',
	'Freeze CLIPS [2023-02-28 123530]-1.mp3',
	'Freeze CLIPS [2023-02-28 123530]-2.mp3',
	'Freeze CLIPS [2023-02-28 123530]-3.mp3',
	'Freeze CLIPS [2023-02-28 123530].mp3',
	'Freeze CLIPS [2023-02-28 123531]-1.mp3',
	'Freeze CLIPS [2023-02-28 123531]-2.mp3',
	'Freeze CLIPS [2023-02-28 123531].mp3',
	'Freeze CLIPS [2023-02-28 123532]-1.mp3',
	'Freeze CLIPS [2023-02-28 123532]-2.mp3',
	'Freeze CLIPS [2023-02-28 123532]-3.mp3',
	'Freeze CLIPS [2023-02-28 123532].mp3',
	'Freeze CLIPS [2023-02-28 123533]-1.mp3',
	'Freeze CLIPS [2023-02-28 123533]-2.mp3',
	'Freeze CLIPS [2023-02-28 123533]-3.mp3',
	'Freeze CLIPS [2023-02-28 123533].mp3',
	'Freeze CLIPS [2023-02-28 123534]-1.mp3',
	'Freeze CLIPS [2023-02-28 123534]-2.mp3',
	'Freeze CLIPS [2023-02-28 123534]-3.mp3',
	'Freeze CLIPS [2023-02-28 123534].mp3',
	'Freeze CLIPS [2023-02-28 123535]-1.mp3',
	'Freeze CLIPS [2023-02-28 123535]-2.mp3',
	'Freeze CLIPS [2023-02-28 123535]-3.mp3',
	'Freeze CLIPS [2023-02-28 123535]-4.mp3',
	'Freeze CLIPS [2023-02-28 123535].mp3',
	'Freeze CLIPS [2023-02-28 123536]-1.mp3',
	'Freeze CLIPS [2023-02-28 123536]-2.mp3',
	'Freeze CLIPS [2023-02-28 123536]-3.mp3',
	'Freeze CLIPS [2023-02-28 123536].mp3',
	'Freeze CLIPS [2023-02-28 123537]-1.mp3',
	'Freeze CLIPS [2023-02-28 123537]-2.mp3',
	'Freeze CLIPS [2023-02-28 123537]-3.mp3',
	'Freeze CLIPS [2023-02-28 123537].mp3',
	'Freeze CLIPS [2023-02-28 123538]-1.mp3',
	'Freeze CLIPS [2023-02-28 123538]-2.mp3',
	'Freeze CLIPS [2023-02-28 123538]-3.mp3',
	'Freeze CLIPS [2023-02-28 123538].mp3',
	'Freeze CLIPS [2023-02-28 123539]-1.mp3',
	'Freeze CLIPS [2023-02-28 123539]-2.mp3',
	'Freeze CLIPS [2023-02-28 123539]-3.mp3',
	'Freeze CLIPS [2023-02-28 123539].mp3',
	'Freeze CLIPS [2023-02-28 123540]-1.mp3',
	'Freeze CLIPS [2023-02-28 123540]-2.mp3',
	'Freeze CLIPS [2023-02-28 123540]-3.mp3',
	'Freeze CLIPS [2023-02-28 123540].mp3',
	'Freeze CLIPS [2023-02-28 123541]-1.mp3',
	'Freeze CLIPS [2023-02-28 123541]-2.mp3',
	'Freeze CLIPS [2023-02-28 123541]-3.mp3',
	'Freeze CLIPS [2023-02-28 123541].mp3',
	'Freeze CLIPS [2023-02-28 123542]-1.mp3',
	'Freeze CLIPS [2023-02-28 123542]-2.mp3',
	'Freeze CLIPS [2023-02-28 123542]-3.mp3',
	'Freeze CLIPS [2023-02-28 123542].mp3',
	'Freeze CLIPS [2023-02-28 123543]-1.mp3',
	'Freeze CLIPS [2023-02-28 123543]-2.mp3',
	'Freeze CLIPS [2023-02-28 123543]-3.mp3',
	'Freeze CLIPS [2023-02-28 123543].mp3',
	'Freeze CLIPS [2023-02-28 123544]-1.mp3',
	'Freeze CLIPS [2023-02-28 123544]-2.mp3',
	'Freeze CLIPS [2023-02-28 123544]-3.mp3',
	'Freeze CLIPS [2023-02-28 123544].mp3',
	'Freeze CLIPS [2023-02-28 123545]-1.mp3',
	'Freeze CLIPS [2023-02-28 123545]-2.mp3',
	'Freeze CLIPS [2023-02-28 123545].mp3',
	'Freeze CLIPS [2023-02-28 123546]-1.mp3',
	'Freeze CLIPS [2023-02-28 123546]-2.mp3',
	'Freeze CLIPS [2023-02-28 123546]-3.mp3',
	'Freeze CLIPS [2023-02-28 123546]-4.mp3',
	'Freeze CLIPS [2023-02-28 123546].mp3',
	'Freeze CLIPS [2023-02-28 123547]-1.mp3',
	'Freeze CLIPS [2023-02-28 123547]-2.mp3',
	'Freeze CLIPS [2023-02-28 123547]-3.mp3',
	'Freeze CLIPS [2023-02-28 123547].mp3',
	'Freeze CLIPS [2023-02-28 123548]-1.mp3',
	'Freeze CLIPS [2023-02-28 123548]-2.mp3',
	'Freeze CLIPS [2023-02-28 123548]-3.mp3',
	'Freeze CLIPS [2023-02-28 123548].mp3',
	'Freeze CLIPS [2023-02-28 123549]-1.mp3',
	'Freeze CLIPS [2023-02-28 123549]-2.mp3',
	'Freeze CLIPS [2023-02-28 123549]-3.mp3',
	'Freeze CLIPS [2023-02-28 123549]-4.mp3',
	'Freeze CLIPS [2023-02-28 123549].mp3',
	'Freeze CLIPS [2023-02-28 123550]-1.mp3',
	'Freeze CLIPS [2023-02-28 123550]-2.mp3',
	'Freeze CLIPS [2023-02-28 123550]-3.mp3',
	'Freeze CLIPS [2023-02-28 123550].mp3',
	'Freeze CLIPS [2023-02-28 123551]-1.mp3',
	'Freeze CLIPS [2023-02-28 123551]-2.mp3',
	'Freeze CLIPS [2023-02-28 123551]-3.mp3',
	'Freeze CLIPS [2023-02-28 123551].mp3',
	'Freeze CLIPS [2023-02-28 123552]-1.mp3',
	'Freeze CLIPS [2023-02-28 123552]-2.mp3',
	'Freeze CLIPS [2023-02-28 123552]-3.mp3',
	'Freeze CLIPS [2023-02-28 123552].mp3',
	'Freeze CLIPS [2023-02-28 123553]-1.mp3',
	'Freeze CLIPS [2023-02-28 123553]-2.mp3',
	'Freeze CLIPS [2023-02-28 123553]-3.mp3',
	'Freeze CLIPS [2023-02-28 123553].mp3',
	'Freeze CLIPS [2023-02-28 123554]-1.mp3',
	'Freeze CLIPS [2023-02-28 123554]-2.mp3',
	'Freeze CLIPS [2023-02-28 123554]-3.mp3',
	'Freeze CLIPS [2023-02-28 123554].mp3',
	'Freeze CLIPS [2023-02-28 123555]-1.mp3',
	'Freeze CLIPS [2023-02-28 123555]-2.mp3',
	'Freeze CLIPS [2023-02-28 123555]-3.mp3',
	'Freeze CLIPS [2023-02-28 123555]-4.mp3',
	'Freeze CLIPS [2023-02-28 123555].mp3',
	'Freeze CLIPS [2023-02-28 123556].mp3',
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
	// urn.discarded
	// 	.slice(urn.discarded.length - 2, urn.discarded.length)
	// 	.forEach((index) => {
	// 		players.player(index).stop()
	// 	})

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
