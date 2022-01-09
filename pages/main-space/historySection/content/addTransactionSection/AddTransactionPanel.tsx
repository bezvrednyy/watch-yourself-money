import {useAction, useAtom} from '@reatom/react'
import {useMemo} from 'react'
import {getColorById} from '../../../../../common/colors/theme'
import {joinClassNames} from '../../../../../common/joinClassNames'
import {verify} from '../../../../../common/verify'
import {Badge} from '../../../../../components/Badge'
import {ButtonWithPopover} from '../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {getOutlineIconById} from '../../../../../components/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../components/popovers/PopoverDefault'
import {RoundedSquare} from '../../../../../components/RoundedSquare'
import {TextField} from '../../../../../components/textField/TextField'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../environment/userSettingsAtom'
import {CategoryData, categoriesAtom} from '../../../model/categoriesAtom'
import styles from './AddTransactionPanel.module.css'
import {addTransactionSectionAtoms} from './model/addTransactionSectionAtoms'

export function AddTransactionPanel() {
	const [userSettings] = useAtom(userSettingsAtom)
	const [sum] = useAtom(addTransactionSectionAtoms.sumAtom)
	const handleSetSum = useAction(addTransactionSectionAtoms.sumAtom.set)

	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return <div>
		<div className='flex items-center'>
			<CategoryPicker/>
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
	</div>
}

function CategoryPicker() {
	const [selectedCategoryId] = useAtom(addTransactionSectionAtoms.selectedCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const selectedCategory = verify(categories.mainCategories.find(x => x.id === selectedCategoryId))
	const IconFC = getOutlineIconById(selectedCategory.iconId)

	return <ButtonWithPopover
		createButton={() => <RoundedSquare
			createIcon={() => <IconFC className='m-1 w-6 h-6 overflow-hidden' />}
			bgHexColor={getColorById(selectedCategory.colorId)}
			className='transform transition hover:scale-105 cursor-pointer shadow'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent/>}
		/>}
	/>
}

function PopoverContent() {
	const [categories] = useAtom(categoriesAtom)
	const handleSetSelectCategoryId = useAction(addTransactionSectionAtoms.selectedCategoryIdAtom.set)

	return (
		<div className='flex flex-wrap'>
			{categories.mainCategories.map(item => {
				const Icon = getOutlineIconById(item.iconId)
				return <RoundedSquare
					key={item.id}
					createIcon={() => <Icon className='m-1 w-6 h-6 overflow-hidden'/>}
					title={item.title}
					onClick={() => handleSetSelectCategoryId(item.id)}
					bgHexColor={getColorById(item.colorId)}
					className='m-1 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
				/>
			})}
		</div>
	)
}

function SubcategoriesSection() {
	const [selectedCategoryId] = useAtom(addTransactionSectionAtoms.selectedCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const selectedCategory = verify(categories.mainCategories.find(x => x.id === selectedCategoryId))
	const subcategories = useMemo(
		() => categories.subCategories.filter(x => x.parentCategoryId === selectedCategory.id),
		[categories.subCategories, selectedCategory.id],
	)
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
	const handleSetSelectedSubcategoryId = useAction(addTransactionSectionAtoms.selectedSubcategoryIdAtom.set)
	return (
		<Badge
			label={title}
			className={joinClassNames(
				'rounded-full mr-1 mt-2 bg-indigo-300',
				styles['subcategory-badge'],
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(iconId)
				return <IconFC className='w-4 h-4' />
			}}
			onClick={() => handleSetSelectedSubcategoryId(id)}
			cornerType='rounded'
		/>
	)
}