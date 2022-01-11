import {joinStrings} from '../../common/utils/string'
import {ExternalLayer} from './layers/ExternalLayer'

type PopupDefaultProps = {
	title?: string,
	createContent: () => JSX.Element,
	buttons: Array<JSX.Element>,
	show: boolean,
	onOverlayClick?: () => void,
	className?: string,
}

/**
 * @description Если модальное окно должно открывать ещё одно, то второе окно должно быть обязательно вложено в первое
 */
export function PopupDefault(props: PopupDefaultProps) {
	return <ExternalLayer
		show={props.show}
		createComponent={() => <PopupDefaultContent {...props} />}
		onOverlayClick={props.onOverlayClick}
	/>
}

type PopupDefaultContent = {
	title?: string,
	createContent: () => JSX.Element,
	buttons: Array<JSX.Element>,
	className?: string,
}

function PopupDefaultContent({
	title,
	createContent,
	buttons,
	className,
}: PopupDefaultContent) {
	return (
		<div className={joinStrings(
			'inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl',
			className,
		)}>
			{!!title && <h3 className='text-lg font-medium leading-6 text-gray-900 mb-2'>{title}</h3>}
			{createContent()}
			{!!buttons.length && <div className='mt-4 space-x-2'>{buttons}</div>}
		</div>
	)
}