function isCaseInsensitiveSubstr(source: string, search: string): boolean {
	return source.toLowerCase().includes(search.toLowerCase())
}

export {
	isCaseInsensitiveSubstr,
}