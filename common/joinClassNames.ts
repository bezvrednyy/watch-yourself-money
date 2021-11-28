function joinClassNames(...classes: (string|undefined)[]): string {
	return classes.filter(Boolean).join(' ')
}

export {
	joinClassNames,
}