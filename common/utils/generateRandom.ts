function generateRandomInt(min: number = 100, max: number = 1000) {
	const minValue = Math.ceil(min)
	const maxValue = Math.floor(max)
	return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

function generateUuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		const r = Math.random() * 16 | 0
		// eslint-disable-next-line no-mixed-operators
		const v = c == 'x' ? r : (r & 0x3 | 0x8)
		return v.toString(16)
	})
}

export {
	generateRandomInt,
	generateUuid,
}