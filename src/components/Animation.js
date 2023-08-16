import { RandomMetro, randomInt, sToMs } from '@/js/audio/common'
import styles from '@/styles/Animation.module.css'
import { useEffect, useRef, useState } from 'react'

const getOrientation = (index) =>
	[
		[1, 1],
		[1, -1],
		[-1, -1],
		[-1, 1],
	][index]

const size = 0.5
const rate = 10

const Animation = ({ running }) => {
	const [rectangles, setRectangles] = useState([])
	const orientation = useRef(0)
	const pos = useRef([0, 0])

	const getOrientationArray = (rectPos) =>
		getOrientation(orientation.current % 4).map(
			(p) => rectPos * p + 100 * (p < 0 ? size : 0)
		)

	useEffect(() => {
		const length = 16

		const metro = new RandomMetro(() => {
			setRectangles(running ? Array(length).fill(0) : [])
			const duration = sToMs(1 + length / rate)
			const timeout = setTimeout(() => setRectangles([]), duration)
			orientation.current = randomInt(4)
			pos.current[0] = randomInt(100)
			return {
				clear: () => {
					clearTimeout(timeout)
					setRectangles([])
				},
				interval: duration + randomInt(3000, 5000),
			}
		}).start()

		return metro.stop
	}, [running])

	return (
		<div className={styles.container}>
			{rectangles.map((el, index, arr) => {
				const rectPos = pos.current[0] + (size * 100 * index) / arr.length
				const [y, x] = getOrientationArray(rectPos)
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
