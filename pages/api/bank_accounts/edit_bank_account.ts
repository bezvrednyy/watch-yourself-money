import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	EditBankAccountLeftData,
	EditBankAccountRequest,
	EditBankAccountRightData,
} from '../../../backFrontJoint/common/contracts/bankAccounts/editBankAccountContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function editBankAccounts(req: EditBankAccountRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const account = req.body.data
		const currentData = await prisma.bankAccount.findUnique({
			where: { id: account.id },
			select: { userId: true },
		})

		if (!currentData) {
			return sendJsonLeftData<EditBankAccountLeftData>(res, 400, createTypeError('BANK_ACCOUNT_NOT_FOUND'))
		}
		if (currentData.userId !== session.user.id) {
			return sendJsonLeftData<EditBankAccountLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}

		await prisma.bankAccount.update({
			where: { id: account.id },
			data: { name: account.name }
		})
		sendJsonRightData<EditBankAccountRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<EditBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}