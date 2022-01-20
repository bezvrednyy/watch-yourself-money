function joinStrings(...classes: (string|undefined|null|false)[]): string {
	return classes.filter(Boolean).join(' ')
}

export {
	joinStrings,
}