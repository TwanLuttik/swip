import React, { useState } from 'react';
import styled from 'styled-components';
import { Block } from '../../components';
import { core } from '../../core';
import { SettingsAppearance } from './SettingsAppearance';
import { SettingsEnvironmentVariables } from './SettingsEnvironmentVariables';
import { SettingsGeneral } from './SettingsGeneral';

const SETTINGS_TABS = [
	{ name: 'General Settings', index: 0 },
	{ name: 'Environment Variables', index: 1 },
	{ name: 'Appearance', index: 2 },
];

enum SettingsTabs {
	SettingsGeneral,
	SettingsEnvironmentVariables,
	SettingsAppearance,
}

export const Settings = () => {
	const [currentTab, setCurrentTab] = useState(0);
	return (
		<SettingsBody>
			<SettingsSidebar>
				<div>
					{SETTINGS_TABS.map((tab, tabIndex) => (
						<SettingsItem
							key={tabIndex}
							onClick={() => setCurrentTab(tab.index)}
							selected={currentTab === tab.index}
						>
							{tab.name}
						</SettingsItem>
					))}
				</div>

				<button
					style={{ textAlign: 'left', fontSize: 14 }}
					onClick={() => core._events.settings.emit(false)}
				>
					Close
				</button>
			</SettingsSidebar>
			<div style={{ padding: 10 }}>
				{currentTab === SettingsTabs.SettingsGeneral && <SettingsGeneral />}
				{currentTab === SettingsTabs.SettingsEnvironmentVariables && (
					<SettingsEnvironmentVariables />
				)}
				{currentTab === SettingsTabs.SettingsAppearance && (
					<SettingsAppearance />
				)}
			</div>
		</SettingsBody>
	);
};

const SettingsBody = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
`;

const SettingsSidebar = styled.div`
	width: 250px;
	min-width: 250px;
	padding: 20px;
	background-color: #0d0d0d;
	border-right: solid 1px #ffffff12;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const SettingsItem = styled.div<{ selected: boolean }>`
	cursor: pointer;
	padding: 5px 10px;
	border-radius: 4px;
	font-size: 14px;
	color: #b6b6b6;
	font-weight: 500;
	margin: 3px 0px;
	user-select: none;

	${({ selected }) => selected && 'background-color: #212121;color: white;'}

	:hover {
		background-color: #212121;
		color: white;
	}
	:active {
		background-color: #2a2a2a;
	}

	transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
`;
