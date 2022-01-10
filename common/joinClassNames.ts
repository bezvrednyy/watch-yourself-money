function joinClassNames(...classes: (string|undefined|null)[]): string {
	return classes.filter(Boolean).join(' ')
}

function joinTexts(...texts: (string|undefined|null)[]): string {
	return texts.filter(Boolean).join(' ')
}

export {
	joinClassNames,
	joinTexts,
}