import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withSpring,
	useSharedValue,
	useDerivedValue,
} from 'react-native-reanimated';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { between, useVector } from 'react-native-redash';

import { calculateLayout, lastOrder, Offset, reorder } from './Layout';
import Placeholder, { MARGIN_TOP, MARGIN_LEFT } from './components/Placeholder';

interface SortableWordProps {
	offsets: Offset[];
	children: ReactElement<{ id: number }>;
	index: number;
	containerWidth: number;
}

const SortableWord = ({
	offsets,
	index,
	children,
	containerWidth,
}: SortableWordProps) => {
	const offset = offsets[index];
	const isGestureActive = useSharedValue(false);
	const translation = useVector();
	const isInBank = useDerivedValue(() => offset.order.value === -1);

	const onGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{ x: number; y: number }
	>({
		onStart: () => {
			isGestureActive.value = true;
		},
		onActive: ({ translationX, translationY }) => {
			translation.x.value = translationX;
			translation.y.value = translationY;
		},
		onEnd: () => {
			isGestureActive.value = false;
		},
	});

	const translateX = useDerivedValue(() => {
		if (isInBank.value) {
			return offset.originalX.value - MARGIN_LEFT;
		}
		return offset.x.value;
	});

	const translateY = useDerivedValue(() => {
		if (isInBank.value) {
			return offset.originalY.value + MARGIN_TOP;
		}
		return offset.y.value;
	});
	const style = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			top: 0,
			left: 0,
			width: offset.width.value,
			height: offset.height.value,
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
			],
		};
	});
	return (
		<>
			<Placeholder offset={offset} />
			<Animated.View style={style}>
				<PanGestureHandler onGestureEvent={onGestureEvent}>
					<Animated.View style={StyleSheet.absoluteFill}>
						{children}
					</Animated.View>
				</PanGestureHandler>
			</Animated.View>
		</>
	);
};

export default SortableWord;
