import React from 'react';
import { CSSProperties } from 'styled-components';

interface Padding {
	paddingTop?: number;
	paddingLeft?: number;
	paddingRight?: number;
	paddingBottom?: number;
	padding?: number;
}

interface IBlockProps extends Padding {
	children?: React.ReactNode;
	style?: CSSProperties;
	onClick?: () => void;
	className?: string;
	row?: boolean;
	height?: number;
	width?: number;
	vCenter?: boolean;
	hCenter?: boolean;
	justifyContent?: 'space-between' | 'center' | 'space-between';
}

export const Block = (p: IBlockProps) => {
	const {
		children,
		style,
		row,
		height,
		width,
		justifyContent,
		onClick,
		className,
		padding,
		paddingBottom,
		paddingLeft,
		paddingRight,
		paddingTop,
	} = p;

	const s: CSSProperties = {
		...(p.vCenter && { justifyContent: 'center', alignItems: 'center' }),
		...(padding && { padding: p.padding }),
		...(paddingBottom && { padding: p.paddingBottom }),
		...(paddingLeft && { padding: p.paddingLeft }),
		...(paddingRight && { padding: p.paddingRight }),
		...(paddingTop && { padding: p.paddingTop }),
		display: 'flex',
		flexDirection: row ? 'row' : 'column',
		height,
		width,
		justifyContent,
		...style,
	};
	return (
		<div style={s} className={className} onClick={onClick}>
			{children}
		</div>
	);
};
