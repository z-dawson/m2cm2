import { Urn, sToMs } from '@/js/audio/common'
import text from '@/js/text/text'
import timestamps from '@/js/text/timestamps'
import { EnteredContext } from '@/pages/_app'
import styles from '@/styles/Text.module.css'
import delay from 'delay'
import { Fragment, useCallback, useContext, useEffect, useRef } from 'react'
import {
	adjectives,
	animals,
	colors,
	uniqueNamesGenerator,
} from 'unique-names-generator'

const getNewUserName = () =>
	uniqueNamesGenerator({
		dictionaries: [adjectives, [...colors, ...animals]],
		separator: '_',
		length: 2,
	})

const chooseParagraph = new Urn(timestamps.length, timestamps.length - 1)

const sliced = text.map((paragraph) => {
	return paragraph.split(/[\s-]/)
})

const Text = (props) => {
	const { reading, soundEngine } = props
	const { chat, setChat } = useContext(EnteredContext)

	const paragraphIndex = useRef(chooseParagraph.next())
	const wordIndex = useRef(0)
	const timestampIndex = useRef(0)

	const timeout = useRef()
	const userNames = useRef(new Array(3).fill(''))

	const onEndOfParagraph = useCallback(() => {
		setChat((prev) => [...prev, [[]]])
		paragraphIndex.current = chooseParagraph.next()
		wordIndex.current = 0
		timestampIndex.current = 0
	}, [chat])

	const nextWord = useCallback(() => {
		const interval = timestamps[paragraphIndex.current][timestampIndex.current]

		const paragraphLength = sliced[paragraphIndex.current].length

		const endOfParagraph = paragraphLength - 1 <= wordIndex.current

		timeout.current = setTimeout(() => {
			setChat((prev) => {
				const chat = [...prev]

				chat[chat.length - 1].push(
					sliced[paragraphIndex.current][wordIndex.current]
				)

				if (endOfParagraph) {
					onEndOfParagraph()
				} else {
					timestampIndex.current += 1
					wordIndex.current += 1
				}

				userNames.current = userNames.current.map(getNewUserName)
				endOfParagraph ? delay(5000).then(startReading) : nextWord()

				return chat
			})
		}, sToMs(interval))
	}, [soundEngine])

	const startReading = useCallback(() => {
		console.log('start Reading')
		;(async () => {
			await soundEngine?.start?.(paragraphIndex.current)
			nextWord()
		})()
	}, [soundEngine])

	useEffect(() => {
		return () => {
			clearTimeout(timeout.current)
			console.log('stop Reading')
			soundEngine?.stop?.()
		}
	}, [soundEngine])

	useEffect(
		() => () => {
			setChat((prev) => {
				const chat = [...prev]
				chat[chat.length - 1] = structuredClone(sliced[paragraphIndex.current])
				return chat
			})
			onEndOfParagraph()
		},
		[]
	)

	useEffect(() => {
		if (reading && soundEngine) {
			startReading()
		}
		if (!reading && soundEngine) {
			clearTimeout(timeout.current)
			soundEngine?.stop?.()
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
