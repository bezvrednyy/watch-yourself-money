import {randomUUID} from 'crypto'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	CreateBankAccountLeftData,
	CreateBankAccountRequest,
	CreateBankAccountRightData,
} from '../../../backFrontJoint/common/contracts/bankAccounts/createBankAccountContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function createBankAccounts(req: CreateBankAccountRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const account = req.body.data
		await prisma.bankAccount.create({
			data: {
				id: randomUUID(),
				name: account.name,
				money: account.money,
				userId: session.user.id,
			}
		})

		sendJsonRightData<CreateBankAccountRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<CreateBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}