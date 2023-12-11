import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  KeyboardAvoidingView,
  AtSignIcon,
} from '@gluestack-ui/themed';
import {Keyboard, Platform, ImageBackground} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/type/RootState';
import ListFreeAvatar from '../components/ListFreeAvatar';
import {API} from '../libs/api';
import {UPDATE_AVATAR_AND_FULLNAME} from '../store/slice/AuthSlice';
import ReversedWaterWave from '../feature/background/ReversedWaterWave';
import WaterWave from '../feature/background/WaterWave';
import {useAuth} from '../hooks/useAuth';
import StartGameComponent from './StartGame';
import {InputSlot, InputIcon, InputField} from '@gluestack-ui/themed';

export default function Profile({navigation}: any) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {Users, login, logout} = useAuth({navigation});
  const userLogin = Array.isArray(Users)
    ? Users.filter((user: any) => user.email === auth.email)
    : [];
  const dataUserLogin = userLogin[0];
  const [fullname, setFullname] = useState<string>('');
  const [selectedAvatarId, setSelectedAvatarId] = useState<any>(null);

  const handleChange = (value: string) => {
    setFullname(value);
  };

  const handleAvatarClick = (avatarId: any) => {
    setSelectedAvatarId(avatarId);
  };

  async function handleRegister() {
    try {
      const dataToSend = {
        ...auth,
        avatar: selectedAvatarId,
        fullname: fullname,
      };

      dispatch(UPDATE_AVATAR_AND_FULLNAME(dataToSend));

      const response = await API.post('/register', dataToSend);
      console.log('Register success', response.data);
      login();
      navigation.navigate('StartGame');
    } catch (error) {
      console.log('Register error', error);
      logout();
      navigation.navigate('Login');
    }
  }

  if (dataUserLogin !== undefined) {
    return <StartGameComponent navigation={navigation} />;
  }

  return (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{flex: 1}}>
        <ReversedWaterWave />
        <WaterWave />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 40,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1, width: '100%', marginBottom: 20}}>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                height: '60%',
                overflow: 'scroll',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text
                style={{color: '#333', fontWeight: 'bold', marginBottom: 30}}>
                Choose your Avatar
              </Text>
              <ListFreeAvatar
                handleAvatarClick={handleAvatarClick}
                selectedAvatarId={selectedAvatarId}
              />
            </View>
            <View>
              <Input
                borderRadius={15}
                backgroundColor="rgba(255, 255, 255, 0.8)">
                <InputSlot pl="$3">
                  <InputIcon as={AtSignIcon} />
                </InputSlot>
                <InputField
                  placeholder="Username"
                  value={fullname}
                  onChangeText={handleChange}
                />
              </Input>
            </View>
          </View>
          <View style={{width: '100%', height: '15%'}}>
            <Button
              size="md"
              backgroundColor="red"
              variant="solid"
              $active-bgColor="#F57C00"
              height={50}
              borderRadius={20}
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => {
                handleRegister();
                navigation.navigate('StartGame');
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Continue</Text>
            </Button>
          </View>
        </View>
    </ImageBackground>
  );
}
