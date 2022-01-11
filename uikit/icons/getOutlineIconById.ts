import {
	AcademicCapIcon,
	AnnotationIcon,
	BeakerIcon,
	BellIcon,
	BookOpenIcon,
	BookmarkIcon,
	BriefcaseIcon,
	CakeIcon,
	CalculatorIcon,
	CalendarIcon,
	CameraIcon,
	CashIcon,
	ChartBarIcon,
	ChartPieIcon,
	ChipIcon,
	ClipboardIcon,
	ClipboardListIcon,
	ClockIcon,
	CloudIcon,
	CodeIcon,
	CogIcon,
	CreditCardIcon,
	CubeIcon,
	CurrencyDollarIcon,
	DatabaseIcon,
	DesktopComputerIcon,
	DeviceMobileIcon,
	EmojiHappyIcon,
	EmojiSadIcon,
	ExclamationCircleIcon,
	ExclamationIcon,
	FingerPrintIcon,
	FireIcon,
	FlagIcon,
	GiftIcon,
	GlobeAltIcon,
	GlobeIcon,
	HandIcon,
	HashtagIcon,
	HeartIcon,
	HomeIcon,
	IdentificationIcon,
	KeyIcon,
	LibraryIcon,
	LightBulbIcon,
	LightningBoltIcon,
	LinkIcon,
	LocationMarkerIcon,
	LockClosedIcon,
	LockOpenIcon,
	MailIcon,
	MapIcon,
	MicrophoneIcon,
	MoonIcon,
	MusicNoteIcon,
	OfficeBuildingIcon,
	PaperClipIcon,
	PauseIcon,
	PhoneIcon,
	PhotographIcon, PlayIcon, PlusSmIcon,
	PrinterIcon,
	PuzzleIcon,
	ShareIcon, ShoppingBagIcon, ShoppingCartIcon, SpeakerphoneIcon, StarIcon,
	SunIcon, TranslateIcon, TrashIcon,
	TruckIcon, UserGroupIcon, UsersIcon, VolumeUpIcon, WifiIcon,
} from '@heroicons/react/outline'
import * as React from 'react'
import {checkNever} from '../../common/utils/checkNever'

export type OutlineIconId = 'outline-academic-cap'|
	'outline-annotation'|
	'outline-beaker'|
	'outline-bell'|
	'outline-book-open'|
	'outline-bookmark'|
	'outline-cake'|
	'outline-briefcase'|
	'outline-calculator'|
	'outline-calendar'|
	'outline-camera'|
	'outline-cash'|
	'outline-chart-bar'|
	'outline-chart-pie'|
	'outline-chip'|
	'outline-clipboard-list'|
	'outline-clipboard'|
	'outline-clock'|
	'outline-cloud'|
	'outline-code'|
	'outline-cog'|
	'outline-cube'|
	'outline-credit-card'|
	'outline-currency-dollar'|
	'outline-database'|
	'outline-desktop-computer'|
	'outline-device-mobile'|
	'outline-emoji-happy'|
	'outline-emoji-sad'|
	'outline-exclamation-circle'|
	'outline-exclamation'|
	'outline-finger-print'|
	'outline-fire'|
	'outline-flag'|
	'outline-gift'|
	'outline-globe-alt'|
	'outline-globe'|
	'outline-hand'|
	'outline-hashtag'|
	'outline-heart'|
	'outline-home'|
	'outline-identification'|
	'outline-key'|
	'outline-library'|
	'outline-light-bulb'|
	'outline-lightning-bolt'|
	'outline-link'|
	'outline-location-marker'|
	'outline-lock-closed'|
	'outline-lock-open'|
	'outline-mail'|
	'outline-map'|
	'outline-microphone'|
	'outline-moon'|
	'outline-music-note'|
	'outline-office-building'|
	'outline-paper-clip'|
	'outline-pause'|
	'outline-phone'|
	'outline-photograph'|
	'outline-plus-sm' |
	'outline-play'|
	'outline-printer'|
	'outline-puzzle'|
	'outline-share'|
	'outline-shopping-bag'|
	'outline-shopping-cart'|
	'outline-speakerphone'|
	'outline-star'|
	'outline-sun'|
	'outline-translate'|
	'outline-trash'|
	'outline-truck'|
	'outline-user-group'|
	'outline-users'|
	'outline-volume-up'|
	'outline-wifi'

