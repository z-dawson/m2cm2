import routes from '@/js/routes'
import Room from '@/components/Room'
import { useEffect, useState } from 'react'

const Page = ({ name }) => {
	const [play, setPlay] = useState(false)

	useEffect(() => {
		setPlay(true)
		return () => setPlay(false)
	}, [])

	return <Room name={name} play={play} />
}

export default Page

export const getStaticPaths = async () => {
	return {
		paths: routes
			.filter(({ file }) => !file)
			.map(({ name }) => ({
				params: { name },
			})),
		fallback: false,
	}
}

export const getStaticProps = async (context) => {
	return {
		props: {
			name: context.params.name,
		},
	}
}
