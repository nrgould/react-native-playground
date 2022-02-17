import {
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import React from 'react';
import {
	PinchGestureHandler,
	PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const imageURI =
	'https://images.unsplash.com/photo-1645096628609-6dc545fa8423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function PinchGestureTutorial() {
	const scale = useSharedValue(1);
	const focalX = useSharedValue(0);
	const focalY = useSharedValue(0);

	const { width, height } = useWindowDimensions();

	const pinchHandler =
		useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
			onActive: (event) => {
				console.log(event);
				scale.value = event.scale;
				focalX.value = event.focalX;
				focalY.value = event.focalY;
			},
			onEnd: () => {
				scale.value = withTiming(1);
				focalX.value = withTiming(width / 2);
				focalY.value = withTiming(height / 2);
			},
		});

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: focalX.value },
				{ translateY: focalY.value },
				{ translateX: -width / 2 },
				{ translateY: -height / 2 },
				{ scale: scale.value },
				{ translateX: -focalX.value },
				{ translateY: -focalY.value },
				{ translateX: width / 2 },
				{ translateY: height / 2 },
			],
		};
	});

	const focalPointStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: focalX.value },
				{ translateY: focalY.value },
			],
		};
	});
	return (
		<PinchGestureHandler onGestureEvent={pinchHandler}>
			<Animated.View style={{ flex: 1 }}>
				<AnimatedImage
					style={[{ flex: 1 }, rStyle]}
					source={{ uri: imageURI }}
				/>
				<Animated.View style={[styles.focalPoint, focalPointStyle]} />
			</Animated.View>
		</PinchGestureHandler>
	);
}

const styles = StyleSheet.create({
	focalPoint: {
		...StyleSheet.absoluteFillObject,
		width: 20,
		height: 20,
		backgroundColor: 'blue',
		borderRadius: 10,
	},
});
