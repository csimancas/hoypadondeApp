import { Dimensions } from "react-native";

const containerWidth = Dimensions.get("window").width;
const containerHeight = Dimensions.get("window").height;
const initialScale = Math.min(containerWidth, containerHeight) / 375;

const unit: Unit = {
	scale: (multi?: number) => {
		return multi ? initialScale * multi : initialScale;
	},
	fontSize: (multi?: number) => {
		multi ? initialScale * 16 * multi : initialScale * 16;
	},
	windowHeight: (multi?: number) => {
		multi ? containerHeight * multi : containerHeight;
	},
	windowWidth: (multi?: number) => {
		multi ? containerWidth * multi : containerWidth;
	},
	screenHeader: () => {
		return initialScale * 48;
	},
};

export interface Unit {
	// eslint-disable-next-line no-unused-vars
	scale: (multi: number) => number;
	fontSize: () => any;
	windowHeight: () => any;
	windowWidth: () => any;
	screenHeader: () => any;
}

export default unit;
