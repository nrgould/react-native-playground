import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import Card from '../components/Card';

const { width } = Dimensions.get('window');

const HEADER_HEIGHT = 100;

export default function AnimatedScrollHeader() {
	const translateY = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((event) => {
		translateY.value = event.contentOffset.y;
	});

	const rTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[75, 100],
			[0, 1],
			Extrapolate.CLAMP
		);
		return {
			opacity,
		};
	});

	const rHeaderStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			translateY.value,
			[50, 60],
			[0, 1],
			Extrapolate.CLAMP
		);
		return {
			opacity,
		};
	});
	return (
		<SafeAreaView>
			<Animated.View style={[styles.header, rHeaderStyle]}>
				<Animated.Text style={[styles.headerTitle, rTextStyle]}>
					Title
				</Animated.Text>
			</Animated.View>
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentContainerStyle={{
					alignItems: 'center',
					zIndex: 1,
				}}>
				<Text style={styles.title}>Title</Text>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</Animated.ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		marginTop: HEADER_HEIGHT,
		fontSize: 40,
		color: '#000',
		width: '90%',
	},
	header: {
		backgroundColor: 'white',
		height: HEADER_HEIGHT,
		width: width,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'flex-end',
		zIndex: 5,
	},
	headerTitle: {
		color: '#000',
		fontWeight: '700',
		marginBottom: 10,
		zIndex: 5,
		fontSize: 22,
	},
});
