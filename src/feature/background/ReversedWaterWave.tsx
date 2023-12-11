import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const colors = [
  'rgba(109, 109, 109, 0.6)',
  'rgba(89, 89, 89, 0.6)',
  'rgba(69, 69, 69, 0.6)',
];

export default function ReversedWaterWave() {
  const [rotateValue] = useState(new Animated.Value(1));

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 15000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ).start();
    };

    startAnimation();
  }, [rotateValue]);

  const createWaveStyle = (top: string, size: number, color: string) => {
    return {
      position: 'absolute',
      width: '300%',
      height: '300%',
      left: '-100%',
      top: top,
      backgroundColor: color,
      borderRadius: size,
      opacity: rotateValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 0.6, 0.3],
      }),
      transform: [
        {
          rotate: rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-360deg'],
          }),
        },
        {
          scale: rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          }),
        },
      ],
    };
  };

  return (
    <View style={[styles.container, {width: '100%', height: '100%'}]}>
      {colors.map((color, index) => (
        <Animated.View
          key={index}
          style={[
            createWaveStyle(`${50 + index * 7}%`, 40 + index * 5, color),
            {width: '100%', height: '100%'},
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
