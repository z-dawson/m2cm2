import { randomInt } from '@/js/audio/common'
import { useCallback, useState } from 'react'
import { BiSkipNext } from 'react-icons/bi'
import styles from '@/styles/Popup.module.css'
import Room from './Room'
import ads from '@/js/ads'

const Popup = ({ onSkip, ad }) => {
	const [play, setPlay] = useState(true)

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
				<Room name={ad} play={play} onFinish={handleClick} />
			</div>
		</div>
	)
}

export default Popup

export const useAd = () => {
	const [adIndex, setAdIndex] = useState(-1)

	const showAd = () => {
		setAdIndex(randomInt(ads.length))
	}

	const skipAd = () => {
		setAdIndex(-1)
	}

	const ad = ads[adIndex]?.name

	return { showAd, skipAd, ad }
}
