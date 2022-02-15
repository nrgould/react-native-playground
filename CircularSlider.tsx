import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

const CircularSlider = ({ start, end }: CircularProps) => {
  const startPos = useDerivedValue(() => polar2Canvas({ theta: start.value, radius: R}, CENTER))
  const endPos = useDerivedValue(() => polar2Canvas({ theta: end.value, radius: R}, CENTER))

  const animatedProps = useAnimatedProps(() => {
    return {
      d: `M ${startPos.value.}`
    }
  })
  return <View>
    <Svg width={SIZE} height={SIZE}>
      <AnimatedPath animatedProps={animatedProps} stroke="cyan" strokeWidth={STROKE} />
    </Svg>
  </View>;
};

export default CircularSlider;
