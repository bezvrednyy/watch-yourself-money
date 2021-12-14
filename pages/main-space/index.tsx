import {GetServerSidePropsResult} from 'next'
import {OutlineIconId} from '../../components/icons/getOutlineIconById'
import prisma from '../../prisma/prisma'
import {CategoryData} from './categoriesSection/model/CategoryData.js'
import styles from './index.module.css'
import {MainLayout} from '../../components/layouts/MainLayout'
import {CardsSection} from './cardsSection/CardsSection'
import {CategoriesSection} from './categoriesSection/CategoriesSection'
import {HistorySection} from './historySection/HistorySection'
import {joinClassNames} from '../../common/joinClassNames'

interface MainSpaceProps {
	categories: Array<CategoryData>,
}

export default function Index(props: MainSpaceProps) {
	return (
		<MainLayout title={'Home page'} className={joinClassNames('flex', styles.container)}>
			<CardsSection/>
			<CategoriesSection categories={props.categories} />
			<HistorySection/>
		</MainLayout>)
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<MainSpaceProps>> {
	const categories = await prisma.category.findMany()

	return {
		props: {
			categories: categories.map(x => {
				const remappedValue: CategoryData = {
					id: x.id,
					title: x.name,
					type: x.type,
					iconId: x.iconId as OutlineIconId,
					hexColor: x.color,
				}
				if (x.parentCategoryId) {
					remappedValue.parentCategoryId = x.parentCategoryId
				}
				return remappedValue
			}),
		},
	}
}