/**
 * @param {string} source
 * @param {string} search
 * @return {boolean}
 */
function isCaseInsensitiveSubstr(source, search) {
	return source.toLowerCase().includes(search.toLowerCase())
}

export {
	isCaseInsensitiveSubstr,
}