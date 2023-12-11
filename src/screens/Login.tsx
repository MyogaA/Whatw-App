import {View, Image, Text, Button, ButtonText} from '@gluestack-ui/themed';
import React from 'react';
import logo from '../assets/logo.png';
import googleIcon from '../assets/google.png';
import {ImageBackground} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import LottieView from 'lottie-react-native';
export default function Login({navigation}: any) {
  const {handleLogin} = useAuth({navigation});
  return (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor="transparent"
          justifyContent="space-between"
          alignItems="center"
          paddingVertical={60}
          paddingHorizontal={30}>
          <View
            width={'100%'}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <LottieView
              source={require('../assets/lottie/astronot.json')}
              autoPlay
              loop
              style={{width: 50, height: 50}}
            />
            <Text color="white" fontWeight="bold">
              WHATW
            </Text>
            <View width={50} />
          </View>
          <View>
            <Image source={logo} alt="logo" width={400} height={400} />
          </View>
          <View>
            <View>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  handleLogin();
                }}>
                <View
                  display="flex"
                  flexDirection="row"
                  gap={4}
                  justifyContent="center"
                  alignItems="center">
                  <LottieView
                    source={require('../assets/lottie/google.json')}
                    autoPlay
                    loop
                    style={{width: 30, height: 30}}
                  />
                  {/* <Image
                    source={googleIcon}
                    alt="Google Icon"
                    width={20}
                    height={20}
                  /> */}
                  <ButtonText>
                    <Text color="white" fontSize={16} fontWeight="bold">
                      Continue with Google
                    </Text>
                  </ButtonText>
                </View>
              </Button>
            </View>
            <Text color="white" fontSize={10}>
              By continuing, you agree to the terms and privacy
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
