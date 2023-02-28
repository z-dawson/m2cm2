import '@/styles/globals.css'
import { Roboto_Serif } from '@next/font/google'
import { createContext, useState } from 'react'

export const EnteredContext = createContext()

const roboto = Roboto_Serif({
	weight: ['100', '200', '300'],
	subsets: ['latin'],
	display: 'optional',
})

export default function App({ Component, pageProps }) {
	const [entered, setEntered] = useState(false)
	return (
		<EnteredContext.Provider value={{ entered, setEntered }}>
			<div className={roboto.className}>
				<Component {...pageProps} />
			</div>
		</EnteredContext.Provider>
	)
}
