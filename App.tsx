import React from 'react';
import { StyleSheet } from 'react-native';
import Bedtime from './Bedtime';
import LoadAssets from './LoadAssets';

const fonts = {
	// 'SFProDisplay-Bold': require('./assets/fonts/SFPro/SF-Pro-Display-Bold.otf'),
	// 'SFProDisplay-Semibold': require('./assets/fonts/SFPro/SF-Pro-Display-Semibold.otf'),
	// 'SFProDisplay-Regular': require('./assets/fonts/SFPro/SF-Pro-Display-Regular.otf'),
	// 'SFProDisplay-Medium': require('./assets/fonts/SFPro/SF-Pro-Display-Medium.otf'),
	// 'SFProRounded-Semibold': require('./assets/fonts/SFProRounded/SF-Pro-Rounded-Semibold.otf'),
	// 'SFProRounded-Medium': require('./assets/fonts/SFProRounded/SF-Pro-Rounded-Medium.otf'),
	// 'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
	// 'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
	// 'GothamRounded-Medium': require('./assets/fonts/GothamRounded/GothamRounded-Medium.otf'),
	// 'GothamRounded-Bold': require('./assets/fonts/GothamRounded/GothamRounded-Bold.otf'),
	// 'GothamRounded-Light': require('./assets/fonts/GothamRounded/GothamRounded-Light.otf'),
};

export default function App() {
	return (
		<LoadAssets fonts={fonts}>
			<Bedtime />
		</LoadAssets>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
