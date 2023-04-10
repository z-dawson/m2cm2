import { useWindowSize } from '@/js/hooks'
import styles from '@/styles/Room.module.css'
import { useEffect, useRef, useState } from 'react'
import PlayAudio from '../components/PlayAudio'

const Room = ({ name }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const [loaded, setLoaded] = useState(false)
	const video = useRef()
	const video2 = useRef()

	const size = useWindowSize()

	useEffect(() => {
		soundEngine?.onResize?.(size)
	}, [size, soundEngine])

	const onStart = () => {
		soundEngine?.onStart?.(video)
	}

	const onStop = () => {
		soundEngine?.onStop?.(video)
	}

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`@/js/audio/${name}.js`)
			video.current.load()
			video.current.addEventListener('loadedmetadata', () => {
				soundEngineModule?.init?.({ video, video2 })
				setLoaded(true)
			})
			setSoundEngine(soundEngineModule)
		})()
	}, [name])

	return (
		<div className={styles.container}>
			<PlayAudio {...{ onStart, onStop }} enabled={loaded} />
			<video muted className={styles.video} ref={video}>
				<source src={`/videos/${name}.mp4`} type="video/mp4" />
			</video>
			<video
				muted
				className={styles.video}
				style={{ visibility: 'hidden' }}
				ref={video2}
			>
				<source src="/videos/concert2.mp4" type="video/mp4" />
			</video>
		</div>
	)
}

export default Room
