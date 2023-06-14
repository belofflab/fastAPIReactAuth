import http from '../../http';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await http.post(
        'auth/signin',{
          email: email,
          password: password
        },
        config
      )
      localStorage.setItem('userToken', data.access_token)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userSignup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const { data } = await http.post(
        'auth/signup', {
        email: email,
        password: password
      },
        config
      )
      localStorage.setItem('userToken', data.access_token)
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/me',
  async ({ token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await http.get(
        `auth/me?token=${token}`,
        config
      )
      localStorage.setItem('userInfo', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)