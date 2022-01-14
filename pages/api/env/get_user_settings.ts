import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetUserSettingsContractLeftData,
	GetUserSettingsContractRightData,
} from '../../../backFrontJoint/common/contracts/env/getUserSettingsContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function getUserSettings(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })

	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	try {
		const settings = await prisma.userSettings.findFirst({where: {
			userId: session?.user.id,
		}})

		if (settings) {
			return sendJsonRightData<GetUserSettingsContractRightData>(res, settings)
		}
		sendJsonLeftData<GetUserSettingsContractLeftData>(res, 500, createStandardError('SERVER_ERROR', 'USER_SETTINGS_NOT_FOUND'))
	}
	catch (error) {
		sendJsonLeftData<GetUserSettingsContractLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}