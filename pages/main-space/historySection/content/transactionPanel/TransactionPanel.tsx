import {useAction, useAtom} from '@reatom/react'
import {useMemo} from 'react'
import {joinStrings} from '../../../../../common/utils/string'
import {verify} from '../../../../../common/utils/verify'
import {Badge} from '../../../../../commonClient/uikit/Badge'
import {DatePicker} from '../../../../../commonClient/uikit/datePicker/DatePicker'
import {getOutlineIconById} from '../../../../../commonClient/uikit/icons/getOutlineIconById'
import {TextField} from '../../../../../commonClient/uikit/textField/TextField'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../commonClient/environment/userSettingsAtom'
import {ClientCategoryData, categoriesAtom} from '../../../model/categoriesAtom'
import styles from './TransactionPanel.module.css'
import {transactionPanelAtoms} from './model/transactionPanelAtoms'
import {BankAccountMenu} from './view/BankAccountMenu'
import {CategoryPicker} from './view/CategoryPicker'

export function TransactionPanel() {
	const [userSettings] = useAtom(userSettingsAtom)
	const [sum] = useAtom(transactionPanelAtoms.sumAtom)
	const [comment] = useAtom(transactionPanelAtoms.transactionCommentAtom)
	const [transactionDate] = useAtom(transactionPanelAtoms.transactionDateAtom)
	const handleSetSum = useAction(transactionPanelAtoms.sumAtom.set)
	const handleSetComment = useAction(transactionPanelAtoms.transactionCommentAtom.set)
	const handleSetDate = useAction(transactionPanelAtoms.transactionDateAtom.set)

	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return <div>
		<div className='flex items-center justify-between mb-2'>
			<CategoryPicker />
			<DatePicker
				date={transactionDate}
				onSelectedChanged={handleSetDate}
				inputClass='bg-transparent text-center w-32'
			/>
			<BankAccountMenu />
			<TextField
				style='link'
				value={`${sum}`}
				onInput={value => handleSetSum(Number(value))}
				size='xLarge'
				placeholder='100'
				required={true}
				inputType='number'
				inputClass={joinStrings(
					'w-16',
					styles.sum,
				)}
				createIcon={() => <div className='text-xl'>{currencySymbol}</div>}
			/>
		</div>
		<SubcategoriesSection/>
		<TextField
			style='default'
			value={comment}
			onInput={value => handleSetComment(value)}
			placeholder='#Products'
			required={true}
			inputType='text'
			maxLength={255}
		/>
	</div>
}

function SubcategoriesSection() {
	const [selectedCategoryId] = useAtom(transactionPanelAtoms.selectedCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const selectedCategory = verify(categories.mainCategories.find(x => x.id === selectedCategoryId))
	const subcategories = useMemo(
		() => categories.subCategories.filter(x => x.parentCategoryId === selectedCategory.id),
		[categories.subCategories, selectedCategory.id],
	)

	if (!subcategories.length) {
		return null
	}

	return (
		<div className='flex flex-wrap'>
			{subcategories.map(x => <SubcategoryBadge key={x.id} {...x} />)}
		</div>
	)
}

function SubcategoryBadge({
	id,
	title,
	iconId,
}: ClientCategoryData) {
	const [selectedSubcategoryId] = useAtom(transactionPanelAtoms.selectedSubcategoryIdAtom)
	const handleSetSelectedSubcategoryId = useAction(transactionPanelAtoms.selectedSubcategoryIdAtom.set)

	return (
		<Badge
			label={title}
			className={joinStrings(
				'rounded-full mr-1 mb-2 bg-indigo-300 border-2',
				styles['subcategory-badge'],
				selectedSubcategoryId === id ? 'border-indigo-500 opacity-100' : 'opacity-80 border-transparent',
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(iconId)
				return <IconFC className='w-4 h-4' />
			}}
			onClick={() => handleSetSelectedSubcategoryId(
				selectedSubcategoryId === id ? null : id,
			)}
			cornerType='rounded'
		/>
	)
}