import React, { useEffect, useRef } from 'react';
import { Button, ButtonText, View, Text, Image } from '@gluestack-ui/themed';
import { ImageBackground, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import Diamond from '../components/Diamond';
import { RootState } from '../store/type/RootState';
import { useSelector } from 'react-redux';
import { useQuetion } from '../hooks/useQuetion';
import { Loading } from '../feature/loading/Loading';
import io from 'socket.io-client';
import LottieView from 'lottie-react-native';

export default function Task({ navigation }: any) {
  const auth = useSelector((state: RootState) => state.auth);
  const { Questions } = useQuetion();
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  const [timePerQuestion, setTimePerQuestion] = React.useState(10);
  const [timerKey, setTimerKey] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(-1);
  const [userAnswers, setUserAnswers] = React.useState<any>('');
  const [answersUsers, setAnswersUsers] = React.useState<any[]>([]);

  useEffect(() => {
    const socket = io('http://192.168.0.106:5000');

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('userData', {
        avatar: auth.avatar?.image,
        fullname: auth.fullname,
        answers: userAnswers,
        score: score,
      });
    });

    socket.on('playersData', (userData: any) => { });

    socket.on('playersData', (data: any) => {
      setAnswersUsers(data);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [auth, userAnswers]);

  useEffect(() => {
    if (Questions) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isLoading, Questions]);

  const quizData = Array.isArray(Questions) ? Questions : [];

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion].answer;
    setUserAnswers((prevAnswers: any) => {
      return {
        ...prevAnswers,
        [currentQuestion]: selectedAnswer,
      };
    });
    if (answer === selectedAnswer) {
      const timeLeftScore = timePerQuestion * 5;
      setScore(prevScore => prevScore + timeLeftScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setTimePerQuestion(10);
      }, 5000);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 5000);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startCountdown = () => {
      interval = setInterval(() => {
        setTimePerQuestion(prevTime => {
          if (prevTime === 0) {
            clearInterval(interval!);
            handleTimeUp();
            return prevTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    };

    const handleTimeUp = () => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
        setTimePerQuestion(10);
      } else {
        setTimeout(() => {
          setShowScore(true);
        }, 5000);
        setShowScore(false);
      }
    };

    if (!showScore && timePerQuestion > 0) {
      startCountdown();
    } else if (!showScore && timePerQuestion === 0) {
      handleTimeUp();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentQuestion, showScore, quizData.length, timePerQuestion]);

  useEffect(() => {
    setSelectedOptionIndex(-1);
  }, [currentQuestion]);

  const filteredData = answersUsers.filter(item => item.score !== -1);
  filteredData.sort((a, b) => b.score - a.score);

  return isLoading ? (
    <Loading />
  ) : (
    <ImageBackground
      source={require('../assets/images/background-image.jpg')}
      style={{ flex: 1 }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <View
          width={'100%'}
          height={'100%'}
          backgroundColor="transparent"
          justifyContent="space-between"
          alignItems="center"
          paddingTop={30}>
          <View
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingHorizontal={20}>
            <LottieView
              source={require('../assets/lottie/astronot.json')}
              autoPlay
              loop
              style={{ width: 80, height: 80 }}
            />
            <View />
            <View />
          </View>
          <View
            backgroundColor="transparent"
            width={'100%'}
            height="75%"
            borderTopLeftRadius="$2xl"
            borderTopRightRadius="$2xl"
            alignItems="center">
            {showScore ? (
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={50}
                height={300}>
                <Text color="white" fontSize={20}>
                  Congrats, you got
                </Text>
                {filteredData.map((item: any, index) => {
                  if (item.score !== -1) {
                    return (
                      <View
                        key={index}
                        display="flex"
                        flexDirection="row"
                        gap={10}
                        marginBottom={20}
                        justifyContent="center"
                        alignItems="center">
                        <View
                          backgroundColor="transparent"
                          width={50}
                          borderColor="white"
                          borderWidth={1}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="50%"
                          borderRadius="$3xl">
                          <Image
                            source={{ uri: item.avatar }}
                            alt="avatar"
                            rounded="$full"
                            width={50}
                            height={50}
                          />
                        </View>
                        <View
                          backgroundColor="transparent"
                          width={100}
                          borderColor="white"
                          borderWidth={1}
                          display="flex"
                          justifyContent="center"
                          height="50%"
                          borderRadius="$xl">
                          <Text color="white" textAlign="center">
                            {item.fullname}
                          </Text>
                        </View>
                        <View
                          backgroundColor="transparent"
                          width={50}
                          borderColor="white"
                          borderWidth={1}
                          display="flex"
                          justifyContent="center"
                          height="50%"
                          borderRadius="$3xl">
                          <Text color="white" textAlign="center">
                            {item.score}
                          </Text>
                        </View>
                        <View >
                          <LottieView
                            source={require('../assets/lottie/Animation - petasan1.json')}
                            autoPlay
                            loop
                            style={{ width: 300, height: 300, position: 'absolute',right: 90, top: -50 }}
                          />
                        </View>
                        <View >
                          <LottieView
                            source={require('../assets/lottie/Animation - petasan2.json')}
                            autoPlay
                            loop
                            style={{ width: 300, height: 300, position: 'absolute',right: -170, top: -50 }}
                          />
                        </View>
                      </View>
                    );
                  }
                })}
                <Button onPress={() => navigation.navigate('StartGame')}>
                  <Text color="white">Back To Home</Text>
                </Button>
              </View>
            ) : (
              <View
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height={'100%'}
                marginTop={-40}>
                <View
                  display="flex"
                  flexDirection="row"
                  gap={10}
                  justifyContent="center"
                  alignItems="center">
                  <View
                    backgroundColor="transparent"
                    width={50}
                    borderColor="white"
                    borderWidth={1}
                    display="flex"
                    height={50}
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="$3xl">
                    <Text color="white" textAlign="center" fontWeight="bold">
                      00
                    </Text>
                  </View>
                  <Text color="white" textAlign="center" fontWeight="bold">
                    :
                  </Text>
                  <View
                    backgroundColor="transparent"
                    width={50}
                    borderColor="white"
                    borderWidth={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    height={50}
                    alignItems="center"
                    borderRadius="$3xl">
                    <Text color="white" textAlign="center" fontWeight="bold">
                      {timePerQuestion}
                    </Text>
                  </View>
                </View>
                {/* <CountDown
                  key={timePerQuestion}
                  size={20}
                  digitStyle={{backgroundColor: 'white'}}
                  digitTxtStyle={{color: '#12486B'}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: '', s: ''}}
                  showSeparator
                /> */}
                <Text marginTop={20} color="white">
                  question :
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize={20}
                  marginBottom={50}
                  color="white">
                  {quizData[currentQuestion].question}
                </Text>
                {quizData[currentQuestion].options.map(
                  (option: string, index: number) => (
                    <View key={index}>
                      <Button
                        key={index}
                        size="md"
                        height={60}
                        variant="solid"
                        backgroundColor={
                          selectedOption === option
                            ? option === quizData[currentQuestion].answer
                              ? 'green'
                              : 'red'
                            : '#12486B'
                        }
                        $active-bgColor="#F5F5F5"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                        rounded="$full"
                        width={300}
                        marginTop={10}
                        onPress={() => {
                          setSelectedOptionIndex(index);
                          setSelectedOption(option);
                          handleAnswer(option);
                        }}>
                        <ButtonText>{option}</ButtonText>
                        {answersUsers.map((data, dataIndex) => {
                          const userAnswer =
                            data.answers[currentQuestion.toString()];
                          if (userAnswer === option) {
                            return (
                              <View
                                key={dataIndex}
                                style={{
                                  position: 'absolute',
                                  top: -15,
                                  right: -15,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <AvatarAnswer
                                  key={dataIndex}
                                  avatar={data.avatar}
                                />
                              </View>
                            );
                          }
                          return null;
                        })}
                      </Button>
                    </View>
                  ),
                )}

                <View
                  backgroundColor="#12486B"
                  width={100}
                  height={60}
                  borderRadius={20}
                  borderColor="#12486B"
                  marginTop={30}
                  justifyContent="center"
                  alignItems="center">
                  <Text color="white" fontSize={20}>
                    {quizData[currentQuestion].id - 1}/{quizData.length}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

function AvatarAnswer(props: { avatar: any }) {
  return (
    <View display="flex" flexDirection="column">
      <Image
        borderWidth={5}
        width={50}
        height={50}
        borderRadius={100}
        borderColor="white"
        source={{ uri: props.avatar }}
        alt="avatar"
        backgroundColor="red"
        justifyContent="center"
        alignItems="center"
        position="relative"
      />
    </View>
  );
}
