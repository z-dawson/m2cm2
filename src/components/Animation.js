import styles from '@/styles/Animation.module.css'

const divs = Array(8).fill(0)

const Animation = () => {
	return (
		<div className={styles.container}>
			{divs.map((el, index, arr) => {
				const pos = (0.5 * 100 * index) / arr.length
				return (
					<div
						style={{
							top: `${pos}%`,
							right: `${pos}%`,
							width: '30%',
							opacity: 1 - index / arr.length,
							animationDuration: `${index}s`,
							animationDelay: `${arr.length - index}s`,
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
