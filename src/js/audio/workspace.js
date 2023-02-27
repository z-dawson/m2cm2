import * as Tone from 'tone'
import { rando } from '@nastyox/rando.js'

const audioUrls = [
	'/audio/workspace/memory.mp3',
	'/audio/workspace/continue.mp3',
	'/audio/workspace/fading.mp3',
	'/audio/workspace/knowing.mp3',
	'/audio/workspace/changing.mp3',
	'/audio/workspace/processing.mp3',
	'/audio/workspace/programming.mp3',
	'/audio/workspace/progressing.mp3',
	'/audio/workspace/remembering.mp3',
	'/audio/workspace/returning.mp3',
	'/audio/workspace/searching.mp3',
]

let workspaceAudio = new Tone.Players(audioUrls).toDestination()

workspaceAudio._buffers._buffers.forEach((_, index) => {
	workspaceAudio.player(index)
})

let video

let loop = new Tone.ToneEvent((time) => {
	let duration = 0
	while (video.current.duration * (1 / video.current.playbackRate) > duration) {
		const playerIndex = rando(0, 1)
		const playerDuration = workspaceAudio.player(playerIndex).buffer.duration
		workspaceAudio.player(playerIndex).start(time + duration)

		const playerIndexNext = rando(2, 8)
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

const init = (args) => {
	video = args.video
	video.current.playbackRate = 0.25
	video.current.addEventListener('ended', onEnd)
}

const onStart = async (video) => {
	Tone.start()
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

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
	loop.cancel(Tone.immediate())
	workspaceAudio.stopAll()
	Tone.Transport.stop()
}

export { onStart, onStop, init }
