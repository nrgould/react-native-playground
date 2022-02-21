import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import HingePage from '../components/HingePage';
import * as Haptics from 'expo-haptics';

const NAMES = ['Terry', 'Sherry', 'Larry', 'Jerry', 'Berry', 'Harry'];

const { width } = Dimensions.get('window');

export default function HingeCardSwiping() {
	const translateX = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateX.value = event.contentOffset.x;
	});
	return (
		<Animated.ScrollView
			onScroll={scrollHandler}
			scrollEventThrottle={16}
			style={styles.container}
			snapToInterval={width}
			snapToAlignment='center'
			onScrollEndDrag={() =>
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			}
			decelerationRate='fast'
			horizontal>
			{NAMES.map((name, idx) => {
				return (
					<HingePage
						idx={idx}
						name={name}
						key={idx}
						translateX={translateX}
					/>
				);
			})}
		</Animated.ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
