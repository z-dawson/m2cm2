import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import routes from '@/js/routes'
import Animation from '@/components/Animation'
import Text from '@/components/Text'
import { useEffect, useState } from 'react'
import LandingOverlay from '@/components/LandingOverlay.js'

function Home() {
	const [reading, setReading] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [soundEngine, setSoundEngine] = useState()

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`../js/audio/index.js`)
			setLoaded(true)
			setSoundEngine(soundEngineModule)
		})()
	}, [])

	return (
		<>
			<Head>
				<title>music to compose music to</title>
				<meta name="description" content="music to compose music to" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			{!reading && <LandingOverlay onClick={() => setReading(true)} />}
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
					<div className={styles.frontLayer}>
						<p className={styles.text}>
							<Text reading={reading} soundEngine={soundEngine} />
						</p>
					</div>
					<div className={styles.bottomLayer}>
						<div className={styles.animation}>
							<Animation />
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default Home
