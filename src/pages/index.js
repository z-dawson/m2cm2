import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import routes from '@/js/routes'
import Animation from '@/components/Animation'
import Text from '@/components/Text'
import { useContext, useEffect, useState } from 'react'
import LandingOverlay from '@/components/LandingOverlay.js'
import { EnteredContext } from './_app.js'
import Popup, { useAd } from '@/components/Popup.js'

const adds = ['workspace']

function Home() {
	const [loaded, setLoaded] = useState(false)
	const [soundEngine, setSoundEngine] = useState()
	const { entered, setEntered } = useContext(EnteredContext)
	const { showAd, skipAd, ad } = useAd(adds)

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`../js/audio/index.js`)
			setLoaded(true)
			setSoundEngine(soundEngineModule)
		})()
		showAd()
	}, [])

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
			{ad && <Popup ad={ad} onSkip={skipAd} />}
			<div className={styles.container}>
				<nav className={styles.nav}>
					<ul>
						{routes.map((route, index) => {
							return (
								<li key={index}>
									<Link href={`/${route.name}`}>
										<div>{route.name}</div>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
				<main className={styles.main}>
					<div className={styles.bottomLayer}>
						<div className={styles.animation}>
							<Animation orientation={1} />
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
