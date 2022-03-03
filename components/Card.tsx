import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('window');
export default function Card() {
	return (
		<View style={styles.card}>
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
	card: {
		width: width * 0.9,
		height: height / 2,
		backgroundColor: 'white',
		borderColor: '#dbdbdb',
		// borderWidth: 1,
		borderRadius: 16,
		// position: 'absolute',
		shadowColor: '#0f0f0f',
		shadowOffset: { width: 5, height: 20 },
		shadowOpacity: 0.08,
		shadowRadius: 20,
		padding: 20,
		marginBottom: 40,
	},
});
