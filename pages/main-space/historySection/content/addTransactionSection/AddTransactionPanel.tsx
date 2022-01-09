import {useAction, useAtom} from '@reatom/react'
import {useMemo} from 'react'
import {joinClassNames} from '../../../../../common/joinClassNames'
import {verify} from '../../../../../common/verify'
import {Badge} from '../../../../../components/Badge'
import {getOutlineIconById} from '../../../../../components/icons/getOutlineIconById'
import {TextField} from '../../../../../components/textField/TextField'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../environment/userSettingsAtom'
import {CategoryData, categoriesAtom} from '../../../model/categoriesAtom'
import styles from './AddTransactionPanel.module.css'
import {addTransactionSectionAtoms} from './model/addTransactionSectionAtoms'
import {BankAccountMenu} from './view/BankAccountMenu'
import {CategoryPicker} from './view/CategoryPicker'

export function AddTransactionPanel() {
	const [userSettings] = useAtom(userSettingsAtom)
	const [sum] = useAtom(addTransactionSectionAtoms.sumAtom)
	const [comment] = useAtom(addTransactionSectionAtoms.transactionCommentAtom)
	const handleSetSum = useAction(addTransactionSectionAtoms.sumAtom.set)
	const handleSetComment = useAction(addTransactionSectionAtoms.transactionCommentAtom.set)

	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return <div>
		<div className='flex items-center justify-between mb-2'>
			<CategoryPicker />
			<BankAccountMenu />
			<TextField
				style='link'
				value={`${sum}`}
				onInput={value => handleSetSum(Number(value))}
				size='xLarge'
				placeholder='100'
				required={true}
				inputType='number'
				inputClass={joinClassNames(
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
	const [selectedCategoryId] = useAtom(addTransactionSectionAtoms.selectedCategoryIdAtom)
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
}: CategoryData) {
	const [selectedSubcategoryId] = useAtom(addTransactionSectionAtoms.selectedSubcategoryIdAtom)
	const handleSetSelectedSubcategoryId = useAction(addTransactionSectionAtoms.selectedSubcategoryIdAtom.set)

	return (
		<Badge
			label={title}
			className={joinClassNames(
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