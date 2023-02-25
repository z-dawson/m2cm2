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
			<div style={{ textAlign: 'center' }}>
				listen to the music as you compose music.
			</div>
		</div>
	)
}

export default LandingOverlay
