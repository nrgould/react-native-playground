import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomScrollViewPage, {
	PAGE_WIDTH,
} from '../components/CustomScrollViewPage';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	cancelAnimation,
	useAnimatedGestureHandler,
	useDerivedValue,
	useSharedValue,
	withDecay,
} from 'react-native-reanimated';

const titles = ['Terry', 'Sherry', 'Larry', 'Jerry', 'Berry', 'Harry'];

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);

type ContextType = {
	x: number;
};

export default function ScrollViewFromScratch() {
	const translateX = useSharedValue(0);

	const clampedTranslateX = useDerivedValue(() => {
		console.log(translateX.value);

		return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
	});

	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (_, context) => {
			context.x = clampedTranslateX.value;

			cancelAnimation(translateX);
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.x;
		},
		onEnd: (event) => {
			translateX.value = withDecay({ velocity: event.velocityX });
		},
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View style={{ flex: 1, flexDirection: 'row' }}>
					{titles.map((title, index) => {
						return (
							<CustomScrollViewPage
								translateX={clampedTranslateX}
								index={index}
								title={title}
								key={index.toString()}
							/>
						);
					})}
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
