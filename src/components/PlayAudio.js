const button = {
	padding: '1em',
	cursor: 'pointer',
	margin: '0.5em',
	border: '2px solid black',
	backgroundColor: 'white',
}

const PlayAudio = (props) => {
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
			<button style={button} onClick={() => props?.onStart?.()}>
				Play
			</button>
			<button style={button} onClick={() => props?.onStop?.()}>
				Stop
			</button>
		</div>
	)
}

export default PlayAudio
