import styles from '@/styles/Animation.module.css'

const divs = Array(16).fill(0)

const Animation = () => {
	return (
		<div className={styles.container}>
			{divs.map((el, index, arr) => {
				const pos = (0.5 * 100 * index) / arr.length
				return (
					<div
						style={{
							bottom: `${pos * 1.4}%`,
							left: `${pos}%`,
							width: `calc(30% + 50px)`,
							opacity: index / (arr.length - 1),
							// animationDuration: `${index}s`,
							// animationDelay: `${arr.length - index}s`,
						}}
						className={styles.box}
						key={index}
					/>
				)
			})}
		</div>
	)
}

export default Animation
