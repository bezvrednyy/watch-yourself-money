function joinStrings(...classes: (string|undefined|null|false)[]): string {
	return classes.filter(Boolean).join(' ')
}

function trimAll(str: string): string {
	return str.trim().replace(/\s{2,}/g, ' ')
}

function removeSpaces(str: string): string {
	return str.replace(/\s/g, '')
}

export {
	joinStrings,
	trimAll,
	removeSpaces,
}