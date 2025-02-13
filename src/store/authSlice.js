import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  user: (() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        localStorage.removeItem('googleToken');
        return null;
      }
    }
    return null;
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload.credential;
      const decodedUser = jwtDecode(token);
      localStorage.setItem('googleToken', token);
      state.user = decodedUser;
    },
    logout: (state) => {
      localStorage.removeItem('googleToken');
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;