import '@/styles/globals.css'
import { Roboto_Serif } from '@next/font/google'

const roboto = Roboto_Serif({
	// weight: '400',
	subsets: ['latin'],
	display: 'optional',
})

export default function App({ Component, pageProps }) {
	return (
		<div className={roboto.className}>
			<Component {...pageProps} />
		</div>
	)
}
