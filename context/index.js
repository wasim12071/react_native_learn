import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { UIManager, Platform } from 'react-native';
import { initAxiosHeaders, resetInterceptor } from '../utils/apis';
import { navigation } from '../AppRoutes';
import { Authenticate } from './../apis'

const store = {
  snackbar: {
    message: '',
    severity: 'error'
  },
  isLoading: false,
  auth: {
    token: ''
  }
};

export const MainContext = React.createContext(store);

const isIOS = Platform.OS === 'ios'

export const ContextWrapper = (props) => {

  const [state, changeState] = useState(props.store || store);
  useEffect(() => {
    getToken();
  }, [])
  const setState = (newState) => {
    changeState({ ...state, ...newState });
  }

  const storeToken = async (auth) => {
    try {
      await AsyncStorage.setItem('@token', JSON.stringify(auth));
    } catch (e) {
      console.error('error', e)
    }
  }
  const getToken = async () => {
    try {
      const auth = JSON.parse(await AsyncStorage.getItem('@token'));
      setState({ auth: auth !== null ? auth : store.auth });
      if (auth !== null && auth.token !== '') {
        setState({ auth })
      } else {
        setState({ auth: store.auth, loggedIn: 'false' })
      }
    } catch (e) {
      console.error('error', e)
    }
  }

  const { token } = state.auth;
  useEffect(() => {
    if (token && token !== '') {
      contextData.setIsLoading(true)
      initAxiosHeaders({ token }, contextData.logout);
      Authenticate.authenticate({ token }).then((res) => {
        if (res.data.authenticated) {
          Authenticate.getUser({ token }).then((res) => {
            setState({ user: res.data.user, loggedIn: 'true' });
          })
        } else {
          setState({ loggedIn: 'false' });
        }
      })
    }
  }, [token])


  const contextData = {
    ...state,
    setSnackbar: (message, severity = state.snackbar.severity) => {
      setState({ message, severity });
      Toast.show({
        type: severity,
        text1: message,
        position: 'bottom',
        bottomOffset: isIOS ? 50 : 25,
      });
      setTimeout(() => { Toast.hide() }, 10000)
    },
    setIsLoading: (isLoading) => {
      setState({ isLoading });
    },
    setUser: (user) => {
      setState({ user });
    },
    setAuth: (auth) => {
      setState({ auth });
      storeToken(auth);
    },
    logout: async () => {
      resetInterceptor();
      setState({ ...store, loggedIn: 'false' });
      storeToken(store.auth);
      navigation.replace('Signout_Route');
    }
  }

  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  return (
    <MainContext.Provider value={contextData}>
      {props.children}
    </MainContext.Provider>
  )
}