import { Chess, ChessInstance, Position } from 'chess.js';
import React, { useCallback } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

import { SIZE, toPosition, toTranslation } from './Notation';

const styles = StyleSheet.create({
	piece: {
		width: SIZE,
		height: SIZE,
	},
});
export type Player = 'b' | 'w';
type Type = 'q' | 'r' | 'n' | 'b' | 'k' | 'p';
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
	br: require('./assets/br.png'),
	bp: require('./assets/bp.png'),
	bn: require('./assets/bn.png'),
	bb: require('./assets/bb.png'),
	bq: require('./assets/bq.png'),
	bk: require('./assets/bk.png'),
	wr: require('./assets/wr.png'),
	wn: require('./assets/wn.png'),
	wb: require('./assets/wb.png'),
	wq: require('./assets/wq.png'),
	wk: require('./assets/wk.png'),
	wp: require('./assets/wp.png'),
};

interface PieceProps {
	id: Piece;
	position: Vector;
	chess: ChessInstance;
	onTurn: () => void;
	enabled: boolean;
}

const Piece = ({ id, position, chess, onTurn, enabled }: PieceProps) => {
	const isGestureActive = useSharedValue(false);
	const offsetX = useSharedValue(0);
	const offsetY = useSharedValue(0);
	const translateX = useSharedValue(position.x);
	const translateY = useSharedValue(position.y);

	const movePiece = useCallback(
		(from: Position, to: Position) => {
			const move = chess
				.moves({ verbose: true })
				.find((m) => m.from === from && m.to === to);
			const { x, y } = toTranslation(move ? to : from);
			translateX.value = withTiming(x);
			translateY.value = withTiming(y, {}, () => {
				isGestureActive.value = false;
			});
			if (move) {
				chess.move(move);
				onTurn();
			}
		},
		[chess, isGestureActive, translateX, translateY, onTurn]
	);

	const onGestureEvent =
		useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
			onStart: () => {
				offsetX.value = translateX.value;
				offsetY.value = translateY.value;
				isGestureActive.value = true;
			},
			onActive: ({ translationX, translationY }) => {
				translateX.value = translationX + offsetX.value;
				translateY.value = translationY + offsetY.value;
			},
			onEnd: () => {
				const from = toPosition({
					x: offsetX.value,
					y: offsetY.value,
				});
				const to = toPosition({
					x: translateX.value,
					y: translateY.value,
				});
				runOnJS(movePiece)(from, to);
			},
		});

	const pieceStyle = useAnimatedStyle(() => ({
		position: 'absolute',
		zIndex: isGestureActive.value ? 100 : 10,
		transform: [
			{ translateX: translateX.value },
			{ translateY: translateY.value },
		],
	}));

	const underlay = useAnimatedStyle(() => {
		const pos = toPosition({
			x: translateX.value,
			y: translateY.value,
		});
		const translation = toTranslation(pos);
		return {
			osition: 'absolute',
			width: SIZE,
			height: SIZE,
			zIndex: 0,
			backgroundColor: isGestureActive.value
				? 'rgba(255, 255, 0, 0.5)'
				: 'transparent',
			transform: [
				{ translateX: translation.x },
				{ translateY: translation.y },
			],
		};
	});

	const original = useAnimatedStyle(() => {
		return {
			position: 'absolute',
			width: SIZE,
			height: SIZE,
			zIndex: 0,
			backgroundColor: isGestureActive.value
				? 'rgba(255, 255, 0, 0.5)'
				: 'transparent',
			transform: [
				{ translateX: offsetX.value },
				{ translateY: offsetY.value },
			],
		};
	});

	return (
		<>
			<Animated.View style={original} />
			<Animated.View style={underlay} />
			<PanGestureHandler
				onGestureEvent={onGestureEvent}
				enabled={enabled}>
				<Animated.View style={pieceStyle}>
					<Image source={PIECES[id]} style={styles.piece} />
				</Animated.View>
			</PanGestureHandler>
		</>
	);
};

export default Piece;
