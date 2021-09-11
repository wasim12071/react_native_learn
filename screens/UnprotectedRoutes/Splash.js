import React, { useEffect } from "react";
import { View, StyleSheet, Text, useColorScheme } from "react-native";
import Colors from './../../utils/colors'

export const Splash = (props) => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.white : Colors.darker,
  };
  
  useEffect(() => {
    props.navigation.replace('LandingPage');
  })

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
