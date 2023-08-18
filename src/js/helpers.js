export const loadVideo = (video) => {
	return new Promise((res) => {
		if (video.readyState === 4) {
			res()
		} else {
			const callback = () => {
				res()
				removeEventListener('loadeddata', callback, true)
			}
			video.addEventListener('loadeddata', callback, true)
		}
	})
}
