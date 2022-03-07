import React from 'react';
import AnimatedScrollHeader from './Pages/AnimatedScrollHeader';
import LoadAssets from './LoadAssets';
import DoubleTapGestureTutorial from './ReanimatedTutorials/DoubleTapGestureTutorial';
import InterpolateColors from './ReanimatedTutorials/InterpolateColors';
import PanGestureTutorial from './ReanimatedTutorials/PanGestureTutorial';
import PinchGestureTutorial from './ReanimatedTutorials/PinchGestureTutorial';
import ScrollViewInterpolateTutorial from './ReanimatedTutorials/ScrollViewInterpolateTutorial';
import HingeCardSwiping from './Pages/HingeCardSwiping';
import ScrollViewFromScratch from './ReanimatedTutorials/ScrollViewFromScratch';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Bedtime from './BedTime/Bedtime';
import CircularProgressBar from './ReanimatedTutorials/CircularProgressBar';
import SwipeToDelete from './ReanimatedTutorials/SwipeToDelete';
import { NavigationContainer } from '@react-navigation/native';
import Duolingo from './Duolingo';
import Chess from './Chess';

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

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		// <LoadAssets fonts={fonts}>
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName='Chess'
				screenOptions={{ headerShown: false }}>
				<Drawer.Screen
					name='Pan Gesture Tutorial'
					component={PanGestureTutorial}
				/>
				<Drawer.Screen name='Apple Bedtime' component={Bedtime} />
				<Drawer.Screen
					name='Duolingo'
					options={{ headerShown: true }}
					component={Duolingo}
				/>
				<Drawer.Screen
					name='Chess'
					options={{ headerShown: true }}
					component={Chess}
				/>
				<Drawer.Screen
					name='ScrollView Interpolation'
					component={ScrollViewInterpolateTutorial}
				/>
				<Drawer.Screen
					name='Interpolate Colors'
					component={InterpolateColors}
				/>
				<Drawer.Screen
					name='Pinch Gesture'
					component={PinchGestureTutorial}
				/>
				<Drawer.Screen
					name='Double Tap Gesture'
					component={DoubleTapGestureTutorial}
				/>
				<Drawer.Screen
					name='AnimatedScrollHeader'
					component={AnimatedScrollHeader}
				/>
				<Drawer.Screen
					name='Hinge Card Swiping'
					component={HingeCardSwiping}
				/>
				<Drawer.Screen
					name='ScrollView From Scratch'
					component={ScrollViewFromScratch}
				/>
				<Drawer.Screen
					name='Circular Progress Bar'
					component={CircularProgressBar}
				/>
				<Drawer.Screen
					name='Swipe To Delete'
					component={SwipeToDelete}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
		// </LoadAssets>
	);
}
