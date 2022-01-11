import {CategoryData} from '../../../../pages/main-space/model/categoriesAtom'
import {TextErrorResponse} from '../../errors'

type GetCategoriesRequest = void

//TODO:models. Общие модели, что используются и на бекенде и на фронте нужно вынести отдельно. Либо создать дубликаты BackendCategoryData, FrontendCategoryData.
// На первый взгляд кажется что это одни и те же модели, но на самом деле, backend и frontend -- это два разных репозитория
export type GetCategoriesRightData = {
	categories: Array<CategoryData>,
}
export type GetCategoriesLeftData = TextErrorResponse