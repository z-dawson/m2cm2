import * as Tone from 'tone'
import { randomInt } from './common'
import { prefix } from '../constants'

const urls = [
	'memory.mp3',
	'continue.mp3',
	'fading.mp3',
	'knowing.mp3',
	'changing.mp3',
	'processing.mp3',
	'programming.mp3',
	'progressing.mp3',
	'remembering.mp3',
	'returning.mp3',
	'searching.mp3',
]

let workspaceAudio

const loaded = new Promise((resolve) => {
	workspaceAudio = new Tone.Players({
		urls,
		onload: resolve,
		baseUrl: `${prefix}/audio/workspace/`,
	}).toDestination()
})

let video

let loop

const init = (args) => {
	video = args.video
	if (!video.current) return
	video.current.playbackRate = 0.25
	video.current.addEventListener('ended', onEnd)

	loop = new Tone.ToneEvent((time) => {
		let duration = 0
		while (
			video?.current?.duration * (1 / video?.current?.playbackRate) >
			duration
		) {
			if (!video?.current) break
			const playerIndex = randomInt(1)
			const playerDuration = workspaceAudio.player(playerIndex).buffer.duration
			workspaceAudio.player(playerIndex).start(time + duration)

			const playerIndexNext = randomInt(2, 8)
			const playerDurationNext =
				workspaceAudio.player(playerIndexNext).buffer.duration
			workspaceAudio
				.player(playerIndexNext)
				.start(time + playerDuration + duration)
			duration += playerDuration + playerDurationNext
			console.log(`schedule player ${playerIndex}, time: ${time + duration}`)
			console.log(
				`scheduling player ${playerIndexNext}, time: ${
					time + playerDuration + duration
				}`
			)
		}
	})
}

const start = async (video) => {
	await Promise.all([Tone.start(), loaded])
	Tone.Transport.start()
	video.current.currentTime = 0
	video.current.play()
	loop.start()
	Object.assign(video.current.style, {
		animationName: 'workspace',
		animationDuration: `${
			video.current.duration * (1 / video.current.playbackRate)
		}s`,
	})
}

const onEnd = () => {
	loop.cancel(Tone.immediate())
	Tone.Transport.stop()
}

const stop = (video) => {
	if (video.current) {
		video.current.pause()
		video.current.currentTime = 0
	}
	loop.cancel(Tone.immediate())
	workspaceAudio.stopAll()
	Tone.Transport.stop()
}

export { start, stop, init }
