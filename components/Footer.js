import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Dimensions } from 'react-native';
import Colors from '../utils/colors';

export const Footer = (props) => {

    const { children } = props;

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <Text style={[styles.footer, { color: isDarkMode ? Colors.white : Colors.dark }]}>
                {children || ' Made by Waism Hassan Khan!'}
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
        color: Colors.white,
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