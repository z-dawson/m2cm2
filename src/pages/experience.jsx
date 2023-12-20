import { randomInt, sToMs } from '@/js/audio/common'
import { getLowestUnused } from '@/js/helpers'
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import TabAudio from '../js/audio/tab-audio'

const tabReopenPercentage = 35

const Experience = () => {
	const [tabs, setTabs] = useState([0])
	const [selected, select] = useState(0)
	const loaded = useRef(false)
	const tabAudio = useRef()

	useEffect(() => {
		tabAudio.current = new TabAudio()
		tabAudio.current.load().then(() => {
			loaded.current = true
			tabs.forEach((tab) => tabAudio.current.play(tab))
		})
		return () => {
			console.log(tabAudio.current)
			tabAudio.current.stopAll()
		}
	}, [])

	const addTab = () => {
		if (!loaded.current) return
		setTabs((prev) => {
			const newValue = getLowestUnused(prev)
			tabAudio.current.play(newValue)
			select(prev.length)
			return [...prev, newValue]
		})
	}

	const getTagRemover = (removed) => (event) => {
		event.stopPropagation()
		if (!loaded.current) return
		tabAudio.current.stop(tabs[removed])
		setTabs((prev) => {
			const next = [...prev]
			next.splice(removed, 1)
			select((selected) => {
				return removed < selected || selected === next.length
					? selected - 1
					: selected
			})
			if (randomInt(100) < tabReopenPercentage) {
				setTimeout(() => {
					addTab()
				}, sToMs(0.5))
			}
			return next
		})
	}

	return (
		<>
			<Tabs
				style={{ border: 'solid gray 1px', userSelect: 'none', margin: '1rem' }}
				selectedIndex={selected}
				onSelect={(index) => {
					select(index)
				}}
			>
				<TabList>
					{tabs.map((tab, index) => {
						return (
							<Tab
								key={tab}
								onClick={() => {
									tabAudio.current.restart(tab)
								}}
							>
								Tab {tab + 1}{' '}
								{tabs.length > 1 && (
									<CloseSquareFilled onClick={getTagRemover(index)} />
								)}
							</Tab>
						)
					})}
					{tabs.length < 20 && (
						<Button icon={<PlusOutlined />} type="text" onClick={addTab} />
					)}
				</TabList>

				{tabs.map((tab) => {
					return (
						<TabPanel
							key={tab}
							style={{
								height: '90vh',
								padding: '1rem',
							}}
						>
							<h2>Tab {tab + 1}</h2>
						</TabPanel>
					)
				})}
			</Tabs>
		</>
	)
}
export default Experience
