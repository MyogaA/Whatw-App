import {setAuthToken} from '../../libs/api';
import {createSlice} from '@reduxjs/toolkit';
import {RegisterType} from '../../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: RegisterType = {
  token: '',
  fullname: '',
  email: '',
  avatar:
    {
      id: 0,
      image: '',
    } || null,
  diamond: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload: any = action.payload;

      setAuthToken(payload.token);
      AsyncStorage.setItem('token', payload.token);

      const user: RegisterType = {
        token: payload.token,
        fullname: payload.fullname,
        email: payload.email,
        avatar: payload.avatar,
        diamond: payload.diamond,
      };
      return user;
    },
    AUTH_REGISTER: (_, action) => {
      const payload: any = action.payload;

      setAuthToken(payload.token);
      AsyncStorage.setItem('token', payload.token);

      const user: any = {
        email: payload.email,
      };
      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;
      const user: RegisterType = {
        token: payload.token,
        fullname: payload.fullname,
        email: payload.email,
        avatar: payload.avatar,
        diamond: payload.diamond,
      };
      return user;
    },
    AUTH_LOGOUT: () => {
      AsyncStorage.removeItem('token');
    },
    UPDATE_AVATAR_AND_FULLNAME: (state, action) => {
      const {avatar, fullname} = action.payload;
      state.avatar = avatar;
      state.fullname = fullname;
    },
    UPDATE_AVATAR: (state, action) => {
      const {avatar} = action.payload;
      return {
        ...state,
        avatar,
      };
    },
    UPDATE_FULLNAME: (state, action) => {
      const {fullname} = action.payload;
      return {
        ...state,
        fullname,
      };
    },
  },
});

export const {UPDATE_AVATAR_AND_FULLNAME, UPDATE_AVATAR, UPDATE_FULLNAME} =
  authSlice.actions;
