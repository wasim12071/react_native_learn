import React from 'react';
import { Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from './../utils/colors';

export const Button = ({ children, onPress, color, backgroundColor, style }) => {

  const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity onPress={onPress}>
              <Text style={[ styles.sectionButton, { backgroundColor: backgroundColor || (!isDarkMode ? Colors.darker : Colors.lighter ), color: color || (!isDarkMode ? Colors.lighter : Colors.darker ) }, style ]}>
                {children}
              </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    sectionButton: {
      height: 50,
      minWidth: 215,
      margin: 5,
      marginVertical: 10,
      fontSize: 18,
      fontWeight: '300',
      textAlign: 'center',
      backgroundColor: Colors.dark,
      paddingVertical: 10,
      borderRadius: 50,
      color: Colors.lighter,
      elevation: 10,
      shadowColor: Colors.darker,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3.65,
    }
});