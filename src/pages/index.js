import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import routes from '@/js/routes'
import Animation from '@/components/animation'
import dynamic from 'next/dynamic'

const PlayAudio = dynamic(() => import('../components/PlayAudio'), {
	ssr: false,
})

function Home() {
	return (
		<>
			<Head>
				<title>music to compose music to</title>
				<meta name="description" content="music to compose music to" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
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
					<div className={styles.layer2}>
						<h2 className={styles.subtitle}>
							listen to the music as you compose music.
						</h2>
						<PlayAudio />
					</div>
					<div className={styles.layer1}>
						<div className={styles.animation}>
							<Animation />
						</div>
						<div className={styles.mountain}>
							<Image src="/mountain.png" alt="mountain" fill={true} />
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default Home
