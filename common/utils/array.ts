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

function mapToArray<K, V>(mapV: Map<K, V>): Array<{key: K, value: V}> {
	const array: Array<{key: K, value: V}> = []
	mapV.forEach((value, key) => {
		array.push({key, value})
	})
	return array
}

export {
	devideArray,
	mapToArray,
}