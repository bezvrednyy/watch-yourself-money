import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	RemoveTransactionLeftData,
	RemoveTransactionRequest,
	RemoveTransactionRightData,
} from '../../../backFrontJoint/common/contracts/transactions/removeTransactionContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function removeTransaction(req: RemoveTransactionRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const { transactionId } = req.body.data
		const transactionData = await prisma.transaction.findUnique({
			where: { id: transactionId },
			select: { category: {
				select: { userId: true } },
			},
		})

		if (!transactionData) {
			return sendJsonLeftData<RemoveTransactionLeftData>(res, 400, createTypeError('TRANSACTION_NOT_FOUND'))
		}

		const { category } = transactionData
		if (category.userId !== session?.user.id) {
			return sendJsonLeftData<RemoveTransactionLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}

		await prisma.transaction.delete({ where: { id: transactionId } })
		sendJsonRightData<RemoveTransactionRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<RemoveTransactionLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}