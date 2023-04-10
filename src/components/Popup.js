import { randomInt } from '@/js/audio/common'
import { useState } from 'react'
import { BiSkipNext } from 'react-icons/bi'
import styles from '@/styles/Popup.module.css'
import Room from './Room'

const Popup = ({ onSkip, ad }) => {
	return (
		<div className={styles.backdrop}>
			<div className={styles.popup}>
				<button onClick={onSkip} className={styles.skipAd}>
					Skip Ad <BiSkipNext style={{ fontSize: '1.6rem' }} />
				</button>
				{/* <video
					muted
					autoPlay
					loop
					src="videos/workspace.mp4"
					style={{
						height: '100%',
						objectFit: 'cover',
					}}
				/> */}
				<Room name={ad} />
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
