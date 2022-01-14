import {Prisma} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	CreateTransactionLeftData,
	CreateTransactionRequest, CreateTransactionRightData,
} from '../../../backFrontJoint/common/contracts/transactions/createTransactionContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function createTransaction(req: CreateTransactionRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	try {
		const data = req.body.data
		const categoryInfo = await prisma.category.findUnique({
			where: { id: data.categoryId },
			select: { userId: true },
		})

		if (!categoryInfo) {
			return sendJsonLeftData<CreateTransactionLeftData>(res, 400, createTypeError('CATEGORY_NOT_FOUND'))
		}
		if (categoryInfo.userId !== session?.user.id) {
			return sendJsonLeftData<CreateTransactionLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}

		await prisma.transaction.create({
			data: {
				id: data.id,
				categoryId: data.categoryId,
				bankAccountId: data.bankAccountId,
				currencyId: data.currencyId,
				comment: data.comment,
				money: new Prisma.Decimal(data.money),
				date: data.date,
			},
		})
		sendJsonRightData<CreateTransactionRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<CreateTransactionLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}