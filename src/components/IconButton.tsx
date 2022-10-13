import React from 'react';
import styled from 'styled-components';
import { Icon, Icons } from './Icon';

interface IIconButtonProps {
	icon: Icons;
	color?: string;
	onClick?: () => void;
	size?: number;
}

export const IconButton = (p: IIconButtonProps) => {
	return (
		<IconBody onClick={p.onClick}>
			<Icon name={p.icon} color={p.color || 'white'} size={p.size || 18} />
		</IconBody>
	);
};

const IconBody = styled.div`
	cursor: pointer;
	:hover {
		opacity: 0.6;
	}
	:active {
		opacity: 0.5;
	}
	transition: opacity 0.2s ease-in-out;
`;
