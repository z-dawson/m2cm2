import { useWindowSize } from '@/js/hooks'
import routes from '@/js/routes'
import styles from '@/styles/Apartment.module.css'
import { useEffect, useRef, useState } from 'react'
import PlayAudio from '../components/PlayAudio'

const Page = ({ name }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const [loaded, setLoaded] = useState(false)
	const video = useRef()

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
			const soundEngineModule = await import(`../js/audio/${name}.js`)
			video.current.load()
			video.current.addEventListener('loadedmetadata', () => {
				soundEngineModule.init({ video })
				setLoaded(true)
			})
			setSoundEngine(soundEngineModule)
		})()
	}, [name])

	return (
		<>
			<PlayAudio {...{ onStart, onStop }} enabled={loaded} />
			<video muted className={styles.video} ref={video}>
				<source src={`/videos/${name}.mp4`} type="video/mp4" />
			</video>
		</>
	)
}

export default Page

export const getStaticPaths = async () => {
	return {
		paths: routes.map(({ name }) => ({
			params: { name },
		})),
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	return {
		props: {
			name: context.params.name,
		},
	}
}
