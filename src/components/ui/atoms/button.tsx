import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Label from '../atoms/Label';
import Loader from '../atoms/Loader';

import R from '../../../utils/res/R';
import colors from '../../../utils/res/color';

export interface ButtonProps {
	text: string;
	subText?: string;
	variant?: "contained" | "outlined" | "text";
	size?: "sm" | "md" | "lg";
	gutterBottom?: number;
	gutterTop?: number;
	width?: string;
	leftComponent?: any;
	rightComponent?: any;
	borderRadiusRounded?: number;
	backgroundColor?: string;
	borderColor?: string;
	disabled?: boolean;
	// text props
	color?: string;
	font?: "light" | "regular" | "italic" | "bold" | "medium" | "black";
	transform?: "none" | "uppercase" | "lowercase" | "capitalize";
	align?: "auto" | "left" | "right" | "center" | "justify";
	alignVertical?: "auto" | "top" | "bottom" | "center";
	// styles
	btnWrapperStyles?: any;
	btnTextStyles?: any;
	btnSubTextStyles?: any;
	leftSectionStyle?: any;
	rightSectionStyle?: any;
	isShowLoader?: boolean;
	isLoading?: boolean;
	action: any;
	useAnonymous: boolean;
	loaderColor?: string;
}

const Button = (props: ButtonProps) => {
	const {
		text,
		subText = undefined,
		variant = "contained",
		gutterBottom = 0,
		gutterTop = 0,
		size = "lg",
		leftComponent,
		rightComponent,
		width = "100%",
		backgroundColor,
		borderColor,
		// text props
		color = colors.light.colorFontPrimary,
		font = "regular",
		align = "center",
		alignVertical = "center",
		transform = "none",

		btnWrapperStyles,
		btnTextStyles,
		btnSubTextStyles,
		leftSectionStyle,
		rightSectionStyle,
		borderRadiusRounded = -1,
		isShowLoader = false,
		isLoading = false,
	} = props;

	const sizes = { sm: 28, md: 32, lg: 44 };
	const borderRadius = { sm: 4, md: 4, lg: 8 };
	const fontSizes = { sm: 10, md: 12, lg: 17 };

	return (
		<TouchableOpacity
			style={{
				borderWidth: 1,
				width,
				height: R.unit.scale(sizes[size]),
				...styles.btn,
				...styles[`btn_${variant}`],
				marginBottom: R.unit.scale(gutterBottom),
				marginTop: R.unit.scale(gutterTop),
				backgroundColor,
				borderColor: borderColor ? borderColor : "transparent",
				disabled: false,
				borderRadius:
					borderRadiusRounded !== -1
						? R.unit.scale(borderRadiusRounded)
						: R.unit.scale(borderRadius[size]),
				...btnWrapperStyles,
			}}
			onPress={props.action}
		>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{isShowLoader && isLoading ? (
					<Loader loaderColor={props.loaderColor} size={25} />
				) : (
					<>
						{leftComponent ? (
							<View
								style={{
									...styles.leftSection,
									...leftSectionStyle,
								}}
							>
								{leftComponent}
							</View>
						) : null}
						<Label
							variant="title2"
							font={font}
							color={color}
							align={align}
							alignVertical={alignVertical}
							transform={transform}
							style={{
								fontSize: R.unit.scale(fontSizes[size]),
								...btnTextStyles,
							}}
						>
							{text}
						</Label>

						{subText ? (
							<Label
								style={{
									...btnSubTextStyles,
								}}
							>
								{subText}
							</Label>
						) : null}
						{rightComponent ? (
							<View
								style={{
									...styles.rightSection,
									...rightSectionStyle,
								}}
							>
								{rightComponent}
							</View>
						) : null}
					</>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	btn_text: {
		backgroundColor: "transparent",
	},
	btn_outlined: {
		backgroundColor: "transparent",
		borderColor: colors.light.primary11,
		borderWidth: R.unit.scale(1),
	},
	btn_contained: {
		backgroundColor: colors.light.primary11,
	},
	leftSection: {
		flexGrow: 0,
		flexDirection: "row",
		alignItems: "center",
		paddingRight: R.unit.scale(8),
	},
	rightSection: {
		position: "absolute",
		right: R.unit.scale(10),
	},
});

export default Button;
