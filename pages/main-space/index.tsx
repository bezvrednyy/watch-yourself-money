import {useAction} from '@reatom/react'
import {GetServerSidePropsResult, NextPageContext} from 'next'
import {Session} from 'next-auth'
import {getSession} from 'next-auth/react'
import {devideArray} from '../../common/array'
import {verify} from '../../common/verify'
import prisma from '../../prisma/prisma'
import {BankAccountData, bankAccountsAtom} from './model/bankAccountsAtom'
import {CategoryData, MainCategoryData, SubCategoryData, categoriesAtom} from './model/categoriesAtom'
import styles from './index.module.css'
import {MainLayout} from '../../uikit/layouts/MainLayout'
import {CardsSection} from './cardsSection/CardsSection'
import {CategoriesSection} from './categoriesSection/CategoriesSection'
import {HistorySection} from './historySection/HistorySection'
import {joinStrings} from '../../common/string'
import {TransactionData, transactionsAtom} from './model/transactionsAtom'
import {remapBankAccountToBankAccountData, remapCategoryToCategoryData, remapTransactionToTransactionData} from './remapMainSpaceData'

interface MainSpaceProps {
	categories: Array<CategoryData>,
	bankAccounts: Array<BankAccountData>,
	transactions: Array<TransactionData>,
}

export default function Index({
	categories,
	bankAccounts,
	transactions,
}: MainSpaceProps) {
	const handleSetCategories = useAction(categoriesAtom.set)
	const handleSetBankAccounts = useAction(bankAccountsAtom.set)
	const handleSetTransactions = useAction(transactionsAtom.set)
	const [mainCategories, subCategories] = devideArray(categories, x => x.parentCategoryId === undefined)

	handleSetCategories({
		mainCategories: mainCategories as Array<MainCategoryData>,
		subCategories: subCategories as Array<SubCategoryData>,
	})
	handleSetBankAccounts(bankAccounts)
	handleSetTransactions(transactions)

	return (
		<MainLayout title='Home page' className={joinStrings('flex', styles.container)}>
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

	//TODO:Переделать на lazyLoad
	const transactions = await prisma.transaction.findMany({
		where: {
			categoryId: {
				in: categories.map(x => x.id),
			},
		},
		orderBy: {
			date: 'desc',
		},
	})

	return {
		props: {
			session,
			categories: categories.map(x => remapCategoryToCategoryData(x)),
			bankAccounts: bankAccounts.map(x => remapBankAccountToBankAccountData(x)),
			transactions: transactions.map(x => remapTransactionToTransactionData(x)),
		},
	}
}