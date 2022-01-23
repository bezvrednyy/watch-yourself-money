import {Prisma} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	EditTransactionLeftData,
	EditTransactionRequest,
	EditTransactionRightData,
} from '../../../backFrontJoint/common/contracts/transactions/editTransactionContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function editTransaction(req: EditTransactionRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const data = req.body.data
		const currentTransactionData = await prisma.transaction.findUnique({
			where: { id: data.id },
			select: {
				category: { select: {
					userId: true,
					type: true,
				}},
				money: true,
			},
		})

		if (!currentTransactionData) {
			return sendJsonLeftData<EditTransactionLeftData>(res, 400, createTypeError('TRANSACTION_NOT_FOUND'))
		}

		const { category } = currentTransactionData
		if (category.userId !== session?.user.id) {
			return sendJsonLeftData<EditTransactionLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}

		await prisma.$transaction([
			prisma.bankAccount.update({
				where: { id: data.bankAccountId },
				data: { money: currentTransactionData.category.type === 'EXPENSES'
					? { increment: currentTransactionData.money.sub(data.money) }
					: { decrement: currentTransactionData.money.sub(data.money) },
				},
			}),
			prisma.transaction.update({
				where: { id: data.id },
				data: {
					id: data.id,
					categoryId: data.categoryId,
					bankAccountId: data.bankAccountId,
					currencyId: data.currencyId,
					comment: data.comment,
					money: new Prisma.Decimal(data.money),
					date: data.date,
				},
			}),
		])
		sendJsonRightData<EditTransactionRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<EditTransactionLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}