function defaultCompare<T>(x: T, y: T): number {
	return x > y ? 1 : (x < y ? -1 : 0)
}

export {
	defaultCompare,
}
