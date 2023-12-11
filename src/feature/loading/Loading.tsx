import {View} from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';
import {ImageBackground} from 'react-native';

export function Loading() {
  return (
    <ImageBackground
      source={require('../../assets/images/background-image.jpg')}
      style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor="transparent"
          justifyContent="center"
          alignItems="center"
          paddingTop={30}>
          <LottieView
            source={require('../../assets/lottie/Animation - Loading.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
