import routes from '@/js/routes'
import Room from '@/components/Room'

const Page = ({ name }) => {
	return <Room name={name} />
}

export default Page

export const getStaticPaths = async () => {
	return {
		paths: routes.map(({ name }) => ({
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
