import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body
				style={{
					fontFamily: '"Roboto Serif", serif',
					fontWeight: 200,
					fontSize: '15px',
				}}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
