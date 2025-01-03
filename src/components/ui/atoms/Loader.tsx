import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import colors from '../../../utils/res/color';

export interface LoaderProps {
	size?: number;
	loaderColor: string;
}

const Loader = (props: LoaderProps) => {
	const [progress, setProgress] = useState(0);
	const [indeterminate, setIndeterminate] = useState(true);

	const animate = () => {
		let progress = 0;
		setProgress(progress);
		setTimeout(() => {
			setIndeterminate(false);
			setInterval(() => {
				progress += Math.random() / 5;
				if (progress > 1) {
					progress = 1;
				}
				setProgress(progress);
			}, 500);
		}, 1000);
	};

	useEffect(() => {
		animate();
	}, []);

	return (
		<Progress.Circle
			size={props.size || 40}
			indeterminate={indeterminate}
			animated={true}
			fill="transparent"
			color={props.loaderColor || colors.light.colorPrimary}
			style={{ margin: 10 }}
			progress={progress}
		/>
	);
};

export default Loader;
