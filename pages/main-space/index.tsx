import {useAction} from '@reatom/react'
import {GetServerSidePropsResult, NextPageContext} from 'next'
import {Session} from 'next-auth'
import {getSession} from 'next-auth/react'
import {devideArray} from '../../common/array'
import {ColorId} from '../../common/colors/colors'
import {verify} from '../../common/verify'
import {OutlineIconId} from '../../components/icons/getOutlineIconById'
import prisma from '../../prisma/prisma'
import {BankAccountData, bankAccountsAtom} from './model/bankAccountsAtom'
import {CategoryData, MainCategoryData, SubCategoryData, categoriesAtom} from './model/categoriesAtom'
import styles from './index.module.css'
import {MainLayout} from '../../components/layouts/MainLayout'
import {CardsSection} from './cardsSection/CardsSection'
import {CategoriesSection} from './categoriesSection/CategoriesSection'
import {HistorySection} from './historySection/HistorySection'
import {joinClassNames} from '../../common/joinClassNames'

interface MainSpaceProps {
	categories: Array<CategoryData>,
	bankAccounts: Array<BankAccountData>,
}

export default function Index({
	categories,
	bankAccounts,
}: MainSpaceProps) {
	const handleSetCategories = useAction(categoriesAtom.set)
	const handleSetBankAccounts = useAction(bankAccountsAtom.set)
	const [mainCategories, subCategories] = devideArray(categories, x => x.parentCategoryId === undefined)

	handleSetCategories({
		mainCategories: mainCategories as Array<MainCategoryData>,
		subCategories: subCategories as Array<SubCategoryData>,
	})
	handleSetBankAccounts(bankAccounts)

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
	const session = await getSession(context)
	if (!session?.user) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		}
	}

	const categories = await prisma.category.findMany({ where: { user: {
		id: verify(session.user.id, 'Server error: user not found'),
	}}})

	const bankAccounts = await prisma.bankAccount.findMany({ where: { user: {
		id: verify(session.user.id, 'Server error: user not found'),
	}}})

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
			bankAccounts: bankAccounts.map(x => {
				const remappedValue: BankAccountData = {
					id: x.id,
					name: x.name,
					color: x.color as ColorId,
					money: x.money.toNumber(),
					userId: x.userId,
				}
				if (x.description) {
					remappedValue.description = x.description
				}
				return remappedValue
			}),
		},
	}
}