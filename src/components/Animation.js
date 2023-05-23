import { sToMs } from '@/js/audio/common'
import styles from '@/styles/Animation.module.css'
import { useCallback, useEffect, useState } from 'react'

const getOrientation = (index) =>
	[
		[1, 1],
		[1, -1],
		[-1, -1],
		[-1, 1],
	][index]

const size = 0.5
const rate = 10

const Animation = ({ orientation = 0, running }) => {
	const [rectangles, setRectangles] = useState([])
	const getOrientationArray = useCallback(
		(pos) =>
			getOrientation(orientation % 4).map(
				(p) => pos * p + 100 * (p < 0 ? size : 0)
			),
		[orientation]
	)

	useEffect(() => {
		const length = 16
		setRectangles(running ? Array(length).fill(0) : [])
		setTimeout(() => setRectangles([]), sToMs(1 + length / rate))
	}, [running])

	return (
		<div className={styles.container}>
			{rectangles.map((el, index, arr) => {
				const pos = (size * 100 * index) / arr.length
				const [y, x] = getOrientationArray(pos)
				return (
					<div
						style={{
							top: `${y}%`,
							left: `${x}%`,
							width: `calc(30% + 50px)`,
							opacity: index / (arr.length - 1),
							animationName: 'blink-animation',
							animationDuration: `${arr.length - index + 10}s`,
							animationDelay: `${index / rate}s`,
							animationPlayState: 'running',
							animationTimingFunction: 'step-start',
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
