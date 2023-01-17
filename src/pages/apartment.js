import styles from '@/styles/Apartment.module.css'

const Apartment = () => {
	return (
		<div>
			<video autoPlay muted loop className={styles.video}>
				<source src="/videos/apartment.mp4" type="video/mp4" />
			</video>
		</div>
	)
}

export default Apartment
