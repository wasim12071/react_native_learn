import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text, useColorScheme, StatusBar } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import Colors from './../../utils/colors'
import { MainContext } from './../../context';

export const Splash = (props) => {
  const focused = useIsFocused();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.white : Colors.darker,
  };

  const context = useContext(MainContext);
  const { loggedIn } = context;

  useEffect(() => {
    if (focused) {
      if (loggedIn === 'true') {
        props.navigation.replace('Protected_Route');
      } else if (loggedIn === 'false') {
        props.navigation.replace('LandingPage');
      }
    }
  }, [loggedIn, focused])

  return (
    <View style={[styles.background, backgroundStyle]}>
      <Text style={[styles.heading, { color: isDarkMode ? Colors.white : Colors.darker }]}>
        Wasim Hassan Khan
      </Text>
      <Text style={[styles.subText, { color: isDarkMode ? Colors.white : Colors.darker }]}>
        Version: 0.0.1
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontWeight: '700',
    fontSize: 30
  },
  subText: {
    fontWeight: '300',
    fontSize: 14
  }
});
