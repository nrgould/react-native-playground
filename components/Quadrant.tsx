import { Circle, G, Line } from 'react-native-svg';
import React from 'react';
import { CENTER, PADDING, R, STROKE, TAU } from '../BedTime/Constants';
import { polar2Canvas } from 'react-native-redash';

const LINES = 75;
const DELTA = TAU / LINES;

const Quadrant = () => {
	return (
		<G mask='url(#mask)'>
			<Circle
				r={R + STROKE / 2}
				cx={CENTER.x}
				cy={CENTER.y}
				fill='yellow'
			/>
			{new Array(LINES).fill(0).map((_, i) => {
				const theta = i * DELTA;
				const p1 = polar2Canvas(
					{ theta, radius: R + PADDING / 2 },
					CENTER
				);
				const p2 = polar2Canvas(
					{ theta, radius: R - PADDING / 2 },
					CENTER
				);
				return (
					<Line
						x1={p1.x}
						y1={p1.y}
						x2={p2.x}
						y2={p2.y}
						strokeWidth={4}
						stroke='orange'
					/>
				);
			})}
		</G>
	);
};

export default Quadrant;
