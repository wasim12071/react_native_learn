import React from 'react';
import * as UnprotectedRoutes from './screens/UnprotectedRoutes'
import * as ProtectedRoutes from './screens/ProtectedRoutes'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, StatusBar } from 'react-native';

const Stack = createStackNavigator();


const UnProtectedRoutesNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const createName = key => key.split('_').join(' '); 
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent />
      <Stack.Navigator initialRouteName={'Splash'} screenOptions={{ headerShown: false }}>
        {
          Object.keys(UnprotectedRoutes).map((key) => (
            <Stack.Screen key={key} name={createName(key)} component={UnprotectedRoutes[key]} />
          ))
        }
      </Stack.Navigator>
    </>
  );
}

const ProtectedRoutesNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const createName = key => key.split('_').join(' '); 
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent />
      <Stack.Navigator initialRouteName={'MyHome'} screenOptions={{ headerShown: false }}>
        {
          Object.keys(ProtectedRoutes).map((key) => (
            <Stack.Screen key={key} name={createName(key)} component={ProtectedRoutes[key]} />
          ))
        }
      </Stack.Navigator>
    </>
  );
}


export const AppRoutes = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'Signout_Route'} component={UnProtectedRoutesNavigation} />
          <Stack.Screen name={'Protected_Route'} component={ProtectedRoutesNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export const navigationRef = React.createRef();

function goBack() {
  navigationRef.current?.goBack();
}
function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
function replace(name) {
  navigationRef.current?.dispatch(StackActions.replace(name));
}

export const navigation = { navigate, replace, goBack }