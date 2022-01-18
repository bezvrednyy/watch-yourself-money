type Subcategory<T> = T & {
	parentCategoryId: string,
}

type MainCategory<T> = T & {
	parentCategoryId: null,
}

export function isSubcategory<T>(category: MainCategory<T> | Subcategory<T>): category is Subcategory<T> {
	return !!category.parentCategoryId
}