import { useMemo } from 'react'

const defaultButtonStyles = {
	padding: '1em',
	margin: '0.5em',
	borderColor: 'black',
	borderStyle: 'solid',
	borderWidth: 2,
	backgroundColor: 'white',
	cursor: 'pointer',
}

const disabledStyles = {
	cursor: 'wait',
	pointerEvent: 'none',
	color: 'gray',
	borderColor: 'gray',
}

const PlayAudio = (props) => {
	const { enabled } = props

	const buttonStyles = useMemo(() => {
		return Object.assign({}, defaultButtonStyles, enabled ? {} : disabledStyles)
	}, [enabled])

	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<button style={buttonStyles} onClick={() => props?.onStart?.()}>
				Play
			</button>
			<button style={buttonStyles} onClick={() => props?.onStop?.()}>
				Stop
			</button>
		</div>
	)
}

export default PlayAudio
