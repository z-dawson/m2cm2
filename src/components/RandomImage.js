/* eslint-disable @next/next/no-img-element */
import { randomInt, RandomMetro } from '@/js/audio/common'
import { useWindowSize } from '@/js/hooks'
import { useEffect, useRef, useState } from 'react'

const size = 0.1
const duration = 1000

const RandomImage = () => {
	const position = useRef([0, 0])
	const [visible, setVisible] = useState(false)
	const image = useRef(0)

	const windowSize = useWindowSize()

	useEffect(() => {
		const metro = new RandomMetro(() => {
			const { width, height } = windowSize
			position.current = [
				randomInt((width || 0) * size),
				randomInt((height || 0) * size),
			]
			image.current = randomInt(9)
			setVisible(true)
			const timeout = setTimeout(() => setVisible(false), duration)
			return {
				clear: () => {
					clearTimeout(timeout)
					setVisible(false)
				},
				interval: 5000,
			}
		}).start()

		return metro.stop
	}, [windowSize])

	return (
		<>
			{visible && (
				<div
					style={{
						position: 'absolute',
						width: `${0.1 * 100}%`,
						top: position.current[0],
						left: position.current[1],
					}}
				>
					<img src={`/scores/${image.current + 1}.svg`} alt="score" />
				</div>
			)}
		</>
	)
}

export default RandomImage
