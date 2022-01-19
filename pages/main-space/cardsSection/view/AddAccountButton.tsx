import {joinStrings} from '../../../../common/utils/string'
import {PlusIcon} from '@heroicons/react/solid'

function AddAccountButton() {
	return (
		<div className={joinStrings(
			'group flex box-border w-full px-8 py-3 rounded-full items-center justify-center',
			'cursor-pointer shadow-lg bg-slate-50 hover:bg-white hover:shadow-xl transition duration-300',
		)}>
			<PlusIcon className={joinStrings(
				'w-10 h-10 ml-2 text-gray-800',
				'group-hover:text-green-500 transition',
			)}/>
		</div>
	)
}

export {
	AddAccountButton,
}