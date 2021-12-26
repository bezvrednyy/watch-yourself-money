function devideArray<T>(array: Array<T>, predicate: (v: T) => boolean): Tuple2<Array<T>> {
	const suitableValues: Array<T> = []
	const unsuitableValues: Array<T> = []

	array.forEach(x => {
		if (predicate(x)) {
			suitableValues.push(x)
		}
		else {
			unsuitableValues.push(x)
		}
	})

	return [suitableValues, unsuitableValues]
}

export {
	devideArray,
}