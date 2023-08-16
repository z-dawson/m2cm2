import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import routes from '@/js/routes'
import Animation from '@/components/Animation'
import Text from '@/components/Text'
import { useContext, useEffect, useState } from 'react'
import LandingOverlay from '@/components/LandingOverlay.js'
import { EnteredContext } from './_app.js'
import Popup, { useAd } from '@/components/Popup.js'
import { randomInt } from '@/js/audio/common.js'
import { useRouter } from 'next/router'
import RandomImage from '@/components/RandomImage.js'

const adds = ['workspace']

function Home() {
	const [soundEngine, setSoundEngine] = useState()
	const { entered, setEntered } = useContext(EnteredContext)
	const { showAd, skipAd, ad } = useAd(adds)
	const route = useRouter()
	const [destinationRoom, setDestinationRoom] = useState()
	const [destinationTrigger, setDestinationTrigger] = useState(false)

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`../js/audio/index.js`)
			setSoundEngine(soundEngineModule)
		})()
	}, [soundEngine])

	useEffect(() => {
		destinationTrigger && route.push(`/${destinationRoom}`)
	}, [destinationTrigger])

	const handleRoomClick = (name) => {
		const probability = 30
		setDestinationRoom(name)
		if (randomInt(100) < probability) {
			showAd()
			soundEngine?.onStop?.()
		} else {
			setDestinationTrigger(true)
		}
	}

	const handleSkip = () => {
		skipAd()
		setDestinationTrigger(true)
	}

	return (
		<>
			<Head>
				<title>music to compose music to</title>
				<meta name="description" content="music to compose music to" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			{!entered && (
				<LandingOverlay
					onClick={() => {
						setEntered(true)
					}}
				/>
			)}
			{ad && <Popup ad={ad} onSkip={handleSkip} />}
			<div className={styles.container}>
				<nav className={styles.nav}>
					<ul>
						{routes.map((route, index) => {
							return (
								<li key={index}>
									<a onClick={() => handleRoomClick(route.name)}>
										<div>{route.name}</div>
									</a>
								</li>
							)
						})}
					</ul>
				</nav>
				<main className={styles.main}>
					<RandomImage />
					<div className={styles.bottomLayer}>
						<div className={styles.animation}>
							<Animation running={entered} />
						</div>
					</div>
				</main>
				<aside className={styles.aside}>
					<Text reading={entered} soundEngine={soundEngine} />
				</aside>
			</div>
		</>
	)
}

export default Home
