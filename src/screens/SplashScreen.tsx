import React, {useState, useEffect, useRef} from 'react';
import {Animated, TouchableOpacity, ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';
import {Pressable, Text} from '@gluestack-ui/themed';
export default function SplashScreenComponent({navigation}: any) {
  const [bounceValue] = useState(new Animated.Value(0));
  const opacity = useRef(new Animated.Value(0.1)).current;

  const startOpacityAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1},
    ).start();
  };

  useEffect(() => {
    startOpacityAnimation();
  }, []);

  const translateY = bounceValue.interpolate({
    inputRange: [5, 8],
    outputRange: [8, 10],
  });

  return (
    <Pressable onPress={() => navigation.navigate('Login')} flex={1}>
      <ImageBackground
        source={require('../assets/images/background-image.jpg')}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 60,
        }}>
        <Text color="white" fontWeight="bold">
          WHATW
        </Text>
        <LottieView
          source={require('../assets/lottie/Animation - Global.json')}
          autoPlay
          loop
          style={{width: 350, height: 350}}
        />
        <Animated.View style={{transform: [{translateY}]}}>
          <TouchableOpacity>
            <Animated.Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
                opacity: opacity,
              }}>
              Tap to continue
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </Pressable>
  );
}
