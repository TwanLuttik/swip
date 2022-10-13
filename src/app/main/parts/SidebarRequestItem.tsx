import { ControlledMenu, MenuItem, useMenuState } from '@szhsin/react-menu';
import React, { useState } from 'react';
import { ISavedRequestItem } from '../../../core/core';
import { Text } from '../../../components';
import styled from 'styled-components';

export const SidebarRequestItem = ({
	item,
	index,
	onSwitchToRequest,
	deleteRequest,
	selected,
}: {
	item: ISavedRequestItem;
	index: number;
	onSwitchToRequest?: () => void;
	deleteRequest?: () => void;
	selected: boolean;
}) => {
	const [menuProps, toggleMenu] = useMenuState();
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

	return (
		<SavedRequestBox
			key={index}
			onClick={() => onSwitchToRequest && onSwitchToRequest()}
			active={selected}
		>
			<div
				style={{ height: '100%' }}
				onContextMenu={(e) => {
					e.preventDefault();
					setAnchorPoint({ x: e.clientX, y: e.clientY });
					toggleMenu(true);
				}}
			>
				<Text>{item.name}</Text>
				<Text>{item.request.method}</Text>
			</div>
			<ControlledMenu
				{...menuProps}
				menuStyle={{ zIndex: 90 }}
				anchorPoint={anchorPoint}
				onClose={() => toggleMenu(false)}
			>
				<MenuItem onClick={() => deleteRequest && deleteRequest()}>
					Delete
				</MenuItem>
			</ControlledMenu>
		</SavedRequestBox>
	);
};

const SavedRequestBox = styled.div<{ active: boolean }>`
	background-color: #1d1d1d;
	border: solid 1px ${({ active }) => (active ? '#91FF45' : '#ffffff12')};
	/* border: solid 1px #ffffff12; */
	padding: 10px;
	margin-bottom: 10px;
	border-radius: 7px;
	cursor: pointer;
	:hover {
		/* background-color: #161616; */
	}

	transition: background-color 0.1s ease-in-out;
`;
