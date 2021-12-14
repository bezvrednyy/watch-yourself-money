function generateRandomInt(min: number = 100, max: number = 1000) {
	const minValue = Math.ceil(min)
	const maxValue = Math.floor(max)
	return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
}

export {
	generateRandomInt,
}