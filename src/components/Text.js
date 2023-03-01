import text from '@/js/text/text'
import timestamps from '@/js/text/timestamps'
import {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import styles from '@/styles/Text.module.css'
import { randomInt, sToMs } from '@/js/audio/common'
import userNameGenerator from 'username-generator'

const Text = (props) => {
	const { reading, soundEngine } = props
	const [paragraphIndex, setParagraphIndex] = useState(7)
	const [displayedSentences, setDisplayedSentences] = useState([])

	const wordIndex = useRef(0)
	const sentenceIndex = useRef(0)
	const sliced = useState([])
	const timeout = useRef()

	const nextWord = useCallback(() => {
		// interval: time until the next word
		const interval = timestamps[paragraphIndex][wordIndex.current]

		timeout.current = setTimeout(() => {
			console.log({ interval })
			// console.log(
			// 	Object.fromEntries(
			// 		Object.entries({ sentenceIndex, wordIndex }).map(([key, value]) => [
			// 			key,
			// 			value.current,
			// 		])
			// 	)
			// )
			setDisplayedSentences((prev) => {
				const sentences = [...prev]
				if (!sentences[sentenceIndex.current]) {
					sentences[sentenceIndex.current] = []
				}
				sentences[sentenceIndex.current].push(
					sliced.current[sentenceIndex.current][wordIndex.current]
				)
				console.log(
					sliced.current[sentenceIndex.current][wordIndex.current],
					wordIndex.current
				)
				return sentences
			})

			if (
				wordIndex.current >=
				sliced.current[sentenceIndex.current].length - 1
			) {
				sentenceIndex.current++
				wordIndex.current = 0
			} else {
				console.log('increment word index')
				wordIndex.current++
			}

			nextWord()
		}, sToMs(interval / 2))
	}, [paragraphIndex])

	useEffect(() => {
		// const randomParagraph = 2 //randomInt(0, text.length - 1)
		const sentences = text[paragraphIndex].split(/[?.]/)
		sliced.current = sentences.map((sentence) => sentence.split(/[\s-]/))

		// setParagraphIndex(randomParagraph)

		return () => clearTimeout(timeout.current)
	}, [])

	useEffect(() => {
		if (reading) {
			nextWord()
			soundEngine?.onStart?.(paragraphIndex)
		}
	}, [reading])

	const userName = useMemo(() => {
		return userNameGenerator.generateUsername('_')
	}, [displayedSentences])

	return (
		<div className={styles.container}>
			<div className={styles.expandingContainer}>
				<strong style={{ fontWeight: 600 }}>{userName}: </strong>
				{displayedSentences.map((sentence, index) => {
					return (
						<p className={styles.sentence} key={index}>
							{sentence.map((word, index) => {
								return (
									<Fragment key={index}>
										<span>{word}</span>{' '}
									</Fragment>
								)
							})}
						</p>
					)
				})}
			</div>
		</div>
	)
}

export default Text
