// run the following command on the folder containing clips exported from ableton live and replace durationString with the output of the command
// for i in *.wav;do ffprobe -i $i -show_entries format=duration -v quiet -of csv="p=0"; echo $i; done

const durationsString = ``

const timestamps = []
durationsString.split('.wav\n').map((string) => {
	// 	string.replace(
	// 		/^(\d+\.\d+)\n\w+ \[\d{4}-\d{2}-\d{2} (\d+)\]((-\d)?)$/,
	// 		(match, p1, p2, p3) => {
	// 			timestamps.push({ value: p1, key: `${p2}${p3 ? p3[1] : 0}` })
	// 			return `${p1}-${p2}${p3 ? p3[1] : 0}`
	// 		}
	// 	)
	string.replace(/^(\d+\.\d+)\n#(\d+)/, (match, p1, p2) => {
		timestamps.push({ key: p2, value: p1 })
	})
})

timestamps.sort((a, b) => parseInt(a.key) - parseInt(b.key))
console.log(JSON.stringify(timestamps.map((e) => parseFloat(e.value))))
