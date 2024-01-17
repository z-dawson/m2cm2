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

export const getLowestUnused = (array) => {
	if (array.length == 0) return 0
	const sorted = [...array].sort((a, b) => a - b)
	let lowest = -1
	for (let i = 0; i < sorted.length; ++i) {
		if (sorted[i] != i) {
			lowest = i
			break
		}
	}
	if (lowest == -1) {
		lowest = sorted[sorted.length - 1] + 1
	}
	return lowest
}
