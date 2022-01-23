function isNumber(n: string): boolean {
	// @ts-ignore
	return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export {
	isNumber,
}