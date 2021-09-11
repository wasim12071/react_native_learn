import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import Colors from '../utils/colors';

export const Footer = (props) => {

    const { children } = props;

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <Text style={styles.footer}>
                {children}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerLight: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderTopColor: Colors.light,
        borderTopWidth: 1,
        color: Colors.dark,
        backgroundColor: Colors.lighter,
        display: 'flex',
        flexDirection: 'row'
    },
    containerDark: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderTopColor: Colors.darker,
        borderTopWidth: 1,
        color: Colors.lighter,
        backgroundColor: Colors.dark,
        display: 'flex',
        flexDirection: 'row'
    },
    footer: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'right',
        width: Dimensions.get('window').width - 20
    }
  });