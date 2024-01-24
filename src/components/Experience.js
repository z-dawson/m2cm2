'use client'
import { randomInt, sToMs } from '@/js/audio/common'
import { getLowestUnused } from '@/js/helpers'
import { PlusOutlined, CloseSquareFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import TabAudio from '../js/audio/tab-audio'
import { prefix } from '@/js/constants'

const tabExceptionPercentage = 30
const maxTabs = 20

const Experience = ({ onAllClosed }) => {
	const [tabs, setTabs] = useState([])
	const [selected, select] = useState(0)
	const loaded = useRef(false)
	const tabAudio = useRef()
	const firstTabInteraction = useRef(true)
	const tabToAudioMapping = useRef([])

	useEffect(() => {
		tabAudio.current = new TabAudio()
		tabAudio.current.load().then(() => {
			loaded.current = true
			// tabToAudioMapping.current = tabs.map((tab) => tabAudio.current.play(tab))
			addTab()
		})
		return () => {
			tabAudio.current.stopAll()
		}
	}, [])

	const addTab = (chance) => {
		if (!loaded.current) return
		const computedPercentage =
			typeof chance === 'number' ? chance : tabExceptionPercentage
		setTabs((prev) => {
			const moreThanOne =
				randomInt(100) < computedPercentage && prev.length < maxTabs / 2
			const newTabs = Array.from(
				new Array(moreThanOne ? randomInt(2, 6) : 1)
			).reduce(
				(newTabs) => {
					const tab = getLowestUnused(newTabs)
					tabToAudioMapping.current[tab] = tabAudio.current.play(tab)
					return [...newTabs, tab]
				},
				[...prev]
			)
			select(newTabs.length - 1)
			firstTabInteraction.current = false
			return newTabs
		})
	}

	const getTabRemover = (removed) => (event) => {
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
			if (
				randomInt(100) <
				(firstTabInteraction.current ? 80 : tabExceptionPercentage)
			) {
				setTimeout(() => {
					addTab(100)
				}, sToMs(0.5))
			} else if (next.length == 0) {
				onAllClosed()
			}
			firstTabInteraction.current = false
			return next
		})
	}

	return (
		<>
			<Tabs
				style={{ width: '100%', height: '100%', userSelect: 'none' }}
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
								<CloseSquareFilled onClick={getTabRemover(index)} />
							</Tab>
						)
					})}
					{tabs.length < maxTabs && (
						<Button icon={<PlusOutlined />} type="text" onClick={addTab} />
					)}
				</TabList>

				{tabs.map((tab) => {
					const scoreIndex = tabToAudioMapping.current[tab]
					console.log({
						scoreIndex,
						tabToAudioMapping: tabToAudioMapping.current,
					})
					return (
						<TabPanel
							key={tab}
							style={{
								height: '90vh',
								padding: '1rem',
							}}
						>
							<img
								src={`${prefix}/scores/single_note/${scoreIndex + 1}.svg`}
								alt="score"
							/>
						</TabPanel>
					)
				})}
			</Tabs>
		</>
	)
}
export default Experience
