import text from '@/js/text/text'
import timestamps from '@/js/text/timestamps'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import styles from '@/styles/Text.module.css'
import { sToMs, Urn } from '@/js/audio/common'
import userNameGenerator from 'username-generator'

const chooseParagraph = new Urn(timestamps.length, timestamps.length - 1)
const getNewUserName = () => userNameGenerator.generateUsername('_')

const Text = (props) => {
	const { reading, soundEngine } = props
	const [chat, setChat] = useState([[[]]])

	const paragraphIndex = useRef(chooseParagraph.next())
	const wordIndex = useRef(0)
	const sentenceIndex = useRef(0)
	const timestampIndex = useRef(0)

	const sliced = useRef([])
	const timeout = useRef()
	const userName = useRef()

	const nextWord = useCallback(() => {
		const interval = timestamps[paragraphIndex.current][timestampIndex.current]

		const sentenceLength =
			sliced.current[paragraphIndex.current][sentenceIndex.current].length
		const paragraphLength = sliced.current[paragraphIndex.current].length

		const endOfSentence = sentenceLength - 1 <= wordIndex.current
		const endOfParagraph =
			endOfSentence && paragraphLength - 1 <= sentenceIndex.current

		timeout.current = setTimeout(() => {
			setChat((prev) => {
				const chat = [...prev]

				chat[chat.length - 1][sentenceIndex.current].push(
					sliced.current[paragraphIndex.current][sentenceIndex.current][
						wordIndex.current
					]
				)

				if (endOfParagraph) {
					chat[chat.length] = [[]]
					paragraphIndex.current = chooseParagraph.next()
					sentenceIndex.current = wordIndex.current = 0
					timestampIndex.current = 0
				} else {
					timestampIndex.current += 1
					if (endOfSentence) {
						const currentSentence = chat[chat.length - 1]
						currentSentence[currentSentence.length] = []
						wordIndex.current = 0
						sentenceIndex.current += 1
					} else {
						wordIndex.current += 1
					}
				}

				userName.current = getNewUserName()
				nextWord()

				return chat
			})
		}, sToMs(interval))
	}, [])

	useEffect(() => {
		sliced.current = text.map((paragraph) => {
			const sentences = paragraph.split(/[?.]\s/)
			return sentences.map((sentence) => sentence.split(/[\s-]/))
		})

		return () => {
			clearTimeout(timeout.current)
			soundEngine?.onStop?.()
		}
	}, [soundEngine])

	useEffect(() => {
		if (reading && soundEngine) {
			;(async () => {
				await soundEngine?.onStart?.(paragraphIndex.current)
				nextWord()
			})()
		}
	}, [reading, soundEngine])

	return (
		<div className={styles.container}>
			<div className={styles.expandingContainer}>
				{chat.map((paragraph, index) => {
					return (
						<Fragment key={index}>
							<strong style={{ fontWeight: 600 }}>{userName.current}: </strong>
							{paragraph.map((sentence, index) => {
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
						</Fragment>
					)
				})}
			</div>
		</div>
	)
}

export default Text
