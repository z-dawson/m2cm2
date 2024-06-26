import { prefix } from '@/js/constants'
import { loadVideo } from '@/js/helpers'
import { useWindowSize } from '@/js/hooks'
import styles from '@/styles/Room.module.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Room = ({ name, play, onFinish }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const [loaded, setLoaded] = useState(false)
	const video = useRef()
	const video2 = useRef()
	const loadListener = useRef()
	const route = useRouter()

	const goHome = () => {
		route.push('/')
	}

	const size = useWindowSize()

	useEffect(() => {
		soundEngine?.onResize?.(size)
	}, [size, soundEngine])

	const start = useCallback(() => {
		soundEngine?.start?.(video)
	}, [soundEngine])

	const stop = useCallback(() => {
		soundEngine?.stop?.(video)
	}, [soundEngine])

	useEffect(() => stop, [stop])

	useEffect(() => {
		;(play ? start : stop)()
	}, [play, start])

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
			<Head>
				<title>{name + ' - music to compose music to'}</title>
			</Head>
			<button className={styles.back} onClick={goHome}>
				←
			</button>
			<video
				className={styles.video}
				ref={video}
				loop
				onPause={() => {
					video.current.play()
				}}
			>
				<source src={`${prefix}/videos/${name}.mp4`} type="video/mp4" />
			</video>
			{name == 'concert' && (
				<video
					muted
					className={styles.video}
					style={{ visibility: 'hidden' }}
					ref={video2}
				>
					<source src={`${prefix}/videos/concert2.mp4`} type="video/mp4" />
				</video>
			)}
		</div>
	)
}

export default Room
