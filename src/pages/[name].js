import routes from '@/js/routes'
import styles from '@/styles/Apartment.module.css'
import { useEffect, useRef, useState } from 'react'
import PlayAudio from '../components/PlayAudio'

const Page = ({ name }) => {
	const [soundEngine, setSoundEngine] = useState({})
	const video = useRef()

	useEffect(() => {
		;(async () => {
			setSoundEngine(await import(`../js/audio/${name}.js`))
		})()
	}, [name])

	const onStart = () => {
		soundEngine?.onStart?.(video)
	}

	const onStop = () => {
		soundEngine?.onStop?.(video)
	}

	return (
		<>
			<PlayAudio {...{ onStart, onStop }} />
			<video muted loop className={styles.video} ref={video}>
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
