import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Chess } from 'chess.js';
import Background from './Background';
import Piece from './Piece';
import { SIZE } from './Notation';

const { width } = Dimensions.get('window');

function useConst<T>(initialValue: T | (() => T)): T {
	const ref = useRef<{ value: T }>();
	if (ref.current === undefined) {
		// Box the value in an object so we can tell if it's initialized even if the initializer
		// returns/is undefined
		ref.current = {
			value:
				typeof initialValue === 'function'
					? // eslint-disable-next-line @typescript-eslint/ban-types
					  (initialValue as Function)()
					: initialValue,
		};
	}
	return ref.current.value;
}

const styles = StyleSheet.create({
	container: {
		width,
		height: width,
	},
});

const Board = () => {
	const chess = useConst(() => new Chess());
	const [state, setState] = useState({
		player: 'w',
		board: chess.board(),
	});
	const onTurn = useCallback(() => {
		setState({
			player: state.player === 'w' ? 'b' : 'w',
			board: chess.board(),
		});
	}, [chess, state.player]);

	return (
		<View style={styles.container}>
			<Background />
			{state.board.map((row, y) =>
				row.map((square, x) => {
					if (square !== null) {
						return (
							<Piece
								enabled={state.player === square.color}
								onTurn={onTurn}
								key={`${x}-${y}`}
								chess={chess}
								position={{ x: x * SIZE, y: y * SIZE }}
								id={`${square.color}${square.type}` as const}
							/>
						);
					}
				})
			)}
		</View>
	);
};

export default Board;
