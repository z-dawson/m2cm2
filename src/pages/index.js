import Animation from '@/components/Animation'
import Experience from '@/components/Experience.js'
import LandingOverlay from '@/components/LandingOverlay.js'
import PopupContainer from '@/components/PopupContainer.js'
import Text from '@/components/Text'
import { randomInt, sToMs } from '@/js/audio/common.js'
import routes from '@/js/routes'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import Link from 'next/link.js'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { EnteredContext } from './_app.js'

function Home() {
	const [soundEngine, setSoundEngine] = useState()
	const { entered, setEntered } = useContext(EnteredContext)
	const route = useRouter()
	const destinationRoom = useRef()
	const [popup, setPopup] = useState(false)
	const gotoDestinationTimeout = useRef()

	useEffect(() => {
		;(async () => {
			const soundEngineModule = await import(`../js/audio/index.js`)
			setSoundEngine(soundEngineModule)
		})()
	}, [soundEngine])

	useEffect(() => {
		routes.forEach(({ name }) => {
			route.prefetch(`/${name}`)
		})
	}, [route])

	const gotoDestination = () => {
		clearTimeout(gotoDestinationTimeout.current)
		route.push(`/${destinationRoom.current}`)
	}

	const handleRoomClick = (name) => {
		const probability = 30
		destinationRoom.current = name
		soundEngine?.stop?.()
		if (randomInt(100) < probability) {
			setPopup(true)
			gotoDestinationTimeout.current = setTimeout(
				() => gotoDestination(destinationRoom.current),
				sToMs(60 * 2)
			)
		} else {
			gotoDestination()
		}
	}

	const reading = entered && !popup

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
			{popup && (
				<PopupContainer>
					<Experience onAllClosed={gotoDestination} />
				</PopupContainer>
			)}
			<div className={styles.container}>
				<nav className={styles.nav}>
					<ul>
						{routes.map((route, index) => {
							if (route.file) {
								return (
									<li key={index}>
										<Link href={route.name}>
											<div>{route.name}</div>
										</Link>
									</li>
								)
							}
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
					{/* <RandomImage /> */}
					<div className={styles.bottomLayer}>
						<div className={styles.animation}>
							<Animation running={entered} />
						</div>
					</div>
				</main>
				<aside className={styles.aside}>
					<Text reading={reading} soundEngine={soundEngine} />
				</aside>
			</div>
		</>
	)
}

export default Home
