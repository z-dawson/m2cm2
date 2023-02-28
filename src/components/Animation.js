import styles from '@/styles/Animation.module.css'
import { useCallback } from 'react'

const divs = Array(16).fill(0)

const getOrientation = (index) =>
	[
		[1, 1],
		[1, -1],
		[-1, -1],
		[-1, 1],
	][index]

const size = 0.5

const Animation = ({ orientation = 0 }) => {
	const getOrientationArray = useCallback(
		(pos) =>
			getOrientation(orientation % 4).map(
				(p) => pos * p + 100 * (p < 0 ? size : 0)
			),
		[orientation]
	)

	return (
		<div className={styles.container}>
			{divs.map((el, index, arr) => {
				const pos = (size * 100 * index) / arr.length
				const [y, x] = getOrientationArray(pos)
				return (
					<div
						style={{
							top: `${y}%`,
							left: `${x}%`,
							width: `calc(30% + 50px)`,
							opacity: index / (arr.length - 1),
							animationName: 'blink',
							animationDuration: `${index + 2}s`,
							animationIterationCount: 'infinite',
							animationPlayState: 'running',
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
