import React, { CSSProperties } from 'react';

interface ITextProps {
	children?: React.ReactNode;
	color?: string;
	size?: number;
	bold?: boolean;
	medium?: boolean;
	style?: CSSProperties;
}

export const Text = (p: ITextProps) => {
	return (
		<p
			style={{
				...p?.style,
				color: p?.color || 'white',
				fontSize: p?.size || 14,
			}}
		>
			{p.children}
		</p>
	);
};
