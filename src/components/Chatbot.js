import { Urn, randomInt, sToMs } from '@/js/audio/common'
import text from '@/js/text/text'
import timestamps from '@/js/text/timestamps'
import { GlobalContext } from '@/pages/_app'
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
	return Array.from(paragraph.matchAll(/([^\s-]*[\s-]|[^\s-]+$)/g)).map(
		(a) => a[0]
	)
})

const maxParagraphs = 5

const Text = (props) => {
	const { reading, soundEngine } = props
	const { chat, setChat, paragraphIndex, wordIndex } = useContext(GlobalContext)

	const timeout = useRef()
	const userNames = useRef(new Array(maxParagraphs).fill(''))

	const nextWord = useCallback(() => {
		const interval = timestamps[paragraphIndex.current][wordIndex.current]
		const currentParagraph = words[paragraphIndex.current]

		timeout.current = setTimeout(() => {
			setChat((prev) => {
				let chat
				const endOfParagraph = currentParagraph.length - 1 <= wordIndex.current

				if (endOfParagraph) {
					chat = [...prev, []].filter((_, i, { length }) => {
						return i > length - maxParagraphs - 1
					})
					paragraphIndex.current = chooseParagraph.next()
					wordIndex.current = 0
				} else {
					chat = [...prev]
					chat[chat.length - 1].push(currentParagraph[wordIndex.current])
					wordIndex.current += 1
				}

				userNames.current = userNames.current.map(getNewUserName)
				endOfParagraph
					? delay(sToMs(randomInt(10, 45))).then(startReading)
					: nextWord()
				return chat
			})
		}, sToMs(interval))
	}, [soundEngine, setChat, paragraphIndex, wordIndex])

	const startReading = useCallback(() => {
		console.log('start Reading')
		;(async () => {
			await soundEngine?.start?.(
				paragraphIndex.current,
				timestamps[paragraphIndex.current].reduce((accum, timestamp, index) => {
					if (wordIndex.current > index) accum += timestamp
					return accum
				}, 0)
			)
			nextWord()
		})()
	}, [nextWord, paragraphIndex, soundEngine, wordIndex])

	useEffect(() => {
		return () => {
			clearTimeout(timeout.current)
			console.log('stop Reading')
			soundEngine?.stop?.()
		}
	}, [soundEngine])

	useEffect(() => {
		userNames.current = userNames.current.map(getNewUserName)
	}, [])

	useEffect(() => {
		if (reading && soundEngine) {
			startReading()
		}
		if (!reading && soundEngine) {
			clearTimeout(timeout.current)
			soundEngine?.stop?.()
		}
	}, [reading, soundEngine, startReading])

	return (
		<div className={styles.container}>
			<div className={styles.expandingContainer}>
				{chat.map((paragraph, index) => {
					return (
						<p className={styles.paragraph} key={index}>
							{paragraph.length ? (
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
										<span>{word}</span>
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
