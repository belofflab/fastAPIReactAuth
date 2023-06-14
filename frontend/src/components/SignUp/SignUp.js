import React, { useEffect, useState } from 'react';

import {
  Avatar, Button, TextField,
  FormControlLabel, Checkbox, Link,
  Grid, Box, Typography, Container, CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Copyright from '../Copyright';

import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../store/auth/auth.actions';

export default function SignUp({ onRegisterClick, handleModal }) {

  const [customError, setCustomError] = useState('');
  const { success, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      handleModal(false);
    }
    if (error) {
      setCustomError(error);
    }
  }, [setCustomError, handleModal, success, error])



  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (!/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
      setCustomError('Некорректно введена почта')
      return;
    }

    if (!password.length) {
      setCustomError('Пожалуйста введите пароль')
      return;
    }

    if (!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      setCustomError('Введённый вами пароль ненадежный')
      return;
    }

    dispatch(userSignup({ email: data.get('email'), password: data.get('password') }))
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
            <Typography component="span" variant="caption" sx={{ color: 'red' }}>
              {customError}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Имя"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Фамилия"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Адрес электронной почты"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Я хочу получать важные уведомления на почту."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Зарегистрироваться
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={() => onRegisterClick(true)} href="#" variant="body2">
                    Уже есть аккаунт? Войти
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}