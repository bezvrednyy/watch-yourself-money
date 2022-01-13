import {Prisma} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {getBackendTextErrorResponse} from '../../../backFrontJoint/backendApi/processBackendError'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {sendJsonTextError} from '../../../backFrontJoint/backendApi/sendJsonTextError'
import {
	CreateTransactionLeftData,
	CreateTransactionRequest, CreateTransactionRightData,
} from '../../../backFrontJoint/common/contracts/transactions/createTransactionContract'
import prisma from '../../../prisma/prisma'

export default async function createTransaction(req: CreateTransactionRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	try {
		const data = req.body.data
		const categoryInfo = await prisma.category.findFirst({
			where: {
				id: data.categoryId,
			},
			select: {
				userId: true,
			},
		})

		//TODO:clientApi, нужно отправлять типы ошибок, а на фронте отображать текст
		if (!categoryInfo) {
			return sendJsonTextError(res, 500, 'Category not found')
		}
		if (categoryInfo.userId !== session?.user.id) {
			return sendJsonTextError(res, 403, 'Not enough rights')
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
		sendJsonLeftData<CreateTransactionLeftData>(res, 500, getBackendTextErrorResponse(error))
	}
}