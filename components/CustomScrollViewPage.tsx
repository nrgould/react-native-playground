import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

interface Props {
	index: number;
	title: string;
	translateX: Animated.SharedValue<number>;
}

export const { width: PAGE_WIDTH, height } = Dimensions.get('window');

export default function CustomScrollViewPage({
	translateX,
	index,
	title,
}: Props) {
	const pageOffset = PAGE_WIDTH * index;

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value + pageOffset }],
		};
	});
	return (
		<Animated.View
			style={[
				styles.page,
				{ backgroundColor: `rgba(0,0,256, 0.${index + 2})` },
				rStyle,
			]}>
			<Text style={styles.title}>{title}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	page: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		width: PAGE_WIDTH,
		height: height,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 60,
		fontWeight: '700',
		letterSpacing: 1.5,
		textTransform: 'uppercase',
	},
});
