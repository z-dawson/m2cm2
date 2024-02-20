import { Urn, randomInt, sToMs } from '@/js/audio/common'
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

const getNewUserName = () => {
	const configs = [
		{
			dictionaries: [adjectives, [...colors, ...animals]],
			separator: '_',
			length: 2,
		},
		{
			dictionaries: [
				colors,
				animals,
				[92, 99, 11, 53, 45, 2323, 7777, '__', '/////'].map((n) =>
					n.toString()
				),
			],
			separator: '',
			style: 'capital',
		},
	]

	return uniqueNamesGenerator(configs[randomInt(configs.length)])
}

const chooseParagraph = new Urn(timestamps.length, timestamps.length - 1)

const words = text.map((paragraph) => {
	return paragraph.split(/[\s-]/)
})

const maxParagraphs = 5

const Text = (props) => {
	const { reading, soundEngine } = props
	const { chat, setChat } = useContext(EnteredContext)
	const paragraphIndex = useRef(chooseParagraph.next())
	const wordIndex = useRef(0)

	const timeout = useRef()
	const userNames = useRef(new Array(maxParagraphs).fill(''))

	const onEndOfParagraph = useCallback(() => {
		setChat((prev) => {
			const newChat = [...prev, []].filter((_, i, { length }) => {
				return i > length - maxParagraphs
			})
			return newChat
		})
		paragraphIndex.current = chooseParagraph.next()
		wordIndex.current = 0
	}, [setChat])

	const nextWord = useCallback(() => {
		const interval = timestamps[paragraphIndex.current][wordIndex.current]
		const currentParagraph = words[paragraphIndex.current]

		const endOfParagraph = currentParagraph.length - 1 <= wordIndex.current
		// const endOfParagraph = 5 <= wordIndex.current

		timeout.current = setTimeout(() => {
			setChat((prev) => {
				const chat = [...prev]

				chat[chat.length - 1].push(currentParagraph[wordIndex.current])

				if (endOfParagraph) {
					onEndOfParagraph()
				} else {
					wordIndex.current += 1
				}

				userNames.current = userNames.current.map(getNewUserName)
				endOfParagraph ? delay(15000).then(startReading) : nextWord()

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

	useEffect(() => {
		userNames.current = userNames.current.map(getNewUserName)
		return () => {
			setChat((prev) => {
				const chat = [...prev]
				chat[chat.length - 1] = structuredClone(words[paragraphIndex.current])
				return chat
			})
			onEndOfParagraph()
		}
	}, [])

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
							{chat[index].length ? (
								<strong className={styles.username}>
									{userNames.current[index % userNames.current.length]}:{' '}
								</strong>
							) : (
								<em className="delay">typing...</em>
							)}
							<br />
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
