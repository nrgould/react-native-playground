import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import {
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

const imageURI =
	'https://images.unsplash.com/photo-1645096628609-6dc545fa8423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function DoubleTapGestureTutorial() {
	const doubleTapRef: any = useRef();
	const scale = useSharedValue(0);
	const opacity = useSharedValue(0);

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: Math.max(scale.value, 0) }],
		};
	});

	const rTextStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const onDoubleTap = useCallback(() => {
		console.log('DOUBLE TAP');
		scale.value = withSpring(1, undefined, (isFinished) => {
			if (isFinished) {
				scale.value = withDelay(500, withSpring(0));
			}
		});
	}, []);

	const onSingleTap = () => {
		opacity.value = withTiming(1, undefined, (isFinished) => {
			if (isFinished) {
				opacity.value = withDelay(500, withTiming(0));
			}
		});
	};

	return (
		<View style={styles.container}>
			<TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
				<TapGestureHandler
					ref={doubleTapRef}
					maxDelayMs={250}
					numberOfTaps={2}
					onActivated={onDoubleTap}>
					<Animated.View>
						<ImageBackground
							style={styles.image}
							source={{ uri: imageURI }}>
							<AnimatedImage
								source={require('../assets/heart.png')}
								style={[
									styles.image,
									{
										shadowOffset: { width: 0, height: 20 },
										shadowOpacity: 0.2,
										shadowRadius: 35,
									},
									rStyle,
								]}
								resizeMode='center'
							/>
						</ImageBackground>
						<Animated.Text style={[styles.turtles, rTextStyle]}>
							💩💩💩💩💩💩
						</Animated.Text>
					</Animated.View>
				</TapGestureHandler>
			</TapGestureHandler>
		</View>
	);
}

const { width: SIZE } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },

	image: {
		width: SIZE,
		height: SIZE,
	},
	turtles: {
		fontSize: 40,
		textAlign: 'center',
		marginTop: 30,
	},
});
