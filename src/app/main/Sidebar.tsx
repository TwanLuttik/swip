import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Block, IconButton, Text } from '../../components';
import { core } from '../../core';
import {
	Menu,
	MenuItem,
	MenuButton,
	SubMenu,
	useMenuState,
	ControlledMenu,
} from '@szhsin/react-menu';
import { useSimple } from 'simple-core-state';
import { IRequestType, ISavedRequestItem } from '../../core/core';
import { SidebarRequestItem } from './parts/SidebarRequestItem';

export const Sidebar = () => {
	const current = useSimple(core.current);
	const saved = useSimple(core.savedRequests);
	const currentSelectedRequest = useSimple(core.using_saved_request);

	const [newRequestName, setNewRequestName] = useState('');

	const [menuProps, toggleMenu] = useMenuState();
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

	const createRequest = useCallback(
		(v?: { useCurrenSettings?: boolean }) => {
			let newObj: ISavedRequestItem = {
				name: newRequestName || 'Untitled',
				request: v?.useCurrenSettings
					? current
					: { body: [], headers: {}, method: 'GET', url: '' },
			};
			let a = saved;
			a.push(newObj);
			core.savedRequests.set(a);
		},
		[newRequestName]
	);

	const deleteSavedRequest = (index: number) => {
		let a = saved;
		a.splice(index, 1);
		core.savedRequests.set(a);
	};

	const changeToSavedRequest = (index: number) => {
		let a = saved[index];
		let b = Object.assign({}, a.request);
		core.current.set(b);
		core.using_saved_request.set(index);
	};

	return (
		<SidebarBody>
			<div style={{ padding: 20 }}>
				<input
					style={{ backgroundColor: 'black', color: 'white' }}
					type="text"
					value={newRequestName}
					onChange={(v) => setNewRequestName(v.currentTarget.value)}
				/>
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
						style={{
							fontSize: 14,
							marginLeft: 10,
							color: 'rgb(117, 117, 117)',
						}}
					>
						Settings
					</p>
				</Block>
			</div>
			<div
				style={{
					overflowY: 'scroll',
					height: 'calc(100% - 85px)',
					padding: 20,
				}}
			>
				{saved.map((item, index) => (
					<SidebarRequestItem
						key={index}
						index={index}
						item={item}
						selected={currentSelectedRequest === index}
						onSwitchToRequest={() => changeToSavedRequest(index)}
						deleteRequest={() => deleteSavedRequest(index)}
					/>
				))}
				<CreateBtn onClick={() => createRequest()}>Create</CreateBtn>
			</div>
		</SidebarBody>
	);
};

const CreateBtn = styled.div`
	background-color: #181818;
	border: dashed 1.5px #54545487;
	border-radius: 7px;
	display: flex;
	justify-content: center;
	padding: 6px;
	font-size: 12px;
	color: #dfdfdf;
	cursor: pointer;
	user-select: none;

	:hover {
		opacity: 0.8;
	}
	:active {
		opacity: 0.7;
	}
`;

const SavedRequestBox = styled.div`
	background-color: #1d1d1d;
	border: solid 1px #ffffff12;
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 7px;
	cursor: pointer;
	:hover {
		opacity: 0.6;
	}
`;

const SidebarBody = styled.div`
	width: 250px;
	min-width: 250px;
	background-color: #0d0d0d;
	border-right: solid 1px #ffffff12;
	overflow: hidden;
`;
