import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import routes from '@/js/routes'

function Home() {
	return (
		<>
			<Head>
				<title>music to compose music to</title>
				<meta name="description" content="music to compose music to" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>
			<div className={styles.main}>
				<h1>music to compose music to</h1>
				<div>listen to the music as you compose music.</div>
				<nav>
					<ul>
						{routes.map((route, index) => {
							return <li key={index}>{route.name}</li>
						})}
					</ul>
				</nav>
			</div>
		</>
	)
}

export default Home
