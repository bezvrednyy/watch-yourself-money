import {useState} from 'react'

type TabsProps = {
	items: Array<string>,
}

function Tabs({
	items,
}: TabsProps) {
	const [selectedTab, setSelectedTab] = useState(0)
	return <ul className="flex justify-center items-center my-4">
		{items.map((text, index) => {
			return <Tab
				key={index}
				text={text}
				selected={selectedTab === index}
				onClick={() => setSelectedTab(index)}
			/>
		})}
	</ul>
}


type TabProps = {
	text: string,
	selected: boolean,
	onClick: () => void,
}

function Tab({
	text,
	selected,
	onClick,
}: TabProps) {
	return <li
		onClick={onClick}
		className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8${selected ? ' text-green-500 border-green-500' : ''}`}
	>
		{text}
	</li>
}

export {
	Tabs,
}