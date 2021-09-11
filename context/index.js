import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { UIManager, Platform } from 'react-native';

const store = {
  snackbar: {
    message: '',
    severity: 'error'
  },
  isLoading: false
};

export const MainContext = React.createContext(store);

const isIOS = Platform.OS === 'ios'

export const ContextWrapper = (props) => {

  const [state, changeState] = useState(props.store || store);
  const setState = (newState) => {
    changeState({ ...state, ...newState });
  }

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
    }
  }

  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  return (
    <MainContext.Provider value={contextData}>
      {props.children}
    </MainContext.Provider>
  )
}