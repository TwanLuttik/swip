
import React, { CSSProperties } from 'react';
import * as icons from '../assets/icons';
import SvgInline from 'react-inlinesvg'

interface IIconProps {
	name: Icons;
	size?: number;
	color?: string;
	style?: CSSProperties;
}

export type Icons = 'circle_minus' | 'cog' | 'plus' | 'xmark' ;

export const Icon = (props: IIconProps) => {
	const s = props?.size || 20;
	return (
    <SvgInline
      src={icons[props.name]}
      height={s}
      width={s}
      color={props.color}
      style={props?.style}
    />
  );
};