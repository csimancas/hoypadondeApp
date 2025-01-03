import React from 'react';
import { Platform, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import R from '../../../utils/res/R';

export interface ITextProps extends TextProps {
	children?: any;
	variant?:
		| 'heading'
		| 'title'
		| 'title2'
		| 'title3'
		| 'title4'
		| 'content'
		| 'content2'
		| 'content3'
		| 'small'
		| 'h6'
		| 'h5'
		| 'h4'
		| 'h3'
		| 'h2'
		| 'h1'
		| 'h0'
		| 'buttonText';
	style?: TextStyle;

	// util
	color?: string;
	font?: 'light' | 'regular' | 'italic' | 'bold' | 'medium' | 'black';
	gutterBottom?: number;
	gutterTop?: number;
	gutterLeft?: number;
	gutterRight?: number;
	fontStyle?: 'normal' | 'italic';
	flexWrap?: 'wrap' | 'nowrap';
	fontWeight?:
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900'
		| 'normal'
		| 'bold';
	transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
	align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
	alignVertical?: 'auto' | 'top' | 'bottom' | 'center';
	ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
	maxFontSizeMultiplier?: number;
}

const Label = (props: any) => {
	const {
		flexWrap = 'wrap' || null,
		variant = 'title2',
		style = {},
		font = 'regular',
		gutterBottom = 0,
		gutterTop = 0,
		gutterLeft = 0,
		gutterRight = 0,
		align = 'auto',
		alignVertical = 'auto',
		transform = 'none',
		ellipsizeMode,
		...restProps
	} = props;
	const defaultStyles = styles[variant];
	return (
		<Text
			// eslint-disable-next-line react-native/no-inline-styles
			style={{
				...styles[font],
				...defaultStyles,
				allowFontScaling: false,
				color: props.color,
				textAlign: align,
				textAlignVertical: alignVertical,
				marginBottom: R.unit.scale(gutterBottom),
				marginTop: R.unit.scale(gutterTop),
				marginLeft: R.unit.scale(gutterLeft),
				marginRight: R.unit.scale(gutterRight),
				textTransform: transform,
				ellipsizeMode: ellipsizeMode || 'tail',
				flexWrap,
				...style,
			}}
			{...restProps}
		>
			{props.children}
		</Text>
	);
};

const styles = StyleSheet.create({
	heading: {
		fontSize: Platform.OS === 'ios' ? R.unit.scale(34) : R.unit.scale(32),
	},
	title: {
		fontSize: R.unit.scale(18),
	},
	title2: {
		fontSize: R.unit.scale(16),
	},
	title3: {
		fontSize: R.unit.scale(14),
	},
	title4: {
		fontSize: R.unit.scale(13),
	},
	content: {
		fontSize: R.unit.scale(12),
	},
	content2: {
		fontSize: R.unit.scale(10),
	},
	content3: {
		fontSize: R.unit.scale(13),
	},
	small: {
		fontSize: R.unit.scale(8),
	},
	h0: {
		fontSize: R.unit.scale(27),
	},
	h1: {
		fontSize: R.unit.scale(24),
	},
	h2: {
		fontSize: R.unit.scale(22),
	},
	h3: {
		fontSize: R.unit.scale(20),
	},
	h4: {
		fontSize: R.unit.scale(18),
	},
	h5: {
		fontSize: R.unit.scale(13),
	},
	h6: {
		fontSize: R.unit.scale(10),
	},
	h7: {
		fontSize: R.unit.scale(16),
	},
	buttonText: {
		fontSize: R.unit.scale(18),
	},
	light: {
		fontFamily: R.font.Light,
	},
	regular: {
		fontFamily: R.font.Regular,
	},
	bold: {
		fontFamily: R.font.Bold,
	},
	italic: {
		fontFamily: R.font.Italic,
	},
	medium: {
		fontFamily: R.font.Medium,
	},
	black: {
		fontFamily: R.font.Black,
	},
});

export default Label;
