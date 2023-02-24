import * as Tone from 'tone'

const audioUrls = new Array(8).fill(0).map((value, index) => {
	return `audio/index/Statement${index + 1}.mp3`
})

const players = new Tone.Players(audioUrls).toDestination()
let playingIndex

const onStart = async (index) => {
	await Tone.start()
	playingIndex = index
	players.player(index).start(Tone.now())
}

const onStop = (index = playingIndex) => {
	players.player(index).stop()
}

export { onStart, onStop }
