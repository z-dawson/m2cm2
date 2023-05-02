import { randomInt } from '@/js/audio/common'
import { useCallback, useState } from 'react'
import { BiSkipNext } from 'react-icons/bi'
import styles from '@/styles/Popup.module.css'
import Room from './Room'

const Popup = ({ onSkip, ad }) => {
	const [play, setPlay] = useState(false)

	const handleClick = useCallback(() => {
		onSkip()
		setPlay(false)
	}, [onSkip])

	return (
		<div className={styles.backdrop}>
			<div className={styles.popup}>
				<button onClick={handleClick} className={styles.skipAd}>
					Skip Ad <BiSkipNext style={{ fontSize: '1.6rem' }} />
				</button>
				<Room name={ad} play={play} />
			</div>
		</div>
	)
}

export default Popup

export const useAd = (adds) => {
	const [adIndex, setAdIndex] = useState(-1)

	const showAd = () => {
		setAdIndex(randomInt(adds.length))
	}

	const skipAd = () => {
		setAdIndex(-1)
	}

	const ad = adds[adIndex]

	return { showAd, skipAd, ad }
}
