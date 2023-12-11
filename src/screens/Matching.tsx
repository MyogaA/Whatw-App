import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, Alert} from 'react-native';
import {Image} from '@gluestack-ui/themed';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';
import {RootState} from '../store/type/RootState';
import {useAuth} from '../hooks/useAuth';
import LottieView from 'lottie-react-native';
import {Loading} from '../feature/loading/Loading';

interface UserData {
  avatar: string;
  fullname: string;
  countdownTime?: number;
  socketId: string;
}

const Matching = ({navigation}: any) => {
  const totalMatchingItems = 2;
  const [isLoading, setIsLoading] = useState(true);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [matchingData, setMatchingData] = useState<UserData[]>([]);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    if (!isLoading && !auth) {
      Alert.alert('Error connection', 'Please login again');
      navigation.navigate('Login');
    }
  }, [isLoading, navigation]);

  useEffect(() => {
    const socket = io('http://192.168.18.14:5000');

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('userData', {
        avatar: auth.avatar?.image,
        fullname: auth.fullname,
        answers: {},
        score: -1,
      });
    });

    socket.on('userData', (userData: UserData) => {
      console.log('Received user data:', userData);

      setMatchingData(prevData => {
        const newData =
          prevData.length < totalMatchingItems
            ? [...prevData, userData]
            : prevData;
        return newData;
      });
    });

    socket.on('usersData', (usersData: UserData[]) => {
      setMatchingData(usersData.slice(0, totalMatchingItems));
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    socket.on('countdown', data => {
      setCountdownTime(data);
    });

    socket.on('countdown', data => {
      setCountdown(data);
    });

    socket.on('playerJoined', count => {
      setPlayerCount(count); // Menerima jumlah pemain yang bergabung
    });

    return () => {
      socket.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    if (matchingData.length === totalMatchingItems) {
      setTimeout(() => {
        navigation.navigate('Task');
      }, 5000);
    }
  }, [matchingData, totalMatchingItems]);

  const handleCountdownFinish = () => {
    if (matchingData.length === totalMatchingItems) {
      setCountdownTime(countdownTime);
    }
  };

  const progressText = `${matchingData.length}/${totalMatchingItems}`;

  return isLoading ? (
    <Loading />
  ) : (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        <CountdownCircleTimer
          isPlaying
          duration={countdown}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[50, 30, 20, 10]}
          onComplete={handleCountdownFinish}
          size={100}>
          {({remainingTime}) => (
            <Text
              style={{
                position: 'absolute',
                zIndex: 999,
                top: 20,
                fontSize: 50,
                color: 'black',
              }}>
              {remainingTime}
            </Text>
          )}
        </CountdownCircleTimer>
        <LottieView
          source={require('../assets/lottie/Animation - Circle.json')}
          autoPlay
          loop
          style={{width: 160, height: 160, top: -130, right: 0}}
        />
        <Text style={styles.title}>Matching Up!!</Text>
        <Text style={styles.progress}>{progressText}</Text>
      </View>
      <View style={styles.matchingContainer}>
        {/* Dua elemen pertama */}
        <View style={styles.matchingRow}>
          {matchingData.slice(0, 2).map((item, index) => (
            <View key={index} style={styles.card}>
              {item.avatar ? (
                <Image
                  source={{uri: item.avatar}}
                  alt="avatar"
                  style={styles.avatar}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
          ))}
        </View>

        {/* Satu elemen tengah */}
        <View style={styles.card}>
          {matchingData.slice(2, 3).map((item, index) => (
            <View key={index} style={styles.card}>
              {item.avatar ? (
                <Image
                  source={{uri: item.avatar}}
                  alt="avatar"
                  style={styles.avatar}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
          ))}
        </View>

        {/* Dua elemen terakhir */}
        <View style={styles.matchingRow}>
          {matchingData.slice(3, 5).map((item, index) => (
            <View key={index} style={styles.card}>
              {item.avatar ? (
                <Image
                  source={{uri: item.avatar}}
                  alt="avatar"
                  style={styles.avatar}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <Text style={styles.name}>{item.fullname}</Text>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 80,
    // marginTop: -80,
    // paddingHorizontal: 20,
    // paddingTop: -30,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: -20,
    top: -200,
  },
  progress: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    top: -200,
    // marginBottom: 20,
  },
  middleRow: {
    alignItems: 'center',
    // marginBottom: 10,
  },
  matchingContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 62,
    top: -75,
    gap: 20,
  },
  matchingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '46%',
  },
  card: {
    width: 150,
    height: 120,
    // backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Matching;
function setPlayerCount(count: any) {
  throw new Error('Function not implemented.');
}
