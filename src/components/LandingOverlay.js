import { randomInt } from '@/js/audio/common'
import sentences from '@/js/text/landingPageText'
import delay from 'delay'
import { useCallback, useEffect, useRef, useState } from 'react'

const splitSentences = sentences.map((sentence) => {
	return sentence.split(' ')
})

const styles = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'white',
	zIndex: 100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '2rem',
	cursor: 'pointer',
}

const LandingOverlay = ({ onClick }) => {
	const [displayedText, setDisplayedText] = useState('')

	const sentenceIndex = useRef(randomInt(splitSentences.length))
	const wordIndex = useRef(-1)

	const startSentence = useCallback(async () => {
		const selectedSentence = splitSentences[sentenceIndex.current]

		if (wordIndex.current >= selectedSentence.length) {
			wordIndex.current = -1
			sentenceIndex.current = randomInt(splitSentences.length)
		}
		setDisplayedText(selectedSentence.slice(0, wordIndex.current + 1).join(' '))
		await delay(
			wordIndex.current < 0
				? 1000
				: selectedSentence[wordIndex.current].length * 200
		)
		wordIndex.current++
		startSentence()
	}, [])

	useEffect(() => {
		sentenceIndex.current = randomInt(splitSentences.length)
		startSentence()
	}, [])

	return (
		<div onClick={onClick} style={styles}>
			<div
				style={{
					width: '100%',
					maxWidth: 1200,
					overflow: 'hidden',
					justifyContent: 'center',
					display: 'flex',
					padding: '0 10px',
				}}
			>
				{displayedText}
			</div>
		</div>
	)
}

export default LandingOverlay
