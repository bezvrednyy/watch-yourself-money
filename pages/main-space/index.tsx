import {NextPageContext, GetServerSidePropsResult} from 'next'
import {CategoryData} from './categoriesSection/model/CategoryData.js'
import styles from './index.module.css'
import {MainLayout} from '../../components/MainLayout'
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

export async function getServerSideProps({ query, req }: NextPageContext): Promise<GetServerSidePropsResult<MainSpaceProps>> {
	const response = await fetch('http://localhost:3000/api/categories/get_categories')
	const rawCategories = await response.json()
	//TODO
	return {
		props: {
			categories: [],
		}
	}
}