import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import Page from '../components/Page';
import * as Haptics from 'expo-haptics';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const { width } = Dimensions.get('window');

export default function ScrollViewInterpolateTutorial() {
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
			pagingEnabled
			snapToAlignment='center'
			onScrollEndDrag={() =>
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
			}
			decelerationRate='fast'
			horizontal>
			{WORDS.map((title, idx) => {
				return (
					<Page
						idx={idx}
						title={title}
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
