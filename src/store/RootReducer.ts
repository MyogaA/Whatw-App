import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './slice/AuthSlice';

export const {AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_REGISTER} = authSlice.actions;
export const authReducer = authSlice.reducer;

const RootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default RootReducer;
