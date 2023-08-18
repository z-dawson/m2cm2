import { loadVideo } from '@/js/helpers'
import { useWindowSize } from '@/js/hooks'
import styles from '@/styles/Room.module.css'
import { useCallback, useEffect, useRef, useState } from 'react'

const Room = ({ name, play, onFinish }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const [loaded, setLoaded] = useState(false)
	const video = useRef()
	const video2 = useRef()
	const loadListener = useRef()

	const size = useWindowSize()

	useEffect(() => {
		soundEngine?.onResize?.(size)
	}, [size, soundEngine])

	const onStart = useCallback(() => {
		soundEngine?.onStart?.(video)
	}, [soundEngine])

	const onStop = useCallback(() => {
		soundEngine?.onStop?.(video)
	}, [soundEngine])

	useEffect(() => onStop, [onStop])

	useEffect(() => {
		;(play ? onStart : onStop)()
	}, [play, onStart])

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`@/js/audio/${name}.js`)
			await loadVideo(video.current, loadListener.current)
			soundEngineModule?.init?.({ video, video2, onFinish })
			setLoaded(true)
			setSoundEngine(soundEngineModule)
		})()
	}, [name])

	return (
		<div className={styles.container}>
			<video muted className={styles.video} ref={video}>
				<source src={`/videos/${name}.mp4`} type="video/mp4" />
			</video>
			{name == 'content' && (
				<video
					muted
					className={styles.video}
					style={{ visibility: 'hidden' }}
					ref={video2}
				>
					<source src="/videos/concert2.mp4" type="video/mp4" />
				</video>
			)}
		</div>
	)
}

export default Room
