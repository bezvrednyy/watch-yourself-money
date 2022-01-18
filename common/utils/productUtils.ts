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
	let formattedString = str[0]
	for (let i = 1; i < str.length; i++) {
		formattedString += i % 3 === 0 && i !== str.length - 1
			? `${str[i]} `
			: str[i]
	}
	return formattedString
}