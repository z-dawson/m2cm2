import * as Tone from 'tone'
import { Urn, RandomMetro, mToMs, Loop } from '@/js/audio/common'
import { rando } from '@nastyox/rando.js'

const audioUrls = [
	'/audio/apartment/S0_03 a.mp3',
	'/audio/apartment/S0_03 b.mp3',
	'/audio/apartment/S0_03 c.mp3',
	'/audio/apartment/S0_03 d.mp3',
	'/audio/apartment/S0_03 e.mp3',
	'/audio/apartment/S0_03 f.mp3',
]

let apartmentAudio = new Tone.Players(audioUrls).toDestination()

const urn = new Urn(audioUrls.length, 1)
let randomMetro
const loop = new Loop()

apartmentAudio._buffers._buffers.forEach((_, index) => {
	apartmentAudio.player(index)
})

apartmentAudio.fadeOut = 0.3
apartmentAudio.fadeIn = 0.08
let playerIndex
let video
let looping = false
Tone.Transport.debug = true

const init = (args) => {
	video = args.video
	video.current.loop = true
	video.current.addEventListener('seeked', () => {
		if (!looping && !video?.current?.paused) onRepeat()
	})
	randomMetro = new RandomMetro(
		console.log,
		mToMs(video.current.duration) / 2,
		mToMs(video.current.duration) * 2
	)
}

const onStart = async (video) => {
	await Tone.start()
	video.current.currentTime = 0
	video.current.play()

	randomMetro.start(({ count }) => {
		const time = video.current.duration * rando(1, 'float')

		const loopCallback = (count) => {
			video.current.currentTime = time
			apartmentAudio.player(playerIndex).seek(time)
			console.log('loop', count)
			return () => {
				looping = false
			}
		}

		if (count > 0) {
			looping = true
			const loopOptions = { interval: rando(200, 1500), times: rando(2, 5) + 1 }
			loop.start(loopCallback, loopOptions)

			console.log('starting loop', count, loopOptions)
		}
		return () => {
			loop.stop()
		}
	})
}

const onRepeat = () => {
	const prevPlayerIndex = urn.discarded[urn.discarded.length - 1]
	if (prevPlayerIndex) apartmentAudio.player(prevPlayerIndex).stop()

	playerIndex = urn.next()
	console.log('playing from start', { playerIndex })
	apartmentAudio.player(playerIndex).start(Tone.now())
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	console.log({ playerIndex })
	if (typeof playerIndex == 'number') apartmentAudio.player(playerIndex).stop()
	randomMetro.stop()
}

export { onStart, onStop, init }
