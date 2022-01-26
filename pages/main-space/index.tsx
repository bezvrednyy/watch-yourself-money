import {useAction} from '@reatom/react'
import {GetServerSidePropsResult, NextPageContext} from 'next'
import {Session} from 'next-auth'
import {getSession} from 'next-auth/react'
import {devideArray} from '../../common/utils/array'
import prisma from '../../prisma/prisma'
import {BankAccountData, bankAccountsAtom} from '../../pagesComponents/main-space/model/bankAccountsAtom'
import {ClientCategoryData, MainCategoryData, SubCategoryData, categoriesAtom} from '../../pagesComponents/main-space/model/categoriesAtom'
import styles from './index.module.css'
import {MainLayout} from '../../pagesComponents/common/uikit/layouts/MainLayout'
import {BankAccountsSection} from '../../pagesComponents/main-space/bankAccountsSection/BankAccountsSection'
import {CategoriesSection} from '../../pagesComponents/main-space/categoriesSection/CategoriesSection'
import {HistorySection} from '../../pagesComponents/main-space/historySection/HistorySection'
import {joinStrings} from '../../common/utils/string'
import {TransactionData, transactionsAtom} from '../../pagesComponents/main-space/model/transactionsAtom'
import {remapBankAccountToBankAccountData, remapCategoryToCategoryData, remapTransactionToTransactionData} from './remapMainSpaceData'

interface MainSpaceProps {
	categories: Array<ClientCategoryData>,
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
		<MainLayout title='Home page' className={joinStrings('flex w-[1394px] mx-auto', styles.container)}>
			<BankAccountsSection/>
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

	//Сортируем любую выборку категорий одинаково, чтобы было соответствие в отображении: категорий и диаграммы
	const categories = await prisma.category.findMany({
		where: { user: { id: session.user.id } },
		orderBy: { id: 'asc' }, //TODO:newFeature добавить возможность кастомной сортировки
	})

	const bankAccounts = await prisma.bankAccount.findMany({
		where: { user: { id: session.user.id }},
		orderBy: { id: 'asc' }, //TODO:newFeature добавить возможность кастомной сортировки
	})

	const transactions = await prisma.transaction.findMany({
		where: { categoryId: { in: categories.map(x => x.id) } },
		orderBy: { date: 'desc' },
		take: 30,
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