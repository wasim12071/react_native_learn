import React from "react";
import { Dimensions, SafeAreaView, View, StyleSheet, Text, useColorScheme } from "react-native";
import Colors from './../../utils/colors'
import { Header, Footer } from './../../components'

export const Home = (props) => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    color: isDarkMode ? Colors.white : Colors.darker,
  };
  
  return(
    <SafeAreaView style={[backgroundStyle, { height: Dimensions.get('window').height }, { paddingTop: 20}]}>
      <Header>Hey there!</Header>
      <View style={[styles.background, backgroundStyle]}>
        <Text style={[styles.heading, { color: isDarkMode ? Colors.white : Colors.darker }]}>
          You are now signed In!
        </Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 110,
  },
  heading: {
    fontWeight: '700',
    fontSize: 30
  }
});
