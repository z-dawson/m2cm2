import routes from '@/js/routes'
import styles from '@/styles/Apartment.module.css'
import { useEffect, useRef, useState } from 'react'
import PlayAudio from '../components/PlayAudio'

const Page = ({ name, options }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const [loaded, setLoaded] = useState(false)
	const video = useRef()

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
				soundEngineModule.init({ video, options })
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
		paths: routes.map(({ name, options }) => ({
			params: { name, options },
		})),
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	return {
		props: {
			name: context.params.name,
			// options: context.params.options,
		},
	}
}
