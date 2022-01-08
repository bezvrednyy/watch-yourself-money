import {useAction} from '@reatom/react'
import {GetServerSidePropsResult, NextPageContext} from 'next'
import {Session} from 'next-auth'
import {getSession} from 'next-auth/react'
import {devideArray} from '../../common/array'
import {ColorId} from '../../common/colors/colors'
import {verify} from '../../common/verify'
import {OutlineIconId} from '../../components/icons/getOutlineIconById'
import {generateMockData} from '../../prisma/generateMockData'
import prisma from '../../prisma/prisma'
import {CategoryData, MainCategoryData, SubCategoryData, categoriesAtom} from './categoriesSection/model/categoriesAtom'
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
	const handleSetCategories = useAction(categoriesAtom.set)
	const [mainCategories, subCategories] = devideArray(props.categories, x => x.parentCategoryId === undefined)

	handleSetCategories({
		mainCategories: mainCategories as Array<MainCategoryData>,
		subCategories: subCategories as Array<SubCategoryData>,
	})
	return (
		<MainLayout title={'Home page'} className={joinClassNames('flex', styles.container)}>
			<CardsSection/>
			<CategoriesSection />
			<HistorySection/>
		</MainLayout>)
}

export async function getServerSideProps(context: NextPageContext): Promise<GetServerSidePropsResult<MainSpaceProps & {
	session: Session | null,
}>> {
	generateMockData()
	const session = await getSession(context)
	if (!session?.user) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		}
	}

	const categories = await prisma.category.findMany({
		where: {
			user: {
				email: verify(session.user.email, 'Server error: email not found'),
			},
		},
	})

	return {
		props: {
			session,
			categories: categories.map(x => {
				const remappedValue: CategoryData = {
					id: x.id,
					title: x.name,
					type: x.type,
					iconId: x.iconId as OutlineIconId,
					colorId: x.color as ColorId,
				}
				if (x.parentCategoryId) {
					remappedValue.parentCategoryId = x.parentCategoryId
				}
				return remappedValue
			}),
		},
	}
}