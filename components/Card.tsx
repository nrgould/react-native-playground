import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');
export default function Card() {
	return (
		<View style={styles.container}>
			<Text>Card</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: width * 0.9,
		height: height / 2,
		backgroundColor: '#797979',
		borderRadius: 12,
		marginBottom: 40,
	},
});
