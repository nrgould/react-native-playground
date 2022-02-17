import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import Card from './components/Card';

const { width, height } = Dimensions.get('window');

const HEADER_HEIGHT = 200;
const COLLAPSED_HEADER_HEIGHT = 100;

export default function AnimatedScrollHeader() {
	const translateY = useSharedValue(0);
	// const opacity = useSharedValue(1);

	// const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

	const scrollHandler = useAnimatedScrollHandler((event) => {
		console.log(event.contentOffset.y);
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
		const animHeight = interpolate(
			translateY.value,
			[0, 100],
			[0, COLLAPSED_HEADER_HEIGHT],
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
			{/* <View style={{ marginTop: COLLAPSED_HEADER_HEIGHT }}> */}
			<Animated.ScrollView
				// contentOffset={{ y: 50, x: 0 }}
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
			{/* </View> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		marginTop: COLLAPSED_HEADER_HEIGHT,
		fontSize: 40,
		color: '#000',
		width: '90%',
	},
	header: {
		backgroundColor: 'white',
		height: COLLAPSED_HEADER_HEIGHT,
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
