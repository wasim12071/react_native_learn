import React from 'react';
import * as UnprotectedRoutes from './screens/UnprotectedRoutes'
import * as ProtectedRoutes from './screens/ProtectedRoutes'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyTabBar } from './components'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const UnProtectedRoutesNavigation = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const createName = key => key.split('_').join(' '); 
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent />
      <Stack.Navigator initialRouteName={'Splash'} screenOptions={{ headerShown: false, unmountInactiveScreens: true }}>
        {
          Object.keys(UnprotectedRoutes).map((key) => (
            <Stack.Screen key={key} name={createName(key)} component={UnprotectedRoutes[key]} />
          ))
        }
      </Stack.Navigator>
    </>
  );
}

const ProtectedRoutesNavigation = (props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const createName = key => key.split('_').join(' '); 
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent />
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />} initialRouteName={'MyHome'} screenOptions={{ headerShown: false, unmountInactiveScreens: true }}>
        <Tab.Screen key={'MyHome_001'} name={createName('MyHome')} component={ProtectedRoutes.MyHome} />
        <Tab.Screen key={'MyProfile_002'} name={createName('MyProfile')} component={ProtectedRoutes.MyProfile} />
      </Tab.Navigator>
    </>
  );
}


export const AppRoutes = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false, unmountInactiveScreens: true }}>
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