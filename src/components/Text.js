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
	const [chat, setChat] = useState([[]])

	const paragraphIndex = useRef(chooseParagraph.next())
	const wordIndex = useRef(0)
	const timestampIndex = useRef(0)

	const sliced = useRef([])
	const timeout = useRef()
	const userNames = useRef(new Array(3).fill(''))

	const nextWord = useCallback(() => {
		const interval = timestamps[paragraphIndex.current][timestampIndex.current]

		const paragraphLength = sliced.current[paragraphIndex.current].length

		const endOfParagraph = paragraphLength - 1 <= wordIndex.current

		timeout.current = setTimeout(() => {
			setChat((prev) => {
				const chat = [...prev]

				chat[chat.length - 1].push(
					sliced.current[paragraphIndex.current][wordIndex.current]
				)

				if (endOfParagraph) {
					chat[chat.length] = [[]]
					paragraphIndex.current = chooseParagraph.next()
					wordIndex.current = 0
					timestampIndex.current = 0
				} else {
					timestampIndex.current += 1
					wordIndex.current += 1
				}

				userNames.current = userNames.current.map(getNewUserName)
				endOfParagraph ? startReading() : nextWord()

				return chat
			})
		}, sToMs(interval))
	}, [soundEngine])

	const startReading = useCallback(() => {
		console.log('start Reading')
		;(async () => {
			await soundEngine?.onStart?.(paragraphIndex.current)
			nextWord()
		})()
	}, [soundEngine])

	useEffect(() => {
		sliced.current = text.map((paragraph) => {
			return paragraph.split(/[\s-]/)
		})

		return () => {
			clearTimeout(timeout.current)
			soundEngine?.onStop?.()
		}
	}, [soundEngine])

	useEffect(() => {
		if (reading && soundEngine) {
			startReading()
		}
	}, [reading, soundEngine])

	return (
		<div className={styles.container}>
			<div className={styles.expandingContainer}>
				{chat.map((paragraph, index) => {
					return (
						<p className={styles.paragraph} key={index}>
							<strong style={{ fontWeight: 600 }}>
								{userNames.current[index % userNames.current.length]}:{' '}
							</strong>
							{paragraph.map((word, index) => {
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
