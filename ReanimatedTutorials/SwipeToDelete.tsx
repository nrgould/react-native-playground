import { SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import ListItem from '../components/ListItem';

const TITLES = [
	'Record the dismissible tutorial',
	'leave a like on the video',
	'Leave a comment',
	'Subscribe to the channel',
	'leave a start on the github repo',
];
export interface TaskInterface {
	title: string;
	index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = '#FAFBFF';

export default function SwipeToDelete() {
	const [tasks, setTasks] = useState<TaskInterface[]>(TASKS);

	const onDismiss = useCallback((task: TaskInterface) => {
		setTasks((prevState) =>
			prevState.filter((item) => item.index !== task.index)
		);
	}, []);

	const scrollRef = useRef(null);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Tasks</Text>
			<ScrollView style={{ flex: 1 }}>
				{tasks.map((task) => (
					<ListItem
						task={task}
						key={task.index}
						onDismiss={onDismiss}
						simultaneousHandlers={scrollRef}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: BACKGROUND_COLOR,
		flex: 1,
	},
	title: {
		fontSize: 60,
		marginVertical: 20,
		paddingLeft: '5%',
	},
});
