import {BankAccount, Category, Transaction} from '@prisma/client'
import {ColorId} from '../../common/colors/colors'
import {OutlineIconId} from '../../commonClient/uikit/icons/getOutlineIconById'
import {BankAccountData} from './model/bankAccountsAtom'
import {ClientCategoryData} from './model/categoriesAtom'
import {TransactionData} from './model/transactionsAtom'

function remapCategoryToCategoryData(data: Category): ClientCategoryData {
	const remappedValue: ClientCategoryData = {
		id: data.id,
		title: data.name,
		type: data.type,
		iconId: data.iconId as OutlineIconId,
		colorId: data.color as ColorId,
	}
	if (data.parentCategoryId) {
		remappedValue.parentCategoryId = data.parentCategoryId
	}
	return remappedValue
}

function remapBankAccountToBankAccountData(data: BankAccount): BankAccountData {
	return {
		id: data.id,
		name: data.name,
		colorId: data.color as ColorId,
		money: data.money.toNumber(),
		userId: data.userId,
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

export {
	remapBankAccountToBankAccountData,
	remapCategoryToCategoryData,
	remapTransactionToTransactionData,
}