import * as Tone from 'tone'

const urls = new Array(8).fill(0).map((value, index) => {
	return `Statement${index + 1}.mp3`
})

let players

const loaded = new Promise((resolve, reject) => {
	players = new Tone.Players({
		urls,
		onload: () => resolve(),
		baseUrl: 'audio/index/',
	}).toDestination()
})

let playingIndex

const onStart = async (index) => {
	await Promise.all([Tone.start(), loaded])
	playingIndex = index
	players.player(playingIndex).start(Tone.now())
}

const onStop = (index = playingIndex) => {
	players.player(index).stop()
}

export { onStart, onStop }
