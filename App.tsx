import {GluestackUIProvider} from '@gluestack-ui/themed';
import React from 'react';
import {config} from '@gluestack-ui/config';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Task from './src/screens/Task';
import SplashScreenComponent from './src/screens/SplashScreen';
import Matching from './src/screens/Matching';
import StartGameComponent from './src/screens/StartGame';
import {Provider} from 'react-redux';
import RootReducer from './src/store/RootReducer';
import {configureStore} from '@reduxjs/toolkit';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Setting from './src/feature/top/Setting';
import {AppRegistry, LogBox} from 'react-native';
const queryClient = new QueryClient();
AppRegistry.registerComponent('App', () => App);
const Stack = createNativeStackNavigator();
const store = configureStore({
  reducer: RootReducer,
});
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <GluestackUIProvider config={config}>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Setting" component={Setting} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Task" component={Task} />
              <Stack.Screen name="StartGame" component={StartGameComponent} />
              <Stack.Screen name="Matching" component={Matching} />
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreenComponent}
              />
            </Stack.Navigator>
          </GluestackUIProvider>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
}
