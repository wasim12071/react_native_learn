import React from 'react';
import * as UnprotectedRoutes from './screens/UnprotectedRoutes'
import * as ProtectedRoutes from './screens/ProtectedRoutes'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const createName = key => key.split('_').join(' '); 
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Splash'} screenOptions={{ headerShown: false }}>
          {
            Object.keys(UnprotectedRoutes).map((key) => (
              <Stack.Screen key={key} name={createName(key)} component={UnprotectedRoutes[key]} />
            ))
          }
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