const styles = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'white',
	zIndex: 100,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '2rem',
	cursor: 'pointer',
}

const LandingOverlay = ({ onClick }) => {
	return (
		<div onClick={onClick} style={styles}>
			<div
				style={{
					width: '100%',
					maxWidth: 1200,
					overflow: 'hidden',
					justifyContent: 'center',
					display: 'flex',
					padding: '0 10px',
				}}
			>
				<video
					muted
					autoPlay
					loop
					src="listen to the music shorter.mp4"
					style={{ width: '110%', objectFit: 'cover' }}
				/>
			</div>
		</div>
	)
}

export default LandingOverlay
