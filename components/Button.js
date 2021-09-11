import React from 'react';
import { Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from './../utils/colors';

export const Button = ({ children, onPress, color, backgroundColor }) => {

  const isDarkMode = useColorScheme() === 'dark';

    return (
        <TouchableOpacity onPress={onPress}>
              <Text style={[ styles.sectionButton, { backgroundColor: backgroundColor || (!isDarkMode ? Colors.darker : Colors.lighter ), color: color || (!isDarkMode ? Colors.lighter : Colors.darker ) } ]}>
                {children}
              </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonsSection: {
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: Colors.dark,
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
      paddingVertical: 10
    },
    sectionButton: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      marginTop: 10,
      marginBottom: 10,
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