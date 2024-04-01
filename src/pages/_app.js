import { randomInt } from '@/js/audio/common'
import '@/styles/globals.css'
import { Roboto_Serif } from '@next/font/google'
import { createContext, useRef, useState } from 'react'

export const GlobalContext = createContext()

const roboto = Roboto_Serif({
	weight: ['100', '200', '300', '600'],
	subsets: ['latin'],
	display: 'optional',
})

export default function App({ Component, pageProps }) {
	const [entered, setEntered] = useState(false)
	const [chat, setChat] = useState([[]])
	const [nextPopupIn, setNextPopupIn] = useState(randomInt(3, 6))
	const paragraphIndex = useRef(0)
	const wordIndex = useRef(0)

	return (
		<GlobalContext.Provider
			value={{
				entered,
				setEntered,
				chat,
				setChat,
				nextPopupIn,
				setNextPopupIn,
				paragraphIndex,
				wordIndex,
			}}
		>
			<div className={roboto.className}>
				<Component {...pageProps} />
			</div>
		</GlobalContext.Provider>
	)
}
