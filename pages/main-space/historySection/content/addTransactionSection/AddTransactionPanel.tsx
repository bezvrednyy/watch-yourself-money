import {useAction, useAtom} from '@reatom/react'
import {getColorById} from '../../../../../common/colors/theme'
import {joinClassNames} from '../../../../../common/joinClassNames'
import {verify} from '../../../../../common/verify'
import {ButtonWithPopover} from '../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {getOutlineIconById} from '../../../../../components/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../components/popovers/PopoverDefault'
import {RoundedSquare} from '../../../../../components/RoundedSquare'
import {TextField} from '../../../../../components/textField/TextField'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../environment/userSettingsAtom'
import {categoriesAtom} from '../../../model/categoriesAtom'
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