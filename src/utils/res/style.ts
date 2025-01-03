import { StyleSheet } from "react-native";
import unit from '../res/unit';

const styles = StyleSheet.create({
	// utility styles
	containerScroll: { flexGrow: 1 },
	container: {
		flex: 1,
		width: unit.windowWidth(1),
		height: unit.windowHeight(1),
	},
	txtBottom: {
		position: "absolute",
		bottom: unit.scale(20),
	},
	// Set margin style
	m0: { margin: 0 },
	mt0: { marginTop: 0 },
	mb0: { marginBottom: 0 },
	my0: { marginTop: 0, marginBottom: 0 },
	ml0: { marginLeft: 0 },
	mr0: { marginRight: 0 },
	mx0: { marginLeft: 0, marginRight: 0 },
	ml5: { marginLeft: unit.scale(5) },
	ml10: { marginLeft: unit.scale(10) },
	ml15: { marginLeft: unit.scale(15) },
	// Set padding style
	p0: { padding: 0 },
	pt0: { paddingTop: 0 },
	pb0: { paddingBottom: 0 },
	py0: { paddingTop: 0, paddingBottom: 0 },
	pl0: { paddingLeft: 0 },
	pr0: { paddingRight: 0 },
	px0: { paddingLeft: 0, paddingRight: 0 },
	pb1: { paddingBottom: 1 },
	pb2: { paddingBottom: 2 },
	pr2: { paddingRight: 2 },
	pr3: { paddingRight: 3 },
	pl10: { paddingLeft: unit.scale(10) },
	ph10: {
		paddingHorizontal: unit.scale(10),
	},
	ph20: {
		paddingHorizontal: unit.scale(20),
	},
	pv10: {
		paddingVertical: unit.scale(10),
	},
	pv40: {
		paddingVertical: unit.scale(40),
	},
	headingTop: {
		marginTop: unit.scale(50),
		alignSelf: "center",
		textAlign: "center",
	},

	cancel: {
		position: "absolute",
		right: unit.scale(3),
		top: unit.scale(6),
		zIndex: 1,
	},
	elevation5: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	elevation6: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 15,
		elevation: 5,
	},
	underline: { textDecorationLine: "underline" },
	letterSpacingPrice: { letterSpacing: unit.scale(1.2) },
});

export default styles;
