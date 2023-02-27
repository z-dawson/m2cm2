import text from '@/js/text/text'
import timestamps from '@/js/text/timestamps'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import styles from '@/styles/Text.module.css'
import { randomInt, sToMs } from '@/js/audio/common'

const Text = (props) => {
	const { reading, soundEngine } = props
	const [paragraphIndex, setParagraphIndex] = useState(7)
	const [wordIndex, setWordIndex] = useState(0)
	const [sliced, setSliced] = useState([])
	const [displayedText, setDisplayedText] = useState([])
	const timeout = useRef()

	const nextWord = useCallback(() => {
		setWordIndex((wordIndex) => {
			const prevTime = wordIndex ? timestamps[paragraphIndex][wordIndex - 1] : 0

			console.log(timestamps[paragraphIndex][wordIndex], wordIndex)
			const interval = timestamps[paragraphIndex][wordIndex]
			timeout.current = setTimeout(() => {
				setDisplayedText((prev) => [...prev, sliced[wordIndex]])
				nextWord()
			}, sToMs(interval))

			return wordIndex + 1
		})
	}, [paragraphIndex, sliced])

	useEffect(() => {
		// const randomParagraph = 2 //randomInt(0, text.length - 1)
		const slicedText = text[paragraphIndex].split(/[\s-]/)
		// const sentences = text[randomParagraph]

		// setParagraphIndex(randomParagraph)
		setSliced(slicedText)

		return () => clearTimeout(timeout.current)
	}, [])

	useEffect(() => {
		if (reading) {
			nextWord()
			soundEngine?.onStart?.(paragraphIndex)
		}
	}, [reading])

	return (
		<>
			{displayedText.map((word, index) => {
				return (
					<Fragment key={index}>
						<span>{word}</span>{' '}
					</Fragment>
				)
			})}
		</>
	)
}

export default Text
