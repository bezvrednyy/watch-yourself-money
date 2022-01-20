import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetBankAccountLeftData,
	GetBankAccountRightData,
} from '../../../backFrontJoint/common/contracts/bankAccounts/getBankAccountsContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'
import {remapBankAccountToBankAccountData} from '../../main-space/remapMainSpaceData'

export default async function getBankAccounts(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const accounts = await prisma.bankAccount.findMany({
			where: { userId: session.user.id },
			orderBy: { id: 'asc' }, //TODO:newFeature добавить возможность кастомной сортировки
		})

		if (accounts.length === 0) {
			sendJsonLeftData<GetBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', 'NO_BANK_ACCOUNTS_FOUND'))
			return
		}

		sendJsonRightData<GetBankAccountRightData>(res, accounts.map(remapBankAccountToBankAccountData))
	}
	catch (error) {
		sendJsonLeftData<GetBankAccountLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}