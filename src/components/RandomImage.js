/* eslint-disable @next/next/no-img-element */
import { randomInt, RandomMetro, sToMs } from '@/js/audio/common'
import { prefix } from '@/js/constants'
import { useWindowSize } from '@/js/hooks'
import { useEffect, useRef, useState } from 'react'

const size = 0.4
const duration = sToMs(1)

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
				interval: duration + sToMs(randomInt(4, 8)),
			}
		}).start()

		return () => {
			metro.stop()
		}
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
					<img src={`${prefix}/scores/${image.current + 1}.svg`} alt="score" />
				</div>
			)}
		</>
	)
}

export default RandomImage
