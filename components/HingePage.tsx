import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

interface PageProps {
	name: string;
	idx: number;
	translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get('window');

const SIZE = width * 0.7;
const RANGE_OFFSET = 400;
const CARD_SCALE_SMALL = 0.9;
const CARD_SCALE_FULL = 1;

export default function Page({ name, idx, translateX }: PageProps) {
	const inputRange = [
		(idx - 1) * width + RANGE_OFFSET,
		idx * width,
		(idx + 1) * width - RANGE_OFFSET,
	];
	const outputRange = [CARD_SCALE_SMALL, CARD_SCALE_FULL, CARD_SCALE_SMALL];

	const rStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			translateX.value,
			inputRange,
			outputRange,
			Extrapolate.CLAMP
		);

		return { transform: [{ scale }] };
	});

	return (
		<View style={[styles.pageContainer]}>
			{/* <Animated.View style={[styles.square, rStyle]} /> */}
			<Animated.View style={[styles.card, rStyle]}>
				<Text style={styles.text}>{name}</Text>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		height,
		width: width,
		alignItems: 'center',
		justifyContent: 'center',
	},
	square: {
		height: SIZE,
		width: SIZE,
		backgroundColor: 'rgba(0,0,256, 0.4)',
	},
	text: {
		fontSize: 66,
		color: 'black',
		fontWeight: '700',
		textTransform: 'uppercase',
	},
	card: {
		width: width * 0.9,
		height: height * 0.7,
		backgroundColor: 'white',
		borderColor: '#dbdbdb',
		// borderWidth: 1,
		borderRadius: 16,
		position: 'absolute',
		shadowColor: '#0f0f0f',
		shadowOffset: { width: 5, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 20,
		padding: 20,
	},
});
