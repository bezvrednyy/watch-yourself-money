import {Transaction} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetTransactionsLeftData,
	GetTransactionsRequest,
	GetTransactionsRightData,
} from '../../../backFrontJoint/common/contracts/transactions/getTransactionsContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'
import {TransactionData} from '../../../pagesComponents/main-space/model/transactionsAtom'

export default async function getTransactions(req: GetTransactionsRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {startDate, endDate} = req.body.data
		const categories = await prisma.category.findMany({where: {user: {
			id: session.user.id,
		}}})

		if (categories.length === 0) {
			sendJsonLeftData<GetTransactionsLeftData>(res, 500, createStandardError('SERVER_ERROR', 'NO_CATEGORIES_FOUND'))
			return
		}

		const transactions = await prisma.transaction.findMany({
			where: {
				categoryId: { in: categories.map(x => x.id) },
				date: { gte: startDate, lte: endDate },
			},
			orderBy: { date: 'desc' },
			take: 30,
		})
		sendJsonRightData<GetTransactionsRightData>(res, transactions.map(x => remapTransactionToTransactionData(x)))
	}
	catch (error) {
		sendJsonLeftData<GetTransactionsLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}

function remapTransactionToTransactionData(data: Transaction): TransactionData {
	const remappedValue: TransactionData = {
		id: data.id,
		categoryId: data.categoryId,
		bankAccountId: data.bankAccountId,
		money: data.money.toNumber(),
		currencyId: data.currencyId,
		timestamp: data.date.getTime(),
	}
	if (data.comment) {
		remappedValue.comment = data.comment
	}
	return remappedValue
}