
import React from 'react';
import { Text, useColorScheme, View, StyleSheet } from 'react-native';
import Colors from '../utils/colors';
import { MainContext } from './../context';

export const Section = ({children, title}) => {
  
  const isDarkMode = useColorScheme() === 'dark';

    return (
      <View style={styles.sectionContainer}>
        <Text style={[ styles.sectionTitle, { color: isDarkMode ? Colors.white : Colors.black } ]}>
          {title}
        </Text>
        <Text style={[ styles.sectionDescription, { color: isDarkMode ? Colors.light : Colors.dark } ]}>
          {children}
        </Text>
      </View>
    );
};


const styles = StyleSheet.create({
    sectionContainer: {
      marginVertical: 16,
      paddingHorizontal: 24
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    }
});
  