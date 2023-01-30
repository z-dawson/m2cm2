import * as Tone from 'tone'

const onStart = (video) => {
	video.current.currentTime = 0
	video.current.play()
}

const onStop = (video) => {
	video.current.pause()
	video.current.currentTime = 0
}

export { onStart, onStop }
