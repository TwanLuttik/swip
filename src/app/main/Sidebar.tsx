import React from 'react';
import styled from 'styled-components';
import { Block, IconButton } from '../../components';
import { core } from '../../core';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

export const Sidebar = () => {
	return (
		<SidebarBody>
			<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
				<MenuItem>New File</MenuItem>
				<MenuItem>Save</MenuItem>
				<SubMenu label="Edit">
					<MenuItem>Cut</MenuItem>
					<MenuItem>Copy</MenuItem>
					<MenuItem>Paste</MenuItem>
				</SubMenu>
				<MenuItem>Print...</MenuItem>
			</Menu>
			<Block
				row
				style={{ alignItems: 'center' }}
				onClick={() => core._events.settings.emit(true)}
			>
				<IconButton
					icon="cog"
					size={20}
					color="#555555"
					onClick={() => core._events.settings.emit(true)}
				/>
				<p
					style={{ fontSize: 14, marginLeft: 10, color: 'rgb(117, 117, 117)' }}
				>
					Settings
				</p>
			</Block>
		</SidebarBody>
	);
};

const SidebarBody = styled.div`
	width: 250px;
	min-width: 250px;
	padding: 20px;
	background-color: #0d0d0d;
	border-right: solid 1px #ffffff12;
`;
