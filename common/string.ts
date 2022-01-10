function joinStrings(...classes: (string|undefined|null)[]): string {
	return classes.filter(Boolean).join(' ')
}

export {
	joinStrings,
}