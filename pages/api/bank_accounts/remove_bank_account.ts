import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	RemoveBankAccountLeftData,
	RemoveBankAccountRequest,
	RemoveBankAccountRightData,
} from '../../../backFrontJoint/common/contracts/bankAccounts/removeBankAccountContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function editBankAccounts(req: RemoveBankAccountRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {id: accountId, movingTransactionsAccountId} = req.body.data
		const [currentData, accountsCount, movingTransactionsAccount] = await Promise.all([
			prisma.bankAccount.findUnique({
				where: { id: accountId },
				select: { userId: true },
			}),
			prisma.bankAccount.count({ where: {
				userId: session.user.id,
			}}),
			prisma.bankAccount.findUnique({
				where: { id: movingTransactionsAccountId },
			}),
		])

		if (!currentData) {
			return sendJsonLeftData<RemoveBankAccountLeftData>(res, 400, createTypeError('BANK_ACCOUNT_NOT_FOUND'))
		}
		if (accountsCount === 1) {
			return sendJsonLeftData<RemoveBankAccountLeftData>(res, 400, createTypeError('LAST_BANK_ACCOUNT'))
		}
		if (!movingTransactionsAccount) {
			return sendJsonLeftData<RemoveBankAccountLeftData>(res, 400, createTypeError('ACCOUNT_FOR_MOVING_TRANSACTIONS_NOT_FOUND'))
		}

		if (currentData.userId !== session.user.id) {
			return sendJsonLeftData<RemoveBankAccountLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}
		if (accountsCount < 1) {
			return sendJsonLeftData<RemoveBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', 'NO_BANK_ACCOUNTS_FOUND'))
		}

		if (movingTransactionsAccountId) {
			await prisma.$transaction([
				prisma.transaction.updateMany({
					where: { bankAccountId: accountId },
					data: { bankAccountId: movingTransactionsAccountId },
				}),
				prisma.bankAccount.delete({where: { id: accountId }}),
			])
		}
		else {
			await prisma.bankAccount.delete({where: { id: accountId }})
		}
		sendJsonRightData<RemoveBankAccountRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<RemoveBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}