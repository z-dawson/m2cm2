import routes from '@/js/routes'
import styles from '@/styles/Apartment.module.css'
import { useEffect, useState } from 'react'
import PlayAudio from '../components/PlayAudio'

const Page = ({ name }) => {
	const [soundEngine, setSoundEngine] = useState({})

	useEffect(() => {
		;(async () => {
			setSoundEngine(await import(`../js/audio/${name}.js`))
		})()
	}, [name])

	return (
		<>
			<PlayAudio {...soundEngine} />
			<video autoPlay muted loop className={styles.video}>
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