// eslint-disable-next-line complexity
export function getOutlineIconById(id: OutlineIconId): React.FC<React.ComponentProps<'svg'>> {
	switch (id) {
		case 'outline-academic-cap':
			return AcademicCapIcon
		case 'outline-annotation':
			return AnnotationIcon
		case 'outline-beaker':
			return BeakerIcon
		case 'outline-bell':
			return BellIcon
		case 'outline-book-open':
			return BookOpenIcon
		case 'outline-bookmark':
			return BookmarkIcon
		case 'outline-cake':
			return CakeIcon
		case 'outline-briefcase':
			return BriefcaseIcon
		case 'outline-calculator':
			return CalculatorIcon
		case 'outline-calendar':
			return CalendarIcon
		case 'outline-camera':
			return CameraIcon
		case 'outline-cash':
			return CashIcon
		case 'outline-chart-bar':
			return ChartBarIcon
		case 'outline-chart-pie':
			return ChartPieIcon
		case 'outline-chip':
			return ChipIcon
		case 'outline-clipboard-list':
			return ClipboardListIcon
		case 'outline-clipboard':
			return ClipboardIcon
		case 'outline-clock':
			return ClockIcon
		case 'outline-cloud':
			return CloudIcon
		case 'outline-code':
			return CodeIcon
		case 'outline-cog':
			return CogIcon
		case 'outline-cube':
			return CubeIcon
		case 'outline-credit-card':
			return CreditCardIcon
		case 'outline-currency-dollar':
			return CurrencyDollarIcon
		case 'outline-database':
			return DatabaseIcon
		case 'outline-desktop-computer':
			return DesktopComputerIcon
		case 'outline-device-mobile':
			return DeviceMobileIcon
		case 'outline-emoji-happy':
			return EmojiHappyIcon
		case 'outline-emoji-sad':
			return EmojiSadIcon
		case 'outline-exclamation-circle':
			return ExclamationCircleIcon
		case 'outline-exclamation':
			return ExclamationIcon
		case 'outline-finger-print':
			return FingerPrintIcon
		case 'outline-fire':
			return FireIcon
		case 'outline-flag':
			return FlagIcon
		case 'outline-gift':
			return GiftIcon
		case 'outline-globe-alt':
			return GlobeAltIcon
		case 'outline-globe':
			return GlobeIcon
		case 'outline-hand':
			return HandIcon
		case 'outline-hashtag':
			return HashtagIcon
		case 'outline-heart':
			return HeartIcon
		case 'outline-home':
			return HomeIcon
		case 'outline-identification':
			return IdentificationIcon
		case 'outline-key':
			return KeyIcon
		case 'outline-library':
			return LibraryIcon
		case 'outline-light-bulb':
			return LightBulbIcon
		case 'outline-lightning-bolt':
			return LightningBoltIcon
		case 'outline-link':
			return LinkIcon
		case 'outline-location-marker':
			return LocationMarkerIcon
		case 'outline-lock-closed':
			return LockClosedIcon
		case 'outline-lock-open':
			return LockOpenIcon
		case 'outline-mail':
			return MailIcon
		case 'outline-map':
			return MapIcon
		case 'outline-microphone':
			return MicrophoneIcon
		case 'outline-moon':
			return MoonIcon
		case 'outline-music-note':
			return MusicNoteIcon
		case 'outline-office-building':
			return OfficeBuildingIcon
		case 'outline-paper-clip':
			return PaperClipIcon
		case 'outline-pause':
			return PauseIcon
		case 'outline-phone':
			return PhoneIcon
		case 'outline-photograph':
			return PhotographIcon
		case 'outline-plus-sm':
			return PlusSmIcon
		case 'outline-play':
			return PlayIcon
		case 'outline-printer':
			return PrinterIcon
		case 'outline-puzzle':
			return PuzzleIcon
		case 'outline-share':
			return ShareIcon
		case 'outline-shopping-bag':
			return ShoppingBagIcon
		case 'outline-shopping-cart':
			return ShoppingCartIcon
		case 'outline-speakerphone':
			return SpeakerphoneIcon
		case 'outline-star':
			return StarIcon
		case 'outline-sun':
			return SunIcon
		case 'outline-translate':
			return TranslateIcon
		case 'outline-trash':
			return TrashIcon
		case 'outline-truck':
			return TruckIcon
		case 'outline-user-group':
			return UserGroupIcon
		case 'outline-users':
			return UsersIcon
		case 'outline-volume-up':
			return VolumeUpIcon
		case 'outline-wifi':
			return WifiIcon
		default:
			checkNever(id, `Unknown icon id: ${id}`)
			throw new Error()
	}
}

export function getDefaultIconIds(): Array<OutlineIconId> {
	return [
		'outline-academic-cap',
		'outline-annotation',
		'outline-beaker',
		'outline-bell',
		'outline-book-open',
		'outline-bookmark',
		'outline-cake',
		'outline-briefcase',
		'outline-calculator',
		'outline-calendar',
		'outline-camera',
		'outline-cash',
		'outline-chart-bar',
		'outline-chart-pie',
		'outline-chip',
		'outline-clipboard-list',
		'outline-clipboard',
		'outline-clock',
		'outline-cloud',
		'outline-code',
		'outline-cog',
		'outline-cube',
		'outline-credit-card',
		'outline-currency-dollar',
		'outline-database',
		'outline-desktop-computer',
		'outline-device-mobile',
		'outline-emoji-happy',
		'outline-emoji-sad',
		'outline-exclamation-circle',
		'outline-exclamation',
		'outline-finger-print',
		'outline-fire',
		'outline-flag',
		'outline-gift',
		'outline-globe-alt',
		'outline-globe',
		'outline-hand',
		'outline-hashtag',
		'outline-heart',
		'outline-home',
		'outline-identification',
		'outline-key',
		'outline-library',
		'outline-light-bulb',
		'outline-lightning-bolt',
		'outline-link',
		'outline-location-marker',
		'outline-lock-closed',
		'outline-lock-open',
		'outline-mail',
		'outline-map',
		'outline-microphone',
		'outline-moon',
		'outline-music-note',
		'outline-office-building',
		'outline-paper-clip',
		'outline-pause',
		'outline-phone',
		'outline-photograph',
		'outline-play',
		'outline-printer',
		'outline-puzzle',
		'outline-share',
		'outline-shopping-bag',
		'outline-shopping-cart',
		'outline-speakerphone',
		'outline-star',
		'outline-sun',
		'outline-translate',
		'outline-trash',
		'outline-truck',
		'outline-user-group',
		'outline-users',
		'outline-volume-up',
		'outline-wifi',
	]
}
