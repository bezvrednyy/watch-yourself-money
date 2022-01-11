import {createCategoryApi} from './categories/categoriesApi'

export function getClientApi() {
	return {
		categories: {
			createCategory: createCategoryApi,
		},
	}
}

export function processStandardError(error: unknown) {
	//TODO:toast
	console.log('Error', error)
}