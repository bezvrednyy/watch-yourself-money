type Subcategory<T> = T & {
	parentCategoryId: string,
}

type MainCategory<T> = T & {
	parentCategoryId: null,
}

export function isSubcategory<T>(category: MainCategory<T> | Subcategory<T>): category is Subcategory<T> {
	return !!category.parentCategoryId
}

export function formatMoney(money: number): string {
	const str = money.toString()
	if (str.length <= 3) {
		return str
	}
	const remains = str.length % 3
	let formattedString = str.substring(0, remains)
	for (let i = remains; i < str.length; i++) {
		formattedString += (i - remains) % 3 === 0 ? ` ${str[i]}` : str[i]
	}
	return formattedString
}