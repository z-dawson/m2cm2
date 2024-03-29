import {
	Loop,
	RandomMetro,
	Urn,
	randomFloat,
	randomInt,
	sToMs,
} from '@/js/audio/common'
import * as Tone from 'tone'
import { prefix, xFadeTime } from '../constants'
import delay from 'delay'

const urls = [
	'S0_03 a.mp3',
	'S0_03 b.mp3',
	'S0_03 c.mp3',
	'S0_03 d.mp3',
	'S0_03 e.mp3',
	'S0_03 f.mp3',
]

let apartmentAudio

const loaded = new Promise((resolve) => {
	apartmentAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: `${prefix}/audio/apartment/`,
	}).toDestination()
})

const urn = new Urn(urls.length, 1)
let randomMetro
const loop = new Loop()
let playerIndex
let video
let looping = false

const init = (args) => {
	video = args.video
	video.current.loop = true
	video.current.addEventListener('seeked', () => {
		if (!looping && !video?.current?.paused) onRepeat()
	})
	randomMetro = new RandomMetro(({ count }) => {
		const time = video.current.duration * randomFloat(1)
		const newLoop = count > 0

		const loopCallback = ({ count }) => {
			video.current.currentTime = time
			apartmentAudio.player(playerIndex).seek(time)
			console.log('loop', count)
			return () => {
				looping = false
			}
		}

		if (newLoop) {
			looping = true
			const loopOptions = {
				interval: randomInt(200, 1500),
				times: randomInt(2, 5) + 1,
			}
			loop.start(loopCallback, loopOptions)

			console.log('starting loop', count, loopOptions)
		}
		const { duration } = video.current
		return {
			clear: newLoop
				? () => {
						loop.stop()
				  }
				: undefined,
			interval: sToMs(duration * randomFloat(0.5, 2)),
		}
	})
}

const start = async (video) => {
	await Promise.all([Tone.start(), loaded])
	console.log('start apartment')
	apartmentAudio.volume.rampTo(0, 0.05)
	video.current.currentTime = 0
	video.current.play()
	apartmentAudio.fadeOut = 0.3
	apartmentAudio.fadeIn = 0.08

	randomMetro.start()
}

const onRepeat = () => {
	const prevPlayerIndex = urn.discarded[urn.discarded.length - 1]
	if (prevPlayerIndex !== undefined)
		apartmentAudio.player(prevPlayerIndex).stop()

	playerIndex = urn.next()
	apartmentAudio.player(playerIndex).start(Tone.now())
}

const stop = async (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	console.log({ playerIndex })
	apartmentAudio.volume.rampTo(-80, xFadeTime)
	randomMetro.stop()
	await delay(sToMs(xFadeTime))
	if (typeof playerIndex == 'number') apartmentAudio.player(playerIndex).stop()
	// apartmentAudio.dispose()
}

export { init, start, stop }
